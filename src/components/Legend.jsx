import React from "react";
import { ROLE_COLORS } from "../constants/roles";

const Legend = () => {
  return (
    <div style={{ margin: "16px 0", padding: "10px", background: "#f9f9f9", borderRadius: "6px" }}>
      <h3 style={{ marginBottom: "8px" }}>役割凡例</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {Object.entries(ROLE_COLORS).map(([role, color]) => (
          <div key={role} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{
              width: "16px",
              height: "16px",
              background: color,
              border: "1px solid #ccc"
            }} />
            <span style={{ fontSize: "14px" }}>{role || "勤務外"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
