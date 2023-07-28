import { Publisher, OrderCreatedEvent, Subjects } from '@sk16tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
