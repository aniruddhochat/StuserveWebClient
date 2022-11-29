import { Order } from "./order.model";

export interface OrdersRequest {
    success: boolean,
    orders: Order[]
}
