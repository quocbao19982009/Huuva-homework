export interface Order {
  _created: string;
  _id: string;
  _updated: string;
  account: string;
  brandId: string;
  by: string;
  capacityUsages?: null[] | null;
  channel: number;
  channelLink: string;
  channelOrderDisplayId: string;
  channelOrderId: string;
  channelOrderRawId: string;
  courier: Courier;
  customer: Customer;
  decimalDigits: number;
  deliveryAddress: DeliveryAddress;
  deliveryCost: number;
  deliveryIsAsap: boolean;
  deliveryTime: string;
  discountTotal: number;
  historyDriverUpdates?: null[] | null;
  items: ItemsEntity[];
  location: string;
  note: string;
  numberOfCustomers: number;
  orderIsAlreadyPaid: boolean;
  orderType: number;
  packaging: Packaging;
  payment: Payment;
  pickupTime: string;
  pos: number;
  posId: string;
  posLocationId: string;
  posReceiptId: string;
  rating?: null[] | null;
  recent: boolean;
  resolvedBy: string;
  serviceCharge: number;
  status: number;
  statusHistory?: StatusHistoryEntity[] | null;
  taxes?: null[] | null;
  tip: number;
}
export interface Courier {
  deliveryBy: string;
}
export interface Customer {
  companyName: string;
  email: string;
  name: string;
  phoneNumber: string;
}
export interface DeliveryAddress {
  city: string;
  extraAddressInfo: string;
  postalCode: string;
  street: string;
  streetNumber: string;
}
export interface ItemsEntity {
  isInternal: boolean;
  name: string;
  plu: string;
  price: number;
  productType: number;
  quantity: number;
  sortOrder: number;
  subItems?: string[] | null;
}
export interface Packaging {
  includeCutlery: boolean;
}
export interface Payment {
  amount: number;
  due: number;
  type: number;
}
export interface StatusHistoryEntity {
  response: string;
  source: number;
  status: number;
  timeStamp: string;
}

export enum OrderStatusEnum {
  Waiting = 1,
  Preparing,
  OnHold,
  Ready,
}
