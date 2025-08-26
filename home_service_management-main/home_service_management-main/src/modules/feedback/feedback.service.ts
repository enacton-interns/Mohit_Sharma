import prisma from "../../db/prismaClient";
import { CreateFeedbackDto, UpdateFeedbackDto } from "./dto/feedback.dto";

export class FeedbackService {
  async create(customerId: number, data: CreateFeedbackDto) {
    return prisma.feedback.create({
      data: {
        customerId,
        providerId: data.providerId,
        requestId: data.requestId,
        rating: data.rating,
        comment: data.comment,
      },
      include: {
        customer: true,
        provider: true,
        request: true,
      },
    });
  }

  async findAll() {
    return prisma.feedback.findMany({
      include: {
        customer: true,
        provider: true,
        request: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.feedback.findUnique({
      where: { id },
      include: {
        customer: true,
        provider: true,
        request: true,
      },
    });
  }

  async update(id: number, data: UpdateFeedbackDto) {
    return prisma.feedback.update({
      where: { id },
      data,
      include: {
        customer: true,
        provider: true,
        request: true,
      },
    });
  }

  async remove(id: number) {
    return prisma.feedback.delete({ where: { id } });
  }
}
