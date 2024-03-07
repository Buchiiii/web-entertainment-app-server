import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user-dto";
import { UserService } from "./user.service";
import { report } from "process";
import { hashPassword } from "../utils/hashPassword";
import HttpError from "../common/Error";
const userService = new UserService();

export class UserController {
  public create = async (req: Request, res: Response) => {
    // const body: CreateUserDto = req.body;
    // console.log(body);
    try {
      const response = await userService.create({
        email: req.body.email,
        password: await hashPassword(req.body.password),
      });
      res.send({ message: "User created successfuly" });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public getInfo = async (req: Request, res: Response) => {
    try {
      const user = req.body.user;
      const userr = await userService.findOne({ where: { id: user.id } });
      const { password, ...rest } = userr;
      res.send(rest);
    } catch (err) {}
  };
}
