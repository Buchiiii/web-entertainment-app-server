import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { BaseInterface } from "./base.interface.repository";
import { sortOrder } from "../enums";
import {
  IMetaProps,
  IOptions,
  IPaginateMeta,
  IPaginateResult,
} from "../interfaces/pagination-interface";
import { error } from "console";
import HttpError from "../Error";
interface hasId {
  id: string;
}
export class BaseRepository<T extends Record<string, any>>
  implements BaseInterface<T>
{
  private entity: Repository<T>;
  protected constructor(repository: Repository<T>) {
    this.entity = repository;
  }

  private getMeta({ data, total, limit, page }: IMetaProps) {
    const meta: IPaginateMeta = {
      totalItems: total,
      itemsPerPage: limit,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      count: data.length,
    };
    return meta;
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    const dataa = this.entity.create(data);
    return this.entity.save(dataa);
  }

  public async findAllWithPagination(
    conditions: FindManyOptions<T> | FindOptionsWhere<T>,
    options: IOptions,
    sortOrder: sortOrder,
    sortBy?: keyof T
  ): Promise<IPaginateResult<T>> {
    if (sortBy) {
      const order: FindOptionsOrder<T> = {
        [sortBy]: sortOrder,
      } as FindOptionsOrder<T>;

      conditions = { ...conditions, order };
    }

    const { limit, page } = options;

    const query = { ...conditions, take: limit, skip: (page - 1) * limit };
    const [data, total] = await this.entity.findAndCount(query);
    const meta = this.getMeta({ data, total, limit, page });
    return { data, meta };
  }

  async findOne(conditions: FindOneOptions<T>): Promise<T> {
    const record = await this.entity.findOne(conditions);
    if (!record) {
      throw new HttpError(404, "Not found");
    }
    return record;
  }

  public async findAll(): Promise<T[]> {
    const records = await this.entity.find();
    return records;
  }

  public async saveMany(
    entites: T[]
  ): Promise<{ message: "Saved sucessfully" }> {
    entites.forEach((element) => {
      this.entity.save(element);
    });

    return { message: "Saved sucessfully" };
  }
}
