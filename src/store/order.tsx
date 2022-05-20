import React, { useState, createContext } from "react";

import sampleData from "../assets/sampleData";
import { Order, OrderStatusEnum } from "../types/index";

interface OrderContextInterface {
  ordersList: Order[];
  orderDetail: Order | undefined;
  getOrderDetail: (id: string) => void;
  updateOrder: (id: string, statusInput: OrderStatusEnum) => void;
}

export const OrderContext = createContext<OrderContextInterface>({
  ordersList: [],
  orderDetail: undefined,
  getOrderDetail: (id: string) => {},
  updateOrder: (id: string, statusInput: OrderStatusEnum) => {},
});

type Props = {
  children?: React.ReactNode;
};

const OrderContextProvider: React.FC<Props> = ({ children }) => {
  const [ordersList, setOrderList] = useState<Order[]>(sampleData);
  const [orderDetail, setOrderDetail] = useState<Order | undefined>(undefined);

  const getOrderDetailHandler = (id: string) => {
    const orderSelect = ordersList.find((order) => order._id === id);

    if (orderSelect) {
      setOrderDetail(orderSelect);
    } else {
      console.error("Order cannot found");
    }
  };

  const updateOrderHandler = (id: string, statusInput: OrderStatusEnum) => {
    const orderSelectIndex = ordersList.findIndex((order) => order._id === id);
    const orderSelect = ordersList[orderSelectIndex];
    const updateOrder: Order = { ...orderSelect, status: statusInput };
    let updateOrderList = [...ordersList];

    updateOrderList[orderSelectIndex] = updateOrder;
    setOrderDetail(updateOrder);
    setOrderList(updateOrderList);
  };

  const orderContextValue: OrderContextInterface = {
    ordersList: ordersList,
    orderDetail: orderDetail,
    getOrderDetail: getOrderDetailHandler,
    updateOrder: updateOrderHandler,
  };

  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
