import { Upload } from "tus-js-client";
import * as ImagePicker from "expo-image-picker";

function getFileExtension(uri: string): string {
  const match = /\.([a-zA-Z0-9]+)$/.exec(uri);
  return match ? match[1] : "";
}

function getMimeType(extension: string): string {
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  return `image/${extension}`;
}

export async function uploadFile(
  bucketName: string,
  pickerResult: ImagePicker.ImagePickerResult,
): Promise<{ fileName: string; url: string }> {
  if (!pickerResult.assets || pickerResult.assets.length === 0)
    throw new Error("Nenhum arquivo selecionado.");

  const file = pickerResult.assets[0];
  const extension = getFileExtension(file.uri);
  const blob = await fetch(file.uri).then((res) => res.blob());

  const objectName = file?.fileName ?? `${Date.now()}.${extension}`;

  return new Promise((resolve, reject) => {
    const upload = new Upload(blob, {
      endpoint: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        "x-upsert": "true",
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName,
        objectName,
        contentType: getMimeType(extension),
        cacheControl: "3600",
      },
      chunkSize: 6 * 1024 * 1024, // 6MB obrigatório
      onError: (error) => {
        console.error("❌ Upload falhou:", error);
        reject(error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(`📤 Upload progress: ${percentage}%`);
      },
      onSuccess: () => {
        console.log("✅ Upload concluído:", objectName);
        const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${objectName}`;
        resolve({ fileName: objectName, url });
      },
    });

    // Permite continuar upload interrompido
    upload.findPreviousUploads().then((previousUploads) => {
      if (previousUploads.length > 0) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      upload.start();
    });
  });
}
