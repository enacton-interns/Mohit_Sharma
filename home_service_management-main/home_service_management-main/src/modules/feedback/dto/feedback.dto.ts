export interface CreateFeedbackDto {
  providerId: number; // who the feedback is for
  requestId: number; // which service request
  rating: number; // 1–5
  comment?: string;
}

export interface UpdateFeedbackDto {
  rating?: number;
  comment?: string;
}
