import catgoryModel from "../models/catgroryModels";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { deleteFileExt } from "../helper/deleteFile";

export default class Category {

    addCategoryPage = (req: Request, res: Response) => {
        try {
            return res.render("addCategory");
        } catch (error) {
            console.log(error);

        }
    }

    addCategoryData = async (req: Request, res: Response) => {
        try {
            // console.log("in api");
            const { name, desc, image } = req.body
            console.log(req.body)
            const data = new catgoryModel({
                name: name,
                desc: desc,
                image: image
            })
            console.log("image", req.file);
            const body = req.body;
            if (req.file) {
                body.image = req.file.filename;
            }
            const result = await catgoryModel.create(body);
            // console.log(result);
            res.redirect("/category/list/")

        } catch (error) {
            console.log(error);
        }
    }

    listCategory = async (req: Request, res: Response) => {
        try {
            const result = await catgoryModel.find()
            // console.log("=>>>",result);

            return res.render("listCategory", {
                data: result
            })
        } catch (error) {
            console.log(error);

        }
    }

    editCategoryPage = async (req: Request, res: Response) => {
        try {

            const results = await catgoryModel.findById(req.params.id, req.body);
            // console.log(results);

            return res.render("editCategory", {
                data: results
            })
        } catch (error) {
            console.log(error);

        }
    }

    editCategoryData = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const data = await catgoryModel.findById(req.body.id)
            console.log("Data=>>>", data);

            if (req.file) {
                body.image = req.file.filename;
                deleteFileExt(data.image);
            }
            console.log(data);

            const result = await catgoryModel.findByIdAndUpdate(req.body, body);
            console.log(result);
            return res.redirect("/category/list");
        } catch (error) {
            console.log(error);
        }
    }

    viewCategoryPage = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const viewData = await catgoryModel.findOne({
                _id: new mongoose.Types.ObjectId(`${id}`)
            })
            return res.render("viewCategory", {
                data: viewData,
            });
        } catch (error) {
            console.log(error);

        }
    }


    deleteCategory = async (req: Request, res: Response) => {
        try {
            const data = await catgoryModel.findByIdAndDelete(req.params.id);
            return res.redirect("/category/list");
        } catch (error) {
            console.log(error);

        }
    }
}