import { ProviderAccount } from "./provider-account.model";

export interface ProviderRequest {
    success: boolean,
    user: ProviderAccount,
    token: string
}
