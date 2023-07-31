const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const { S3_FOLDER_NAME } = require('./../constants')
const crypto = require('crypto');

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

console.log("S3_FOLDER_NAME==============>>>>>>>>>>>>>>>>>>>", S3_FOLDER_NAME.REVIEW_REPORT_IMAGES)


const s3Storage = multerS3({
  s3: s3,
  bucket: function (req: any, file: any, cb: any) {
    let bucket = ""
    if (file.fieldname == S3_FOLDER_NAME.PRODUCT_IMAGES) { //Product images
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PRODUCT_IMAGES;

    } else if (file.fieldname == S3_FOLDER_NAME.BANNER_IMAGES) { // Banner images
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.BANNER_IMAGES;

    } else if (file.fieldname == S3_FOLDER_NAME.PROFILE_IMAGES) { // Profile images
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PROFILE_IMAGES;

    } else if (file.fieldname == S3_FOLDER_NAME.REVIEW_REPORT_IMAGES) { // Review report issue images
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.REVIEW_REPORT_IMAGES;

    } else if (file.fieldname == S3_FOLDER_NAME.WORKSHOP_IMAGES) {
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.WORKSHOP_IMAGES; // Workshop images

    } else if (file.fieldname == S3_FOLDER_NAME.BLOG_IMAGES) { // Bolg images
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.BLOG_IMAGES;

    } else {
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.OTHERS; // Other images
    }
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function (req: any, file: any, cb: any) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 1024 * 1024 * 10 },
  key: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(4).toString('hex');
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}-${file.originalname}`
    );
  },
});


const s3StorageByFolderNameQuery = multerS3({
  s3: s3,
  bucket: function (req: any, file: any, cb: any) {
    let bucket = ""
    if (req.query.fileFolder == S3_FOLDER_NAME.PRODUCT_IMAGES) {
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PRODUCT_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.BANNER_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.BANNER_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.PROFILE_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PROFILE_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.BLOG_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.BLOG_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.REVIEW_REPORT_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.REVIEW_REPORT_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.WORKSHOP_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.WORKSHOP_IMAGES
    }else { 
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.OTHERS
    }
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function (req: any, file: any, cb: any) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 1024 * 1024 * 10 },
  key: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(4).toString('hex');
    cb(
      null,
      `${req.query.fileFolder}-${uniqueSuffix}-${file.originalname}`
    );
  },
});

const documentFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif"||
    file.mimetype == "application/pdf" ||
    file.mimetype == "image/svg+xml" ||
    file.mimetype == "application/msword" ||
    file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingm" ||
    file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("Only .png, .jpg, .svg, .doc, .docx and .jpeg format allowed!"));
  }
};

const documentFilterForVideo = (req: any, file: any, cb: any) => {
  if (
    file.mimetype == "video/x-flv" ||
    file.mimetype == "video/mp4" ||
    file.mimetype == "application/x-mpegURL" ||
    file.mimetype == "video/MP2T" ||
    file.mimetype == "video/3gpp" ||
    file.mimetype == "video/quicktime" ||
    file.mimetype == "video/x-msvideo" ||
    file.mimetype == "video/x-ms-wmv"||
    file.mimetype == "video/gif"
  ) {
    cb(null, true);
  } else {
    return cb(
      new Error(
        "Only video/x-flv,video/mp4,application/x-mpegURL,video/MP2T,video/3gpp,video/quicktime,video/x-msvideo,video/x-ms-wmv format allowed!"
      )
    );
  }
};

const documentFilterForRating = (req: any, file: any, cb: any) => {
  console.log("documentFilterForCmsProductImg file inside doc filter", file)
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"||
    file.mimetype == "video/MP2T" ||
    file.mimetype == "video/3gpp" ||
    file.mimetype == "video/quicktime" ||
    file.mimetype == "video/x-msvideo" ||
    file.mimetype == "video/x-ms-wmv"
  ) {
    cb(null, true);
    console.log("hitsss")
  } else {
    return cb(new Error("Only .png, .jpg, .jpeg and .mp4 format allowed!"));
  }
};


const s3StorageForReturnReplace = multerS3({
  s3: s3,
  bucket: function (req: any, file: any, cb: any) {
   let bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.REVIEW_REPORT_IMAGES;
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function(req: any, file: any, cb: any) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 1024 * 1024 * 10 },
  key: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(4).toString('hex');
    cb(
      null,
      `${S3_FOLDER_NAME.Maintask}-${uniqueSuffix}-${file.originalname}`
    );
  },
});

const s3StorageForReportABug = multerS3({
  s3: s3,
  bucket: function (req: any, file: any, cb: any) {
    let bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.APP_BUG;
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function (req: any, file: any, cb: any) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 5000000 },
  key: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(4).toString('hex');
    cb(
      null,
      `${S3_FOLDER_NAME.APP_BUG}-${uniqueSuffix}-${file.originalname}`
    );
  },
});

const upload = multer({
  storage: s3Storage,
  fileFilter: documentFilter,
  limits: { fileSize: 1024 * 1024 * 10 }
});



export const uploadReviewRatingsImages = multer({
  storage: s3StorageForReturnReplace,
 fileFilter: documentFilterForRating,
 limits: { fileSize: 1024 * 1024 * 10 }
});


export const uploadReportABugImages = multer({
  storage: s3StorageForReportABug,
  fileFilter: documentFilter,
  limits: { fileSize: 1024 * 1024 * 10 }
});

