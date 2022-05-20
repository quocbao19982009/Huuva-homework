import { Box, Typography } from "@mui/material";
import React from "react";

type OrderItemProps = {
  name: string;
  qty: number;
};

const OrderItem = ({ name, qty }: OrderItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        width: "100%",
      }}
      borderBottom={"1px solid black"}
    >
      <Typography sx={{ fontSize: 16, mr: "0.5rem" }} color="text.primary">
        {name}
      </Typography>
      <Typography
        sx={{ fontSize: 16 }}
        color="text.primary"
      >{`( x${qty} )`}</Typography>
    </Box>
  );
};

export default OrderItem;
