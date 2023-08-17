import multer from 'multer';
import { ResponseError } from '../error/response-error.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Nama file
  }
});

// Filter untuk jenis file yang diterima
const fileFilter = (req, file, cb) => {
  if (!file) {
    cb(new ResponseError(400, 'Image is required!'), false);
    return;
  }

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new ResponseError(400, 'Invalid file type. Only JPEG, PNG, JPG files are allowed.'), false);
  }
};

const upload = multer({
  fileFilter,
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Batas ukuran file (5 MB)
  }
});

export default upload;
