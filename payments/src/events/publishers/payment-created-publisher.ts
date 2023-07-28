import { Subjects, Publisher, PaymentCreatedEvent } from '@sk16tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
