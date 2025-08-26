import { RequestStatus, ServiceType } from "@prisma/client";

export interface CreateRequestDto {
  providerId?: number; // assign later, optional
  serviceType: ServiceType;
  isRecurring?: boolean; // defaults to false
}

export interface UpdateRequestDto {
  providerId?: number;
  status?: RequestStatus;
  scheduledAt?: Date;
  completedAt?: Date;
  isRecurring?: boolean;
}
