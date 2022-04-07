import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
//THESE TEMPLATE CAN BE USED TO USE REPOSITORY PATTERN WITH SERVICES, NEED ADJUSTMENTS ON PARAMETERS
export abstract class EntityRepository<T extends BaseEntity> {
  constructor(private readonly _repo: Repository<T>) {}

  async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    return await this._repo.findOne(options);
  }

  async find(options?: FindManyOptions<T>): Promise<T[] | null> {
    return await this._repo.find(options);
  }

  async create(args: any): Promise<T | null> {
    const newEntity = this._repo.create(args) as unknown as T;
    return await this._repo.save(newEntity as any); //Must be casted to any
  }

  async delete(conditions: FindConditions<T>): Promise<boolean> {
    await this._repo.delete(conditions);
    return true; //If theres an error, controller will catch it
  }

  async update(conditions: FindConditions<T>, args: T): Promise<UpdateResult> {
    const updatedEntity = this._repo.merge(args);
    return await this._repo.update(conditions, updatedEntity as any);
  }
}
