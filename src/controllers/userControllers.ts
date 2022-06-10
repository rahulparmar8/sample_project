import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { getToken } from "../helper/generateToken";
import { transporter } from "../helper/emailTransporter";


interface UserPayload {
    email: string;
}

export class userController {


    userRegisterForm = async (req: Request, res: Response) => {
        try {
            return res.render("registerPage")
        } catch (error) {
            console.log(error);
        }
    }

    userRegisterData = async (req: Request, res: Response) => {
        try {
            const salt = await bcryptjs.genSalt(10);
            const hashpassword = await bcryptjs.hash(req.body.password, salt);
            // const token = getToken(req.body.email);

            const { name, email, mob, password } = req.body;
            const token = crypto.randomBytes(35).toString('hex')
            // const token =getToken(req.body.email);
            const data = new userModel({
                name: name,
                email: email,
                mob: mob,
                password: hashpassword,
                emailToken: token,
                emailVerification: true,
                status: true,
            })
            if (req.file) {
                data.image = req.file.filename;
            }
            // console.log(data);

            const result = await userModel.create(data);

            await transporter.sendMail({
                from: "hey@buddy.com",
                to: "rahul.p@peerbits.com",
                subject: "Email verification link ✔",
                html: `<h1>Verify your email.</h1>
                <a href='http://localhost:3000/email/verify/${token}'><button>Click here to verify</button></a>`,
            });
            req.session.message = "Check your email & verify it.";
            return res.redirect("/login");
        } catch (error) {
            console.log(error);

        }
    }


    userLogInForm = async (req: Request, res: Response) => {
        try {
            return res.render("logInPage");
        } catch (error) {
            console.log(error);

        }
    }

    userLogIn = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            console.log(body);

            const user = await userModel.findOne({ email: body.email });
            if (!user) {
                throw { alert: [{ msg: "User not found" }] };
            }
            if (user?.isEmailVerified === false) {
                throw {
                    alert: [{ msg: "Email is not verified" }],
                };
            }
            const validPassword = await bcryptjs.compare(
                body.password,
                user.password as string
            );
            console.log(validPassword);

            if (!validPassword) {
                throw { alert: [{ msg: "Password does not matched" }] };
            }
            // req.session.user = {
            //     _id: user?._id,
            //     email: user?.email,
            //     name: user?.name,
            // userProfile: user?.userProfile,
            // };
            return res.redirect("/product/list");

        } catch (error) {
            console.log(error);
        }
    }

    emailVerification = async (req: Request, res: Response) => {
        try {
            const token = req.params.token;
            const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
            const verified = jwt.verify(token, jwtSecretKey) as UserPayload;
            const emailTokenCHeck = await userModel.findOne({ email: verified.email });

            if (verified.email && emailTokenCHeck?.emailToken !== null) {
                const data = await userModel.updateOne(
                    { email: verified.email },
                    { isEmailVerified: true, emailToken: null }
                );
                if (data.modifiedCount === 1) {
                    req.session.message = "Email verified.Now you can log in.";
                    return res.redirect("/login");
                }
            }
            req.session.message = "Email already verified.";
            return res.redirect("/login");


        } catch (error) {
            console.log(error);
        }
    }

}
