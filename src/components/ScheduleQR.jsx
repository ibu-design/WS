import React, { useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

const ScheduleQR = () => {
  const [imageUrl, setImageUrl] = useState(null);

  // シフト表をキャプチャして画像化
  const exportAsImage = async () => {
    const element = document.getElementById("scheduleTable");
    if (!element) {
      alert("シフト表が見つかりません。id='scheduleTable' を確認してください。");
      return;
    }
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/png");
    setImageUrl(dataUrl);
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <button
        onClick={exportAsImage}
        style={{
          padding: "8px 16px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        QRコード生成
      </button>

      {imageUrl && (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <p>スマホで読み取って画像を保存できます</p>
          <QRCodeCanvas value={imageUrl} size={256} />
        </div>
      )}
    </div>
  );
};

export default ScheduleQR;
