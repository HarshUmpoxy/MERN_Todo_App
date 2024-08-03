import jwt from "jsonwebtoken";

export const sendCookie = (user, req, message, statusCode = 200) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    res 
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 45*60*1000
      })
      .json({
        success: true,
        message,
      });
};