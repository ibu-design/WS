import React from "react";
import { ROLES, HOURS } from "../constants/roles";

const MinRequirementTable = ({ minRequirements, setMinRequirements }) => {
  const handleChange = (hour, role, value) => {
    setMinRequirements(prev => ({
      ...prev,
      [hour]: {
        ...prev[hour],
        [role]: value
      }
    }));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>最低人員設定</h3>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>時間</th>
            {ROLES.map(role => (
              <th key={role}>{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.slice(0, -1).map(hour => (
            <tr key={hour}>
              <td>{hour}:00</td>
              {ROLES.map(role => (
                <td key={role}>
                  <input
                    type="number"
                    min="0"
                    value={minRequirements[hour]?.[role] || 0}
                    onChange={e => handleChange(hour, role, parseInt(e.target.value) || 0)}
                    style={{ width: "40px" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MinRequirementTable;
