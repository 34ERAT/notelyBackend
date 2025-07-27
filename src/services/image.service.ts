import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config/config";
const { cloud_name, api_key, api_secret } = config;
cloudinary.config({ cloud_name, api_key, api_secret });

export async function upload(byteArrayBuffer: Buffer<ArrayBufferLike>) {
  const { secure_url }: UploadApiResponse = await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, uploadResult) => {
        if (error) throw error;
        return resolve(uploadResult as UploadApiResponse);
      })
      .end(byteArrayBuffer);
  });
}
