import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import OrderCard from "../components/orders/OrderCard";
import { OrderContext } from "../store/order";
const OrdersPage = () => {
  const orderCtx = useContext(OrderContext);
  const orderList = orderCtx.ordersList;

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {orderList.map((order) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={order._id}>
              <OrderCard
                customer={order.customer.name}
                dishes={order.items}
                id={order._id}
                pickupTime={order.pickupTime}
                note={order.note}
                status={order.status}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default OrdersPage;
