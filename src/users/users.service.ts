import { Injectable } from '@nestjs/common';

import * as schema from '../db/schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService } from 'src/db/drizzle.service';

@Injectable()
export class UsersService {
  private db;

  constructor(private readonly drizzleService: DrizzleService) {
    this.db = this.drizzleService.getDb();
  }

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const user = {
      ...createUserDto,
      id: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.db.insert(schema.users).values(user).execute();
    return user;
  }

  async findAll() {
    return await this.db.query.users.findMany({});
  }

  async findOne(id: number) {
    return await this.db.query.users.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.db
      .update(schema.users)
      .set(updateUserDto)
      .where({ id })
      .execute();
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.db.delete(schema.users).where({ id }).execute();
  }
}
