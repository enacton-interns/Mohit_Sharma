// src/modules/customers/user.service.ts
import prismaClient from "../../db/prismaClient";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

export class UserService {
  async create(data: CreateUserDto) {
    return prismaClient.user.create({ data });
  }

  async findAll() {
    return prismaClient.user.findMany();
  }

  async findById(id: number) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto) {
    return prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return prismaClient.user.delete({ where: { id } });
  }
}
