import styled from "styled-components";

const OrderContainer = styled.div`
  border: solid red;
`;

const OrderDetails = styled.ul`
  list-style: none;
`;
const OrderProducts = styled.ul`
  list-style: none;
`;
const CustomerDetails = styled.ul`
  list-style: none;
  text-align: left;
`;

const OrderProduct = styled.li`
  text-align: left;
  margin: 1rem 0 1rem 0;
`;

export const Order = (props) => {
  const { order } = props;
  return (
    <OrderContainer>
      <div>
        <b>Order no:</b> {order._id}
      </div>
      <OrderDetails>
        <CustomerDetails>
          <div>
            <b>Customer:</b>{" "}
            {`${order._customer.firstName} ${order._customer.lastName}`}
          </div>
          <div>
            <b>Address:</b>{" "}
            {`${order._customer.streetAddress}, ${order._customer._city.name}`}
          </div>
        </CustomerDetails>
        <OrderProducts>
          {order &&
            order._orderProducts.map((orderProduct) => {
              return (
                <OrderProduct key={orderProduct.stockProduct._id}>
                  <div>
                    <b>Name:</b> {orderProduct.stockProduct._product.name}
                  </div>
                  <div>
                    <b>Serial no:</b> {orderProduct.stockProduct._id}
                  </div>
                  <div>
                    <b>Quantity:</b> {orderProduct.quantity}
                  </div>
                  <div>
                    <b>Subtotal:</b> $
                    {Number.parseFloat(
                      orderProduct.stockProduct._product.price *
                        orderProduct.quantity
                    ).toFixed(2)}
                  </div>
                </OrderProduct>
              );
            })}
        </OrderProducts>
        <div>
          <b>Total price: </b>${Number.parseFloat(order.totalPrice).toFixed(2)}
        </div>
        <div>
          <b>Status: </b>
          {order.status}
        </div>
      </OrderDetails>
    </OrderContainer>
  );
};
