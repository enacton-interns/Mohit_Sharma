import prisma from "../../db/prismaClient";
import { CreateRequestDto, UpdateRequestDto } from "./dto/request.dto";

export class RequestService {
  async create(customerId: number, data: CreateRequestDto) {
    return prisma.serviceRequest.create({
      data: {
        customerId,
        providerId: data.providerId,
        serviceType: data.serviceType,
        isRecurring: data.isRecurring ?? false,
      },
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async findAll() {
    return prisma.serviceRequest.findMany({
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async update(id: number, data: UpdateRequestDto) {
    return prisma.serviceRequest.update({
      where: { id },
      data,
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async remove(id: number) {
    return prisma.serviceRequest.delete({ where: { id } });
  }

  // Now here is the functionality to assign a provider to a request (like for client side the provider accepts the service request and starts working on it). Also change status and sceheduleAt
  async assignProvider(
    requestId: number,
    providerId: number,
    sceheduledAt: Date
  ) {
    return prisma.serviceRequest.update({
      where: { id: requestId },
      data: { providerId, status: "IN_PROGRESS", scheduledAt: sceheduledAt },
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }
}
