import HttpError from "../common/Error";
import { UserService } from "../users/user.service";
import * as bcrypt from "bcrypt";
import { refreshToken } from "../utils/refreshToken";
import { token } from "../utils/token";
import { Response, Request } from "express";

const userService = new UserService();

class AuthService {
  public validateUser = async (email: string, password: string) => {
    const user = await userService.findOne({ where: { email } });

    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpError(400, "Password does not match");
    }

    return user;
  };

  public loginUser = async (req: Request, res: Response) => {
    try {
      const user = await this.validateUser(req.body.email, req.body.password);
      const { password, ...rest } = user;

      const payload = { id: user.id };
      const tokenn = token(payload);
      const refreshTokenn = refreshToken(payload);
      res

        .cookie("refreshToken", refreshTokenn, {
          httpOnly: true,
          sameSite: "strict",
        })
        .send({ ...rest, accessToken: tokenn });
    } catch (err) {
      if (err instanceof HttpError) {
        res
          .status(err.statusCode)
          .json({ statusCode: err.statusCode, message: err.message });
      }
    }
  };
}

export default AuthService;
