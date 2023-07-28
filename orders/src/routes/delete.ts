import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
} from '@sk16tickets/common';
import { Order, OrderStatus } from '../models/order';

import { natsWrapper } from '../nats-wrapper';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';

const router = express.Router();

router.delete(
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

    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying that this order has been cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
