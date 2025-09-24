import React, { useState, useEffect, useRef } from "react";
import { Calendar, Upload, Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react"; // 👈 QRコード用を追加

import { parseCSV } from "../utils/csv";
import { assignBreakTimes, assignDuties } from "../utils/schedule";
import { HOURS, ROLE_COLORS, ALL_OPTIONS } from "../constants/roles";

import ScheduleTable from "./ScheduleTable";
import ShortageAlert from "./ShortageAlert";
import Legend from "./Legend";
import CommentsBox from "./CommentsBox";

const ShiftScheduleGUI = () => {
  const [csvData, setCsvData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("5/19");
  const [schedule, setSchedule] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [comments, setComments] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sortedStaffNames, setSortedStaffNames] = useState([]);
  const [minRequirements, setMinRequirements] = useState({});
  const [imageUrl, setImageUrl] = useState(null); // 👈 QRコード用
  const fileInputRef = useRef(null);
  const scheduleRef = useRef(null);

  // サンプルCSVを読み込む
  useEffect(() => {
    const sampleCSV = `スタッフ名,ネタ,実演,カマ,メイン,サブ,案内,ホール,5/19
山田,4,5,3,3,3,5,4,9-18
佐藤,3,3,3,4,4,5,4,10-19
鈴木,2,3,2,3,3,4,3,12-20`;
    const { data, dateColumns } = parseCSV(sampleCSV);
    setCsvData(data);
    setAvailableDates(dateColumns);
  }, []);

  // スケジュールを生成
  useEffect(() => {
    if (!csvData || !selectedDate) return;
    const workingStaff = csvData
      .filter(s => s[selectedDate]?.includes("-"))
      .map(s => {
        const [start, end] = s[selectedDate].split("-");
        return {
          name: s["スタッフ名"],
          startTime: parseInt(start),
          endTime: parseInt(end),
          workHours: parseInt(end) - parseInt(start),
          ratings: {
            ネタ: s["ネタ"], 実演: s["実演"], カマ: s["カマ"],
            メイン: s["メイン"], サブ: s["サブ"], 案内: s["案内"], ホール: s["ホール"]
          }
        };
      });
    const withBreaks = assignBreakTimes(workingStaff);
    const result = assignDuties(withBreaks, minRequirements);
    setSchedule(result);
    setSortedStaffNames(workingStaff.map(s => s.name));
  }, [csvData, selectedDate, minRequirements]);

  // CSV読み込み
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const { data, dateColumns } = parseCSV(ev.target.result);
      setCsvData(data);
      setAvailableDates(dateColumns);
    };
    reader.readAsText(file);
  };

  // スケジュール表を画像として保存
  const exportImage = () => {
    if (!scheduleRef.current) return;
    html2canvas(scheduleRef.current).then(canvas => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `schedule_${selectedDate.replace("/", "_")}.png`;
      link.click();
    });
  };

  // スケジュール表をQRコードで表示
  const exportQR = () => {
    if (!scheduleRef.current) return;
    html2canvas(scheduleRef.current, { scale: 0.5 }).then(canvas => {
      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl); // QRに渡す
    });
  };

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>
      {/* タイトル */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", display: "flex", alignItems: "center" }}>
        <Calendar size={24} style={{ marginRight: "8px", color: "#2563eb" }} />
        ワークシフト編集システム
      </h1>

      {/* 操作パネル */}
      <div style={{ marginBottom: "16px" }}>
        <label>日付: </label>
        <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
          {availableDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        <button onClick={() => fileInputRef.current.click()} style={{ marginLeft: "10px" }}>
          <Upload size={16} /> CSV読み込み
        </button>

        <button onClick={exportImage} style={{ marginLeft: "10px" }}>
          <ImageIcon size={16} /> 画像出力
        </button>

        <button onClick={exportQR} style={{ marginLeft: "10px" }}>
          <ImageIcon size={16} /> QRコード出力
        </button>
      </div>

      {/* 凡例 */}
      <Legend roleColors={ROLE_COLORS} />

      {/* 不足人員アラート */}
      <ShortageAlert schedule={schedule} minRequirements={minRequirements} />

      {/* スケジュール表 */}
      <div ref={scheduleRef}>
        <ScheduleTable
          schedule={schedule}
          staffNames={sortedStaffNames}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        {/* コメント欄 */}
        <CommentsBox comments={comments} setComments={setComments} />
      </div>

      {/* QRコード表示エリア */}
      {imageUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>{selectedDate} のシフト表 (スマホで読み取って保存できます)</p>
          <QRCodeCanvas value={imageUrl} size={256} />
        </div>
      )}
    </div>
  );
};

export default ShiftScheduleGUI;
