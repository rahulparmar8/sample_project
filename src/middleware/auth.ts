import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

const authUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next();
  }
  return res.redirect("/login");
};

const userCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  return next();
};

declare module "express-session" {
  interface SessionData {
    user?: User;
    message?: String;
    name?: string;
    errorMessage?: string;
  }
}

export { authUser, userCheck };
