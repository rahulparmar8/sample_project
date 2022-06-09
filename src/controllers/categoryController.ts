import categoryModel from "../models/categoryModels";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { deleteFileExt } from "../helper/deleteFile";
import { sorting } from "../helper/sorts";
import { categoryListData } from "../helper/categoryLookup";
import { body } from "express-validator";

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
      // const catData = await categoryListData();

      const { name, desc, image } = req.body;
      //   console.log(req.body);
      const data = new categoryModel({
        name: name,
        desc: desc,
        status: true,
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
      res.redirect("/category/list");
    } catch (error) {
      console.log(error);
    }
  };


  //    GET All Category List   //
  listCategory = async (req: Request, res: Response) => {
    try {
      const perPage = 5;
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
      const catData = await categoryModel.aggregate([
        { $match: searchObj },
        {
          $lookup: {
            from: "categories",
            localField: "parent_id",
            foreignField: "_id",
            as: "children",
          },
        },
        { "$sort": recievedData.sortMethod },
        { "$skip": perPage * Number(page) - perPage },
        { "$limit": perPage },

      ])
      const result = await categoryModel
        .find(searchObj)
        .sort(recievedData.sortMethod)
        .skip(perPage * Number(page) - perPage)
        .limit(perPage);
      // console.log("=>>>",result);
      const count = await categoryModel.count(searchObj);

      catData?.map((element) => {
        // console.log("children==>", element.children)
      })
      // console.log("result==>", catData);

      return res.render("listCategory", {
        data: catData,
        current: page,
        queryData: req.query,
        pages: Math.ceil(count / perPage),
        dodyData: undefined,
        search: searchKeyword,
        // cat:catData

      });
    } catch (error) {
      console.log(error);
    }
  };


  //    GET Edit Category Page  //
  editCategoryPage = async (req: Request, res: Response) => {
    try {
      const categorylist = await categoryModel.find({ 'parent_id': null, '_id': { $ne: req.params.id } })
      const results = await categoryModel.findById(req.params.id, req.body);
      // console.log(results);
      // console.log("result=>>",req.params.id);

      //   const catData = await categoryModel.aggregate([
      //     {
      //         $lookup: {
      //             from: "categories",
      //             localField: "_id",
      //             foreignField: "parent_id",
      //             as: "children",
      //         },
      //     },
      // ])
      // console.log("listCat=>",categorylist);
      // console.log(categorylist);

      return res.render("editCategory", {
        data: results,
        categorylist: categorylist
        // catlist: categorylist
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
      // console.log("data---->", data);
      // console.log(body);
      // console.log(body.productImage);
      // console.log(req.file?.filename);
      if (body.cat_id == "0") {
        body.parent = 1
        body.parent_id = null
      }
      else {
        body.parent = 0
        body.parent_id = req.body.cat_id;
      }



      if (req.file) {
        body.image = req.file.filename;
        deleteFileExt(data.image);
      }
      // console.log("body===>", body);

      const result = await categoryModel.findByIdAndUpdate(req.params.id, body);
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
      const viewData: any = await categoryModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(`${id}`) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "parent_id",
            foreignField: "_id",
            as: "categories",
          },
        },
      ]);
      // console.log(viewData);

      // const viewData = await categoryModel.findOne({
      //   _id: new mongoose.Types.ObjectId(`${id}`),
      // });
      return res.render("viewCategory", {
        data: viewData[0],
      });
    } catch (error) {
      console.log(error);
    }
  };


  statusCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = req.params.data;
      const queryData = req.query;
      // console.log("data==>", data);
      // console.log("query", queryData);

      const dataChange = await categoryModel.updateOne(
        { _id: id },
        data === "0" ? { status: 1 } : { status: 0 }
      );
      if (!dataChange) {
        return res.redirect("/category/list");
      }

      const qs = Object.keys(queryData)
        .map((key) => `${key}=${queryData[key]}`)
        .join("&");


      // console.log("in api");
      // const data = req.params.data as string;
      // const id = req.params.id;
      // const queryData = req.query;
      // console.log("data==>",data);
      // console.log("querydata==>",queryData);

      // const dataChange = await categoryModel.updateOne(
      //   { _id: id },
      //   data === "0" ? { status: 1 } : { status: 0 }
      // );
      // // console.log("status", dataChange);

      // if (!dataChange) {
      //   return res.redirect("/category/list");
      // }

      // const qs = Object.keys(queryData)
      //   .map((key) => `${key}=${queryData[key]}`)
      //   .join("&");

      return res.redirect(`/category/list?${qs}`);
    } catch (error) {
      console.log(error);

    }
  }

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
