import express, { Request, Response } from "express";
import productModel from "../models/produtModels.js";
import { sorting } from "../helper/sorts";
import { deleteFileExt } from "../helper/deleteFile.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

export default class Product {
  //  Product Page    //
  productAddPage = async (req: Request, res: Response) => {
    try {
      // const tabel = await productModel.findById({ _id: req.params.id });
      // console.log(tabel);
      // return res.status(200).json(tabel)
      return res.render("addproduct");
    } catch (error) {
      console.log(error);
    }
  };

  //  Add Product //
  productAddData = async (req: Request, res: Response) => {
    try {
      // console.log('file===>',JSON.stringify(req.file))
      const errors = validationResult(req);
      // console.log('errors====', errors)
      if (!errors.isEmpty()) {
        const result = await productModel.find();
        return res.render("addproduct", {
          bodyData: req.body,
          alert: errors.array(),
          data: result,
        });
      }
      // console.log('dh====>>', req.file)
      const { name, desc, discount, price, image, status } = req.body;
      // console.log("Body", req.body);
      const data = new productModel({
        name: name,
        desc: desc,
        discount: discount,
        price: price,
        image: image,
        status: true
      });
      // console.log("img", req.files); 
      const body = req.body;
      if (req.file) {
        body.image = req.file.filename;
      }
      const result = await productModel.create(body);
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
      // let searchKeyword = req.query.search;
      const searchKeyword = req.query.search as string;
      // let mysort = { name: 1 }
      // console.log(page, "  ", perPage, " ", perPage * Number(page) - perPage)
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

      const result = await productModel
        .find(searchObj)
        .sort(recievedData.sortMethod)
        .skip(perPage * Number(page) - perPage)
        .limit(perPage);

      const count = await productModel.count(searchObj);
      // const count = await productModel.count(
      //   searchKeyword ? { name: req.query.search } : {}
      // );
      // console.log(result)
      return res.render("listproduct", {
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

  //   GET Edit Product Page    //
  editProductPage = async (req: Request, res: Response) => {
    try {
      const results = await productModel.findById(req.params.id, req.body);
      //   console.log(req.body);
      return res.render("editproduct", {
        data: results,
      });
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
      // console.log(data ,body);
      // console.log(body.image);
      // console.log(body.productImage);
      // console.log(req.file?.filename);

      if (req.file) {
        body.image = req.file.filename;
        deleteFileExt(data.image);
      }

      const result = await productModel.findByIdAndUpdate(req.params.id, req.body, body);
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
      // const viewData: any = await productModel.aggregate([
      //   {
      //     $match: { _id: new mongoose.Types.ObjectId(`${id}`) },
      //   },
      // ]);

      const viewData = await productModel.findOne({ 
        _id :  new mongoose.Types.ObjectId(`${id}`)
      })


      // console.log(viewData);

      // const product = viewData[0];

      return res.render("viewproduct", {
        data: viewData,
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
