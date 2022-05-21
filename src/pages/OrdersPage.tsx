import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import OrderCard from "../components/orders/OrderCard";
import { OrderContext } from "../store/order";
import { FilterOrderEnum, OrderStatusEnum, Order } from "../types";
import { Paper, Typography } from "@mui/material";

const OrdersPage = () => {
  const navigate = useNavigate();

  const { sortOrder } = useParams();

  const orderCtx = useContext(OrderContext);
  const orginalOrderList = orderCtx.ordersList;

  const [orderList, setOrderList] = useState<Order[]>(orginalOrderList);

  const [filterBy, setFilterBy] = useState<FilterOrderEnum>(
    FilterOrderEnum.All
  );

  const filterOrderList = useCallback(
    (filterBy: FilterOrderEnum) => {
      switch (filterBy) {
        case FilterOrderEnum.All:
          {
            setOrderList(orginalOrderList);
          }
          break;
        case FilterOrderEnum.Ready:
          {
            const filterByReady = orginalOrderList.filter(
              (order) => order.status === OrderStatusEnum.Ready
            );
            setOrderList(filterByReady);
          }
          break;
        case FilterOrderEnum.Active:
          {
            const filterByActive = orginalOrderList.filter(
              (order) => order.status !== OrderStatusEnum.Ready
            );
            setOrderList(filterByActive);
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
    },
    [orginalOrderList]
  );

  const filterChangeHandler = useCallback(
    (event: SelectChangeEvent) => {
      const filterOrder = event.target.value as FilterOrderEnum;
      navigate(`/sort/${filterOrder}`);
      setFilterBy(filterOrder);
    },
    [navigate]
  );

  useEffect(() => {
    if (sortOrder) {
      filterOrderList(sortOrder as FilterOrderEnum);
      setFilterBy(sortOrder as FilterOrderEnum);
    }
    if (!sortOrder) {
      filterOrderList(FilterOrderEnum.All);
      setFilterBy(FilterOrderEnum.All);
    }
  }, [sortOrder, filterOrderList, setFilterBy]);

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
          <MenuItem value={FilterOrderEnum.Active}>Active</MenuItem>
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
        {orderList.length > 0 &&
          orderList.map((order) => {
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
      {orderList.length === 0 && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
            minHeight: "50vh",
          }}
        >
          <Typography>No Order Found. Try a different filter. </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default OrdersPage;
