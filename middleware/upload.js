const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const storage = multer.memoryStorage();

// رفع صور الهوية
const uploadIdImages = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    if (allowed.test(file.originalname.toLowerCase()) && allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only images (jpeg, jpg, png) allowed'));
  }
});

// رفع الشهادات
const certificateUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf/;
    if (allowed.test(file.originalname.toLowerCase()) && allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only images/pdf allowed'));
  }
});

const uploadToCloudinary = (fileBuffer, folder, publicId) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, public_id: publicId }, (err, res) => {
      if (res) resolve(res);
      else reject(err);
    });
    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });

module.exports = { uploadIdImages, certificateUpload, uploadToCloudinary };
