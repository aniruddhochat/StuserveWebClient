import { ConsumerAccount } from "./consumer-account.model";

export interface ConsumersRequest {
    success: boolean,
    users: ConsumerAccount[]
}
