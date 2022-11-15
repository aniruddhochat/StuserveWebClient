import { ProviderAccount } from "./provider-account.model";

export interface ProviderRequest {
    success: boolean,
    provider: ProviderAccount,
    token: string
}
