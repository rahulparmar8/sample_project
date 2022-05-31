import express, { Request, Response } from "express";
import productModel from "../models/produtModels.js";
import { sorting } from "../helper/sorts";
import { validationResult } from "express-validator";
import multer from "multer";
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
      console.log('errors====', errors)
      if (!errors.isEmpty()) {
        const result = await productModel.find();
        return res.render("addproduct", {
          bodyData: req.body,
          alert: errors.array(),
          data: result,
        });
      }
      console.log('dh====>>', req.file)
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

      return res.redirect("/product/list/1");
    } catch (error) {
      console.log(error);
    }
  };

  // All Product List  //
  listProduct = async (req: Request, res: Response) => {
    try {
      const perPage = 5;
      const page = req.params.page || 1;
      const recievedData = sorting(req.query);
      // let searchKeyword = req.query.search;
      const searchKeyword = req.query.search as string;
      // let mysort = { name: 1 }

      let searchObj = {};

      if (searchKeyword) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchKeyword)
          ? {
            $or: [{ discount: searchKeyword }, { price: searchKeyword }],
          }
          : { name: new RegExp(`${searchKeyword.toString().trim()}`, "i") };
      }


      // console.log("searc=>>>>>",searchKeyword);

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
      const body = req.body;
      if (req.file) {
        body.image = req.file.filename;
      }
      const result = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
      );
      console.log("img", req.files);
      console.log("Reshult=>>>", result);

      return res.redirect("/product/list/1");
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
      ]);
      // console.log(viewData);

      const product = viewData[0];

      return res.render("viewproduct", {
        data: product,
      });
    } catch (error) {
      console.log(error);
    }
  };

  statusChange = (req: Request, res: Response) => {
    try {

    } catch (error) {
      console.log(error);

    }
  }

  //  Delete Product Data     //
  deleteProduct = async (req: Request, res: Response) => {
    try {
      const result = await productModel.findByIdAndDelete(req.params.id);
      return res.redirect("/product/list/1");
    } catch (error) {
      console.log(error);
    }
  };
}
