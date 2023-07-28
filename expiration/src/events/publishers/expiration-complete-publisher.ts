import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@sk16tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
