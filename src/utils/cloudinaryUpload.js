// src/utils/cloudinaryUpload.js

export async function uploadToCloudinary(blob) {
  const cloudName = "dzjrblfex"; // 例: "dyx123abc"
  const uploadPreset = "unsigned_preset"; // 例: "unsigned_preset"

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();

  formData.append("file", blob);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url; // ✅ ここが公開URL
}
