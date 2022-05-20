import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

import { Order, OrderStatusEnum } from "../../types";
import StatusBadge from "../../components/shared/StatusBadge";
import { TimeFormat } from "../../ultis/timeFormat";
import { useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../../store/order";

type OrderDetailActionProps = {
  pickupTime: Order["pickupTime"];
  note: Order["note"];
  status: OrderStatusEnum;
  setOrderStatus: (value: React.SetStateAction<OrderStatusEnum>) => void;
  isAllItemReady: boolean;
  includeCutlery: Order["packaging"]["includeCutlery"];
};

const OrderDetailAction = ({
  pickupTime,
  note,
  status,
  setOrderStatus,
  isAllItemReady,
  includeCutlery,
}: OrderDetailActionProps) => {
  const navigate = useNavigate();

  const { id: orderId } = useParams();

  const orderContext = useContext(OrderContext);

  const updateOrderHandler = orderContext.updateOrder;

  const changeOrderStatusHandler = (status: OrderStatusEnum) => {
    setOrderStatus(status);
    updateOrderHandler(orderId!, status);
  };

  const startPrepareButton = (
    <Button
      sx={{ my: "1rem" }}
      fullWidth={false}
      variant="contained"
      color="info"
      onClick={() => {
        changeOrderStatusHandler(OrderStatusEnum.Preparing);
      }}
    >
      Start Preparing
    </Button>
  );

  const readyToPickupButton = (
    <Button
      sx={{ my: "0.5rem" }}
      variant="contained"
      color="success"
      disabled={!isAllItemReady}
      onClick={() => {
        changeOrderStatusHandler(OrderStatusEnum.Ready);
      }}
    >
      Ready for Pickup
    </Button>
  );

  const pauseButton = (
    <Button
      sx={{ my: "0.5rem" }}
      variant="contained"
      color="warning"
      onClick={() => {
        changeOrderStatusHandler(OrderStatusEnum.OnHold);
      }}
    >
      Pause
    </Button>
  );

  const resumeButton = (
    <Button
      sx={{ my: "0.5rem" }}
      variant="contained"
      color="primary"
      onClick={() => {
        changeOrderStatusHandler(OrderStatusEnum.Preparing);
      }}
    >
      Continue
    </Button>
  );

  const backButton = (
    <Button
      sx={{ my: "0.5rem" }}
      variant="contained"
      color="primary"
      onClick={() => {
        navigate(-1);
      }}
    >
      See all Order
    </Button>
  );

  return (
    <>
      <StatusBadge status={status} />
      <Typography>{`Pickup Time: ${TimeFormat(pickupTime)}`}</Typography>
      <Typography>{`Customer's Note: ${note}`}</Typography>
      <Typography>{`Include cutlery: ${includeCutlery}`}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {status === OrderStatusEnum.Waiting && startPrepareButton}
        {status === OrderStatusEnum.Preparing && pauseButton}
        {status === OrderStatusEnum.OnHold && resumeButton}
        {status === OrderStatusEnum.Preparing && readyToPickupButton}
        {status === OrderStatusEnum.Ready && backButton}
      </Box>
    </>
  );
};

export default OrderDetailAction;
