import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import userRequest from '../../hooks/user-request';
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = userRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return (
      <div>
        <h1>{order.ticket.title}</h1>
        <h4>Order Expired!</h4>
      </div>
    );
  }

  return (
    <div>
      <h1>{order.ticket.title}</h1>
      <div>Time left to pay: {timeLeft} seconds...</div>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51NYecXJDaZ5vvvHYPgzkWFypjkvfKczyXeKRlpsYq7uWBz4GuOqlO3wfI1B0dqpGNWvjcbyJKbMAWOuVSY7YMonI00UJnT0Y0Q"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      ></StripeCheckout>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
