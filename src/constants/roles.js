export const ROLES = ["ネタ", "実演", "カマ", "メイン", "サブ", "案内", "ホール"];

export const SPECIAL_STATUS = {
  "休憩": "#808080",
  "未所属": "#D3D3D3",
  "": "#FFFFFF"
};

export const ROLE_COLORS = {
  "ネタ": "#9ACD32",
  "実演": "#32CD32",
  "カマ": "#800080",
  "メイン": "#FF0000",
  "サブ": "#FFC0CB",
  "案内": "#0000FF",
  "ホール": "#87CEEB",
  ...SPECIAL_STATUS
};

export const ALL_OPTIONS = ["", "未所属", "休憩", ...ROLES];

export const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7時～20時
