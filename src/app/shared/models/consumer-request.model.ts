import { ConsumerAccount } from "./consumer-account.model";

export interface ConsumerRequest {
    success: boolean,
    user: ConsumerAccount,
    token: string
}
