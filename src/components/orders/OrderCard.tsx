import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import StatusBadge from "../shared/StatusBadge";
import OrderItem from "./OrderItem";
import { Customer, ItemsEntity, Order, OrderStatusEnum } from "../../types";
import { TimeFormat } from "../../ultis/timeFormat";

type OrderCardProps = {
  customer: Customer["name"];
  dishes: { name: ItemsEntity["name"]; quantity: ItemsEntity["quantity"] }[];
  id: Order["_id"];
  pickupTime: Order["pickupTime"];
  note: Order["note"];
  status: OrderStatusEnum;
};

const OrderCard = ({
  customer,
  dishes,
  id,
  pickupTime,
  note,
  status,
}: OrderCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent sx={{ paddingBottom: "0rem" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`${customer}'s Order`}
        </Typography>
        {dishes.map((dish) => {
          return (
            <OrderItem key={dish.name} name={dish.name} qty={dish.quantity} />
          );
        })}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Note: ${note}`}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {`Estimate Pickup: ${TimeFormat(pickupTime)}`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {" "}
        <StatusBadge status={status} />
        <Button
          size="medium"
          sx={{ m: "auto", mt: "1rem" }}
          variant="contained"
          onClick={() => navigate(`/order/${id}`)}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
