import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

import OrderItem from "./OrderItem";
import { Customer, ItemsEntity, Order, OrderStatusEnum } from "../../types";

type OrderDetailInfoProps = {
  customer: Customer["name"];
  dishes: { name: ItemsEntity["name"]; quantity: ItemsEntity["quantity"] }[];
  id: Order["_id"];
  status: OrderStatusEnum;
  readyItems: boolean[];
  updateItemReadyHandler: (position: number) => void;
};

const OrderDetailInfo = ({
  customer,
  id,
  dishes,
  status,
  readyItems,
  updateItemReadyHandler,
}: OrderDetailInfoProps) => {
  const itemsCheckBox = dishes.map((item, index) => {
    return (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            checked={
              status === OrderStatusEnum.Ready
                ? true
                : readyItems[index] || false
            }
            onChange={() => updateItemReadyHandler(index)}
            name={item.name}
          />
        }
        label={<OrderItem name={item.name} qty={item.quantity} />}
      />
    );
  });

  return (
    <>
      <Box>
        <Typography>Order's Info:</Typography>
        <Typography>{`Customer: ${customer}`}</Typography>
        <Typography>{`Order's Id: ${id}`}</Typography>
        <FormControl
          component="fieldset"
          variant="standard"
          disabled={status !== OrderStatusEnum.Preparing ? true : false}
          sx={{ width: "100%" }}
        >
          <FormLabel component="legend" color="primary">
            Order's Items:
          </FormLabel>
          <FormGroup>{itemsCheckBox}</FormGroup>
          <FormHelperText>All items must be ready before pickup</FormHelperText>
        </FormControl>
      </Box>
    </>
  );
};

export default OrderDetailInfo;
