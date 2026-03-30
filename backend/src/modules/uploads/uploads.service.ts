import crypto from 'crypto';
import stream from 'stream';

import { v2 as cloudinary } from 'cloudinary';

import { env } from '@/config/env.js';
import { ApiError } from '@/utils/apiError.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

const assertImageSignature = (buffer: Buffer) => {
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
  const isPng =
    buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  const isWebp = buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP';

  if (!isJpeg && !isPng && !isWebp) {
    throw new ApiError(400, 'Uploaded file content does not match a supported image type.');
  }
};

export const uploadImage = async (
  file: Express.Multer.File | undefined,
  folder: 'products' | 'banners'
) => {
  if (!file) {
    throw new ApiError(400, 'Image file is required.');
  }

  assertImageSignature(file.buffer);

  const publicId = `elora/${folder}/${crypto.randomUUID()}`;

  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `elora/${folder}`,
        public_id: publicId.split('/').pop(),
        resource_type: 'image',
        transformation: [
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error || !result) {
          reject(new ApiError(502, 'Cloudinary upload failed.'));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    stream.Readable.from(file.buffer).pipe(uploadStream);
  });
};

