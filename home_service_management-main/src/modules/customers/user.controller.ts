import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

const service = new UserService();

export class CustomerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const customer = await service.create(data);
      return res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async findAll(_: Request, res: Response, next: NextFunction) {
    try {
      console.log("Fetching all customers...");
      const customers = await service.findAll();
      return res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    console.log("Fetching customer...");
    try {
      const id = Number(req.params.id);
      const customer = await service.findById(id);
      return res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const customer = await service.update(id, data);
      return res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const customer = await service.remove(id);
      return res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
}
