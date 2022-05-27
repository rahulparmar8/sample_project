import express, { Request, Response } from "express";
import productModel from "../models/produtModels.js";
import { validationResult } from "express-validator";

export default class Product {

    //  Product Page    //
    productAddPage = async (req: Request, res: Response) => {
        try {
            // const tabel = await productModel.findById({ _id: req.params.id });
            // console.log(tabel);
            // return res.status(200).json(tabel)
            return res.render("addproduct")
        } catch (error) {
            console.log(error);

        }
    }

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
            const { name, desc, discount, price, image } = req.body
            // console.log(req.body);
            const data = new productModel({
                name: name,
                desc: desc,
                discount: discount,
                price: price,
                image: image
            });
            const result = await data.save();
            // res.status(200).json({ result, message: "Data Saved" })
            return res.redirect("add")
        } catch (error) {
            console.log(error)
        }
    }
    // All Product List  //
    listProduct = async (req: Request, res: Response) => {
        try {
            const result = await productModel.find()
            return res.render("listproduct", {
                data: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    //  Delete Product Data     //
    deleteProduct = async (req: Request, res: Response) => {
        try {
            console.log("in API");

            const result = await productModel.findByIdAndDelete(req.params.id)
            console.log(result);
            return res.redirect("/product/list/")
        } catch (error) {
            console.log(error);

        }
    }

}
