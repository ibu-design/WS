// src/utils/csv.js
export function parseCSV(csvText) {
  // 1) 先頭BOM除去
  csvText = csvText.replace(/^\uFEFF/, "");

  // 2) 改行正規化 & 空行除外
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim() !== "");

  if (lines.length === 0) return { data: [], dateColumns: [] };

  // 3) 区切り文字を自動判定（タブ or カンマ）
  const delimiter = lines[0].includes("\t") ? "\t" : ",";

  // 4) ヘッダ整形（BOM/空白/全角空白の除去）
  const headers = lines[0]
    .split(delimiter)
    .map((h) => h.replace(/^\uFEFF/, "").replace(/\r/g, "").replace(/\u3000/g, " ").trim());

  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter);
    const row = {};
    headers.forEach((h, idx) => {
      let v = (values[idx] ?? "")
        .replace(/\r/g, "")
        .replace(/\u3000/g, " ") // 全角空白→半角
        .trim();
      row[h] = v;
    });
    data.push(row);
  }

  // 5) 日付列（例: 9/25）を抽出
  const dateColumns = headers.filter((h) => /^\d{1,2}\/\d{1,2}$/.test(h));

  return { data, dateColumns };
}
