import fs from "fs";
import path from "path";

export const deleteFileExt = (image: any) => {
    console.log("inn fun delete");

    const pathTrace = path.join(__dirname, "../uploads");
    fs.unlink(`${pathTrace}/${image}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("successfully deleted");
    });
};