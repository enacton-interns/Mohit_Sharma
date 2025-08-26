import { Request, Response, NextFunction } from "express";
import { ProviderService } from "./provider.service";

const service = new ProviderService();

export class ProviderController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const provider = await service.create(data);
      return res.status(201).json(provider);
    } catch (error) {
      next(error);
    }
  }

  async findAll(_: Request, res: Response, next: NextFunction) {
    try {
      const providers = await service.findAll();
      return res.status(200).json(providers);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const provider = await service.findById(id);
      return res.status(200).json(provider);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const provider = await service.update(id, data);
      return res.status(200).json(provider);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const provider = await service.remove(id);
      return res.status(200).json(provider);
    } catch (error) {
      next(error);
    }
  }
}
