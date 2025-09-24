import React from "react";
import { HOURS } from "../constants/roles";

const ShortageAlert = ({ schedule, minRequirements }) => {
  const shortages = [];

  HOURS.slice(0, -1).forEach(hour => {
    if (!minRequirements[hour]) return;
    Object.entries(minRequirements[hour]).forEach(([role, required]) => {
      let count = 0;
      Object.keys(schedule).forEach(staff => {
        if (schedule[staff]?.[hour] === role) count++;
      });
      if (count < required) {
        shortages.push({ hour, role, required, current: count });
      }
    });
  });

  if (shortages.length === 0) {
    return null;
  }

  return (
    <div style={{
      margin: "16px 0",
      padding: "10px",
      background: "#ffe6e6",
      border: "1px solid red",
      borderRadius: "6px"
    }}>
      <h3 style={{ color: "red", marginBottom: "8px" }}>⚠️ 人員不足の時間帯</h3>
      <ul style={{ margin: 0, paddingLeft: "20px" }}>
        {shortages.map((s, i) => (
          <li key={i} style={{ fontSize: "14px", color: "#b91c1c" }}>
            {s.hour}時: {s.role} が不足（必要: {s.required}, 現在: {s.current}）
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortageAlert;
