import multer from 'multer';

import { ApiError } from '@/utils/apiError.js';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1
  },
  fileFilter: (_request, file, callback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(new ApiError(400, 'Unsupported file type. Allowed types: JPG, PNG, WEBP.'));
      return;
    }

    callback(null, true);
  }
});

