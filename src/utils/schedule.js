import { HOURS, ROLES } from "../constants/roles.js";

// 休憩時間割り当て
export function assignBreakTimes(staffList) {
  const breakSlots = {};
  HOURS.forEach(hour => (breakSlots[hour] = 0));

  return staffList.map(staff => {
    const result = { ...staff };
    if (staff.workHours >= 7) {
      const options = [staff.startTime + 3, staff.startTime + 4].filter(
        b => b + 1 <= staff.endTime && b >= 7 && b < 20
      );
      for (const start of options) {
        if (breakSlots[start] < 3) {
          result.breakStart = start;
          result.breakEnd = start + 1;
          breakSlots[start]++;
          break;
        }
      }
    }
    return result;
  });
}

// 業務割り当て
export function assignDuties(staffWithBreaks, minRequirements) {
  const finalSchedule = {};
  const roleDailyHours = {};

  staffWithBreaks.forEach(staff => {
    finalSchedule[staff.name] = {};
    roleDailyHours[staff.name] = {};
    ROLES.forEach(role => (roleDailyHours[staff.name][role] = 0));
    HOURS.forEach(hour => (finalSchedule[staff.name][hour] = "未所属"));
  });

  staffWithBreaks.forEach(staff => {
    if (staff.breakStart !== undefined) {
      for (let h = staff.breakStart; h < staff.breakEnd; h++) {
        finalSchedule[staff.name][h] = "休憩";
      }
    }
  });

  HOURS.slice(0, -1).forEach(hour => {
    if (!minRequirements[hour]) return;
    const available = staffWithBreaks.filter(
      s => s.startTime <= hour && hour < s.endTime && finalSchedule[s.name][hour] === "未所属"
    );

    Object.entries(minRequirements[hour]).forEach(([role, need]) => {
      let current = Object.values(finalSchedule)
        .filter(s => s[hour] === role).length;
      const required = need - current;
      if (required <= 0) return;

      const candidates = available
        .filter(s => roleDailyHours[s.name][role] < 5)
        .map(s => ({ name: s.name, rating: parseInt(s.ratings[role] || 0) }))
        .sort((a, b) => b.rating - a.rating);

      candidates.slice(0, required).forEach(c => {
        finalSchedule[c.name][hour] = role;
        roleDailyHours[c.name][role]++;
      });
    });
  });

  staffWithBreaks.forEach(s => {
    HOURS.forEach(h => {
      if (!(s.startTime <= h && h < s.endTime) && finalSchedule[s.name][h] === "未所属") {
        finalSchedule[s.name][h] = "";
      }
    });
  });

  return finalSchedule;
}
