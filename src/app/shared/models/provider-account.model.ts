import { Chat } from "./chat.model";

export interface ProviderAccount {
    avatar?: {
        public_id: string,
        url: string
    },
    username: string,
    _id?: string,
    fname: string,
    lname: string,
    email: string,
    password?: string,
    isApproved: number,
    phone: string,
    schoolyear: string,
    address: string,
    //pincode: string,
    //currlocation: string,
    role?: string,
    receivedChat?: Chat[];
    sentChat?: Chat[];
}
