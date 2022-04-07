import { NotFoundException, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

export interface IDataService<T> {
  readonly repository: Repository<T>;
  findOne: (
    options?: FindConditions<T>,
    relations?: FindOneOptions<T>,
  ) => Promise<T | null>;
  find: (options?: FindConditions<T>) => Promise<T[] | null>;
  create: (args: any) => Promise<T | null>;
  update: (options: FindConditions<T>, args: any) => Promise<T | null>;
  delete: (conditions: FindConditions<T>) => Promise<boolean>;
}

type Constructor<I> = new (...args: any[]) => I;

export function DataService<T>(entity: Constructor<T>): Type<IDataService<T>> {
  class DataService implements IDataService<T> {
    @InjectRepository(entity) public readonly repository: Repository<T>; //Since entity its gonna be the argument of the constructor

    public async findOne(
      options?: FindConditions<T>,
      relations?: FindOneOptions<T>,
    ): Promise<T> {
      const entity = await this.repository.findOne(options, relations);
      if (!entity) throw new NotFoundException('User Not Found');
      return entity;
    }

    public async find(options?: FindConditions<T>): Promise<T[]> {
      return await this.repository.find(options);
    }

    public async create(args: any): Promise<T> {
      const newEntity = this.repository.create(args) as unknown as T;
      return await this.repository.save(newEntity as any);
    }

    public async update(options: FindConditions<T>, args: any): Promise<T> {
      return (await this.repository.update(
        options,
        args as any,
      )) as unknown as T;
    }
    public async delete(conditions: FindConditions<T>): Promise<boolean> {
      await this.repository.delete(conditions);
      return true;
    }
  }
  return DataService;
}
