import express, { Request, Response } from "express";
import productModel from "../models/produtModels.js";
import { sorting } from "../helper/sorts";
import { deleteFileExt } from "../helper/deleteFile.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import categoryModel from "../models/categoryModels.js";
import { categoryListData } from "../helper/categoryLookup";

export default class Product {
  //  Product Page    //
  productAddPage = async (req: Request, res: Response) => {
    try {
      // const categorylist = await categoryModel.find({});
      const categorylist = await categoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "parent_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { "$match": { "status": 1 } },
      ])

      return res.render("addproduct", {
        catlist: categorylist,

      });
    } catch (error) {
      console.log(error);
    }
  };

  //  Add Product //
  productAddData = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const result = await productModel.find();
        return res.render("addproduct", {
          bodyData: req.body,
          alert: errors.array(),
          data: result,
        });
      }
      // console.log('dh====>>', req.file)
      const { name, desc, discount, price, image, status, category } = req.body;
      // console.log("Body", req.body);
      const data = new productModel({
        name: name,
        desc: desc,
        discount: discount,
        price: price,
        status: true,
        cat_id: category
      });
      // console.log("img", req.files); 
      // const body = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      const result = await productModel.create(data);
      // console.log("save====>", result);

      return res.redirect("/product/list");
    } catch (error) {
      console.log(error);
    }
  };

  // All Product List  //
  listProduct = async (req: Request, res: Response) => {
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
      // console.log("searc=>>>>>",searchKeyword);
      // console.log(recievedData.sortMethod);

      const catData = await productModel.aggregate([
        { $match: searchObj },
        {
          $lookup: {
            from: "categories",
            localField: "cat_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { "$unwind": "$category" },
        { "$match": { "category.status": 1 } },
        { "$sort": recievedData.sortMethod },
        { "$skip": perPage * Number(page) - perPage },
        { "$limit": perPage },
      ])
      // console.log(catData);

      // const result = await productModel
      //   .find(searchObj)
      //   .sort(recievedData.sortMethod)
      //   .skip(perPage * Number(page) - perPage)
      //   .limit(perPage);

      const count = await productModel.count(searchObj);

      // catData?.map((element) => {
      //   // console.log(element.children)  
      // })

      return res.render("listproduct", {
        data: catData,
        current: page,
        queryData: req.query,
        pages: Math.ceil(count / perPage),
        dodyData: undefined,
        search: searchKeyword,
        categorie: catData
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   GET Edit Product Page    //
  editProductPage = async (req: Request, res: Response) => {
    try {
      const categorylist = await categoryModel.find({});
      // console.log("catList==>", categorylist);

      const results = await productModel.findById(req.params.id);
      // console.log(results);
      return res.render("editproduct", {
        data: results,
        catlist: categorylist
      });

      //       const id = req.params.id;
      //       const lookup = await productModel.aggregate([
      //         {
      //           $match: { _id: new mongoose.Types.ObjectId(`${id}`) },
      //         },
      //         {
      //           $lookup: {
      //             from: "categories",
      //             localField: "category",
      //             foreignField: "_id",
      //             as: "info",
      //           },
      //         },
      //       ]);
      // console.log(lookup);

    } catch (error) {
      console.log(error);
    }
  };

  //    POST Edit Product Data     //
  editProductData = async (req: Request, res: Response) => {
    try {
      // const id = req.params.id;
      const body = req.body;
      const data = await productModel.findById(req.body.id)
      // console.log(body);
      // console.log(body.image);
      // console.log(body.productImage);
      // console.log(req.file?.filename);

      if (req.file) {
        body.image = req.file.filename;
        deleteFileExt(data.image);
      }
      if (body.cat_id == "0") {
        // body.parent = 1 
        body.cat_id = null
      }

      const result = await productModel.findByIdAndUpdate(req.params.id, body);
      // console.log("img", req.file);
      // console.log("reshult=>>>", result);
      // console.log(data);

      return res.redirect("/product/list");
    } catch (error) {
      console.log(error);
    }
  };

  //  View Product Page   //
  viewProductPage = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const viewData: any = await productModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(`${id}`) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "cat_id",
            foreignField: "_id",
            as: "categories",
          },
        },
      ]);

      // console.log("viewData==>", viewData);
      // await productModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "_id",
      //       foreignField: "parent_id",
      //       as: "children",
      //     },
      //   },
      // ])
      // const catData = await categoryListData();
      // const viewData = await productModel.findOne({
      //   _id: new mongoose.Types.ObjectId(`${id}`)
      // })
      // console.log("catData==>>", catData[0].children);

      // catData.map(item => console.log(item.children))

      // console.log("viewData==>", viewData);

      // const product = viewData[0];

      return res.render("viewproduct", {
        data: viewData[0],
        // categoryData: catData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  statusChange = async (req: Request, res: Response) => {
    try {
      // console.log("in api");
      const data = req.params.data as string;
      const id = req.params.id;
      const queryData = req.query;
      // console.log(data);
      // console.log(queryData);

      const dataChange = await productModel.updateOne(
        { _id: id },
        data === "0" ? { status: 1 } : { status: 0 }
      );
      // console.log("status", dataChange);

      if (!dataChange) {
        return res.redirect("/product/list");
      }

      const qs = Object.keys(queryData)
        .map((key) => `${key}=${queryData[key]}`)
        .join("&");

      return res.redirect(`/product/list?${qs}`);

    } catch (error) {
      console.log(error);

    }
  }

  //  Delete Product Data     //
  deleteProduct = async (req: Request, res: Response) => {
    try {
      const data = await productModel.findById(req.params.id)
      deleteFileExt(data.image);
      await productModel.findByIdAndDelete(req.params.id);
      return res.redirect("/product/list");
    } catch (error) {
      console.log(error);
    }
  };
}
