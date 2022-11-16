import { ProviderAccount } from "./provider-account.model";

export interface ProviderRequest {
    success: boolean,
    // provider is used for getting a provider account without signing in
    provider: ProviderAccount,
    // user is used for getting a provider account when logging in as the account
    user: ProviderAccount,
    token: string
}
