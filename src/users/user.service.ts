import { dataSource } from "../../db/datasource";
import { BaseRepository } from "../common/base/base.abstract.repository";
import { User } from "./entities/user.entity";
const repo = dataSource.getRepository(User)

export class UserService extends BaseRepository<User> {
  constructor() {
    super(repo);
  }

 
}
