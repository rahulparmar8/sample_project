import jwt from "jsonwebtoken";

export const getToken = (data: any) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  const dataEmail = {
    email: data,
  };
  const token = jwt.sign(dataEmail, jwtSecretKey);
  return token;
};
