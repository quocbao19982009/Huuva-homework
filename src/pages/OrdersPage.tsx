import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import OrderCard from "../components/orders/OrderCard";
import { OrderContext } from "../store/order";
import { FilterOrderEnum, OrderStatusEnum, Order } from "../types";
const OrdersPage = () => {
  const orderCtx = useContext(OrderContext);
  const orginalOrderList = orderCtx.ordersList;
  const [orderList, setOrderList] = useState<Order[]>(orginalOrderList);

  const [filterBy, setFilterBy] = useState<FilterOrderEnum>(
    FilterOrderEnum.All
  );

  const filterOrderList = (filterBy: FilterOrderEnum) => {
    switch (filterBy) {
      case FilterOrderEnum.All:
        {
          setOrderList(orginalOrderList);
        }
        break;
      case FilterOrderEnum.Ready:
        {
          const filterByRead = orginalOrderList.filter(
            (order) => order.status === OrderStatusEnum.Ready
          );
          setOrderList(filterByRead);
        }
        break;
      case FilterOrderEnum.Preparing:
        {
          const filterByPreparing = orginalOrderList.filter(
            (order) => order.status === OrderStatusEnum.Preparing
          );
          setOrderList(filterByPreparing);
        }
        break;
      case FilterOrderEnum.OnHold:
        {
          const filterByOnHold = orginalOrderList.filter(
            (order) => order.status === OrderStatusEnum.OnHold
          );
          setOrderList(filterByOnHold);
        }
        break;
      case FilterOrderEnum.Waiting:
        {
          const filterByOnHold = orginalOrderList.filter(
            (order) => order.status === OrderStatusEnum.Waiting
          );
          setOrderList(filterByOnHold);
        }
        break;
      default:
        return orginalOrderList;
    }
  };

  const filterChangeHandler = (event: SelectChangeEvent) => {
    setFilterBy(event.target.value as FilterOrderEnum);
    filterOrderList(event.target.value as FilterOrderEnum);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="filter-by-order-status">Filter By</InputLabel>
        <Select
          labelId="filter-by-order-status"
          id="filter-by-order-status-select"
          value={filterBy}
          label="filter By"
          onChange={filterChangeHandler}
        >
          <MenuItem value={FilterOrderEnum.All}>All</MenuItem>
          <MenuItem value={FilterOrderEnum.Waiting}>Waiting for chef</MenuItem>
          <MenuItem value={FilterOrderEnum.Ready}>Ready to pickup</MenuItem>
          <MenuItem value={FilterOrderEnum.Preparing}>Being prepare</MenuItem>
          <MenuItem value={FilterOrderEnum.OnHold}>Pause</MenuItem>
        </Select>
      </FormControl>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        paddingTop="1rem"
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
