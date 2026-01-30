import jwt from "jsonwebtoken";

const genTokenAndSetCookie = (res, userId) => {
      try {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
                  expiresIn: "1d",
            });
            // console.log(token)

            res.cookie("token", token, {
                  httpOnly: true,
                  secure: false,
                  sameSite: "strict",
                  maxAge: 1 * 24 * 60 * 60 * 1000,
            });

            return token;
      } catch (error) {
            console.log(error);
      }
};

export default genTokenAndSetCookie;
