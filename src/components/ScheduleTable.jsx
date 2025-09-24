import React from "react";
import ReactDOM from "react-dom";
import { HOURS, ALL_OPTIONS, ROLE_COLORS } from "../constants/roles";

const ScheduleTable = ({ schedule, staffNames, activeDropdown, setActiveDropdown }) => {
  const handleSelect = (staffName, hour, value) => {
    schedule[staffName][hour] = value;
    setActiveDropdown(null);
  };

  // ドロップダウンをポータルで表示する関数
  const renderDropdown = (cellRect, staff, hour) => {
    return ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          top: cellRect.bottom + window.scrollY,
          left: cellRect.left + window.scrollX,
          background: "#fff",
          border: "1px solid #ccc",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 9999,
          whiteSpace: "nowrap",
          padding: "4px",
        }}
      >
        {ALL_OPTIONS.map((option) => (
          <div
            key={option}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(staff, hour, option);
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {option || "勤務外"}
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    // 👇 QRコード生成用に id を追加
    <div
      id="scheduleTable"
      style={{
        overflowX: "auto",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginTop: "16px",
      }}
    >
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#e0f2fe" }}>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "6px",
                minWidth: "120px",
                position: "sticky",
                left: 0,
                background: "#e0f2fe",
              }}
            >
              スタッフ名
            </th>
            {HOURS.map((hour) => (
              <th
                key={hour}
                style={{
                  border: "1px solid #ccc",
                  padding: "6px",
                  minWidth: "60px",
                }}
              >
                {hour}:00
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staffNames.map((staff) => (
            <tr key={staff}>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "6px",
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                {staff}
              </td>
              {HOURS.map((hour) => {
                const value = schedule[staff]?.[hour] || "";
                const cellId = `${staff}-${hour}`;
                const bg = ROLE_COLORS[value] || "#fff";

                return (
                  <td
                    key={hour}
                    style={{
                      border: "1px solid #ccc",
                      padding: "0",
                      background: value === "未所属" ? "#f3f4f6" : bg,
                      textAlign: "center",
                      position: "relative",
                      cursor: "pointer",
                      overflow: "visible",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === cellId ? null : cellId);
                    }}
                    id={cellId}
                  >
                    {value || "勤務外"}

                    {activeDropdown === cellId &&
                      renderDropdown(
                        document.getElementById(cellId).getBoundingClientRect(),
                        staff,
                        hour
                      )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
