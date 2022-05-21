import React, { useContext, useEffect, useState } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";

import { OrderStatusEnum } from "../types";
import OrderDetailInfo from "../components/orders/OrderDetailInfo";
import OrderDetailAction from "../components/orders/OrderDetailAction";
import { OrderContext } from "../store/order";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const orderCtx = useContext(OrderContext);
  const navigate = useNavigate();
  const getOrderDetail = orderCtx.getOrderDetail;

  const { id: orderId } = useParams();

  const orderDetail = orderCtx.orderDetail;

  const [readyItemsArray, setReadyItemsArray] = React.useState<boolean[]>([]);

  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum>(
    OrderStatusEnum.Waiting
  );

  const isAllItemReady = readyItemsArray.every(
    (itemReady) => itemReady !== false
  );

  const updateItemReadyHandler = (position: number) => {
    const updateItemReadyArray = readyItemsArray.map((item, index) =>
      index === position ? !item : item
    );

    setReadyItemsArray(updateItemReadyArray);
  };

  useEffect(() => {
    if (!orderDetail || orderDetail._id !== orderId) {
      getOrderDetail(orderId!);
    }
    if (orderDetail) {
      setReadyItemsArray(new Array(orderDetail.items.length).fill(false));
      setOrderStatus(orderDetail.status);
    }
  }, [orderId, orderDetail, getOrderDetail]);

  return (
    <>
      <Box>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>

        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          {orderDetail && (
            <>
              <Box sx={{ minWidth: "50%" }}>
                <OrderDetailInfo
                  customer={orderDetail.customer.name}
                  phoneNumber={orderDetail.customer.phoneNumber}
                  id={orderDetail._id}
                  dishes={orderDetail.items}
                  status={orderStatus}
                  readyItems={readyItemsArray}
                  updateItemReadyHandler={updateItemReadyHandler}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "50%",
                }}
              >
                <OrderDetailAction
                  pickupTime={orderDetail.pickupTime}
                  note={orderDetail.note}
                  status={orderStatus}
                  setOrderStatus={setOrderStatus}
                  isAllItemReady={isAllItemReady}
                  includeCutlery={orderDetail.packaging.includeCutlery}
                />
              </Box>
            </>
          )}
          {!orderDetail && (
            <Typography sx={{ padding: "4rem" }}>No order found</Typography>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default OrderDetailPage;
