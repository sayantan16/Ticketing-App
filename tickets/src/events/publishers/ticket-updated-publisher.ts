import { Publisher, Subjects, TicketUpdatedEvent } from '@sk16tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
