export const Order = (props) => {
  const { order } = props;
  return (
    <div>
      <div>
        <b>Order no:</b> {order._id}
      </div>
      <h2>Products</h2>
      <ul>
        {order &&
          order._orderProducts.map((orderProduct) => {
            return (
              <li key={orderProduct._id}>
                <div>
                  <h3>
                    <b>{orderProduct.stockProduct._product.name}</b>
                  </h3>
                </div>
                <img
                  width="100px"
                  src={orderProduct.stockProduct._product.img}
                />
                <div>
                  <b>Quantity:</b> {orderProduct.quantity}
                </div>
                <div>
                  $
                  {Number.parseFloat(
                    orderProduct.stockProduct._product.price *
                      orderProduct.quantity
                  ).toFixed(2)}
                </div>
                <div>
                  <b>Total price: </b>$
                  {Number.parseFloat(order.totalPrice).toFixed(2)}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
