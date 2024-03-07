import { DeepPartial, FindManyOptions, FindOptionsWhere } from "typeorm";
import { IOptions, IPaginateResult } from "../interfaces/pagination-interface";
import { sortOrder } from "../enums";
export interface BaseInterface<T> {
  create(data: DeepPartial<T>): Promise<T>;
  findOne(conditions: FindManyOptions<T>): Promise<T>;
  // findOneById(id: string): Promise<T>;
  findAllWithPagination(
    conditions: FindManyOptions<T> | FindOptionsWhere<T>,
    options: IOptions,
    sortOrder: sortOrder.ASC | sortOrder.DESC,
    sortBy?: keyof T
  ): Promise<IPaginateResult<T>>;
  findAll(): Promise<T[]>;
  saveMany(entites: T[]): Promise<{ message: "Saved sucessfully" }>;
}
