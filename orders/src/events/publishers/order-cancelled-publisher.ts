import { Subjects, Publisher, OrderCancelledEvent } from '@sk16tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
