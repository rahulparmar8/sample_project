import fs from "fs";
import path from "path"
// const data = data.image

export const deleteFileExt = (image: any) => {
  
    // console.log(path.join(__dirname, "../uploads/"));

    const pathTrace = path.join(__dirname, "../uploads/");
    fs.unlink(`${pathTrace}/${image}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("successfully deleted");
    });
};
