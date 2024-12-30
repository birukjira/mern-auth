import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // to prevent client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // to only send the cookie over HTTPS
    sameSite: "strict", // to prevent the cookie from being sent on cross-site requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  return token;
};
