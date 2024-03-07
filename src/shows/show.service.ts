import { dataSource } from "../../db/datasource";
import { BaseRepository } from "../common/base/base.abstract.repository";
import { Show } from "./entities/show.entity";

const repo = dataSource.getRepository(Show);
class ShowService extends BaseRepository<Show> {
  constructor() {
    super(repo);
  }
}

export default ShowService
