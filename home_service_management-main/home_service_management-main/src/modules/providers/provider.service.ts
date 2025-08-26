import prismaClient from "../../db/prismaClient";
import { CreateProviderDto, UpdateProviderDto } from "./dto/provider.dto";

export class ProviderService {
  async create(data: CreateProviderDto) {
    const { skillNames = [], ...rest } = data;
    return prismaClient.serviceProvider.create({
      data: {
        ...rest,
        skills: {
          connectOrCreate: skillNames.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { skills: true },
    });
  }

  async findAll() {
    return prismaClient.serviceProvider.findMany({
      include: { skills: true },
    });
  }

  async findById(id: number) {
    return prismaClient.serviceProvider.findUnique({
      where: { id },
      include: { skills: true },
    });
  }

  async update(id: number, data: UpdateProviderDto) {
    const { skillNames = [], ...rest } = data;
    return prismaClient.serviceProvider.update({
      where: { id },
      data: {
        ...rest,
        skills: {
          connectOrCreate: skillNames.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { skills: true },
    });
  }

  async remove(id: number) {
    return prismaClient.serviceProvider.delete({ where: { id } });
  }
}
