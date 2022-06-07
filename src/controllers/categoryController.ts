import categoryModel from "../models/categoryModels";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { deleteFileExt } from "../helper/deleteFile";
import { sorting } from "../helper/sorts";
import { categoryListData } from "../helper/categoryLookup";

export default class Category {

  // GET  Category Page   //
  addCategoryPage = async (req: Request, res: Response) => {
    try {
      const catData = await categoryModel.find({ parent: 1 });
      // const catData = await categoryModel.find();
      // console.log(catData);

      return res.render("addCategory", {
        categorylist: catData,
        categoryData: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };


  //    POST Category Page  //
  addCategoryData = async (req: Request, res: Response) => {
    try {
      const catData = await categoryListData();

      const { name, desc, image } = req.body;
      //   console.log(req.body);
      const data = new categoryModel({
        name: name,
        desc: desc,
        image: image,
      });
      //   console.log("image", req.file);

      const body = req.body;
      if (req.file) {
        body.image = req.file.filename;

      };
      // console.log("parent==>", req.body.category);
      body.parent = req.body.category === '0' ? 1 : 0
      // console.log(req.body);

      if (req.body.category !== "0") {
        body.parent_id = req.body.category;
      } else {
        body.parent_id = null;
      }
      // console.log(body);

      const result = await categoryModel.create(body);
      // console.log(result);
      res.redirect("/category/list/");
    } catch (error) {
      console.log(error);
    }
  };


  //    GET All Category List   //
  listCategory = async (req: Request, res: Response) => {
    try {
      const perPage = 2;
      const page = req.query.page || 1;
      const recievedData = sorting(req.query);
      const searchKeyword = req.query.search as string;
      let searchObj = {};
      if (searchKeyword) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchKeyword)
          ? {
            $or: [{ discount: searchKeyword }, { price: searchKeyword }],
          }
          : { name: new RegExp(`${searchKeyword.toString().trim()}`, "i") };
      }
      const result = await categoryModel
        .find(searchObj)
        .sort(recievedData.sortMethod)
        .skip(perPage * Number(page) - perPage)
        .limit(perPage);
      //   console.log("=>>>",result);
      const count = await categoryModel.count(searchObj);
      return res.render("listCategory", {
        data: result,
        current: page,
        queryData: req.query,
        pages: Math.ceil(count / perPage),
        dodyData: undefined,
        search: searchKeyword,
      });
    } catch (error) {
      console.log(error);
    }
  };


  //    GET Edit Category Page  //
  editCategoryPage = async (req: Request, res: Response) => {
    try {
      const results = await categoryModel.findById(req.params.id, req.body);
      // console.log(results);

      return res.render("editCategory", {
        data: results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //    POST Category Data  //
  editCategoryData = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const data = await categoryModel.findById(req.body.id);
      //console.log("body===>", body);
      //console.log("data---->",data);
      // console.log(body.image);
      // console.log(body.productImage);
      // console.log(req.file?.filename);

      if (req.file) {
        body.image = req.file.filename;
        deleteFileExt(data.image);
      }
      //   console.log("if condisen", data);

      const result = await categoryModel.findByIdAndUpdate(req.body, body);
      // console.log(result);
      return res.redirect("/category/list");
    } catch (error) {
      console.log(error);
    }
  };


  //    View Category Page   //
  viewCategoryPage = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const viewData = await categoryModel.findOne({
        _id: new mongoose.Types.ObjectId(`${id}`),
      });
      return res.render("viewCategory", {
        data: viewData,
      });
    } catch (error) {
      console.log(error);
    }
  };


  //    DELETE Category Reacord   //
  deleteCategory = async (req: Request, res: Response) => {
    try {
      const data = await categoryModel.findById(req.params.id);
      deleteFileExt(data.image);
      await categoryModel.findByIdAndDelete(req.params.id);
      return res.redirect("/category/list");
    } catch (error) {
      console.log(error);
    }
  };

}
