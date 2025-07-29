import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config/config";
const { cloud_name, api_key, api_secret } = config;
cloudinary.config({ cloud_name, api_key, api_secret });

export async function upload(byteArrayBuffer: Buffer) {
  const { secure_url }: UploadApiResponse =
    await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, uploadResult) => {
          if (error) return reject(error);
          if (!uploadResult)
            return reject(new Error("upload failed with no result"));
          return resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    });
  return secure_url;
}
