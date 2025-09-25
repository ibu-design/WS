// src/utils/firebaseUpload.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export async function uploadToFirebase(blob, fileName) {
  try {
    // Firebase Storage の参照を作成
    const storageRef = ref(storage, `schedules/${fileName}`);

    // 画像をアップロード
    await uploadBytes(storageRef, blob);

    // 公開URLを取得
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Firebaseアップロード失敗:", error);
    throw error;
  }
}
