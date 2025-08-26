import { Request, Response, NextFunction } from "express";
import { RequestService } from "./request.service";

const service = new RequestService();

export class RequestController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = (req as any).user.id as number;
      const dto = req.body;
      const created = await service.create(customerId, dto);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  async findAll(_: Request, res: Response, next: NextFunction) {
    try {
      const list = await service.findAll();
      res.json(list);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await service.findById(id);
      if (!item) return res.status(404).send();
      res.json(item);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const dto = req.body;
      const updated = await service.update(id, dto);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await service.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  // functionality for assigning a provider to a request
  async assignProvider(req: Request, res: Response, next: NextFunction) {
    try {
      const requestId = Number(req.params.id);
      const { providerId, scheduledAt } = req.body;
      const assigned = await service.assignProvider(
        requestId,
        providerId,
        scheduledAt
      );
      res.json(assigned);
    } catch (err) {
      next(err);
    }
  }
}
