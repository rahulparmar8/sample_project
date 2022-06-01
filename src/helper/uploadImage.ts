import multer from "multer";

const storage = multer.diskStorage({

  
    destination: function (req, file, cb) {
  // console.log("in function");
      cb(null, './build/uploads');
      
    },
    
    filename: function (req: any, file: any, cb: any) {
      // console.log("file");
      
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const fileFilter = (req: any, file: any, cb: any) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
  };   
  
export const upload = multer({ storage: storage, fileFilter: fileFilter });
// export const upload = multer({ dest: "../uploads" });