import { Application } from "express";
import { UserController } from "../users/user.controller";
import AuthService from "../auth/auth.service";
import * as jwt from "jsonwebtoken";
import { token } from "../utils/token";
import HttpError from "../common/Error";
import { refreshToken } from "../utils/refreshToken";
import { authenticate } from "../middlewares/authenticate";
import Showcontroller from "../shows/show.controller";
const user = new UserController();
const auth = new AuthService();
const show = new Showcontroller();
class Routes {
  public router(app: Application) {
    app.post("/user/create", user.create);
    app.post("/show/createmany", show.createMany);
    app.get("/show", authenticate, show.find);
    app.get("/show/trending", authenticate, show.findTrending);
    app.get("/show/movies", authenticate, show.findMovies);
    app.get("/show/series", authenticate, show.findSeries);
    app.get("/show/recommended", authenticate, show.findRecommended);
    app.post("/login", auth.loginUser);
    app.get("/refreshtoken", (req, res) => {
      try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new HttpError(500, "Internal Server Error");
        }
        const refreshToken = req.cookies["refreshToken"];

        const decoded = jwt.verify(refreshToken, secret) as { id: string };

        const newAcesstoken = token({ id: decoded.id });

        res
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
          })
          .send({ accessToken: newAcesstoken });
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          console.log("Token expired");
          res
            .status(403)
            .json({ statusCode: 403, message: "Unauthorized! Expired token" });
        }
      }
    });
  }
}

export const route = new Routes().router;
