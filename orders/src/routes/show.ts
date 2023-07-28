import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
} from '@sk16tickets/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    // to add check for order Id
    const idCheck = mongoose.Types.ObjectId.isValid(req.params.orderId);
    if (!idCheck) {
      throw new BadRequestError('Valid Order Id must be provided');
    }

    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
