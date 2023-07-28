import { Ticket } from '../ticket';

it('Implements optimistic concurreny control', async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  // Save the ticket to the database
  await ticket.save();

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // Save the first fetched ticket
  await firstInstance!.save();

  // Save the second fetche ticket - outdated version number. Expecting a failure
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('Increments the version number on multiple saves', async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  // Save the ticket to the database
  await ticket.save();
  expect(ticket.version).toEqual(0);

  // Save the same record another time
  await ticket.save();
  expect(ticket.version).toEqual(1);

  // Save the same record another time
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
