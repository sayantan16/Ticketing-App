import { Publisher, Subjects, TicketCreatedEvent } from '@sk16tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
