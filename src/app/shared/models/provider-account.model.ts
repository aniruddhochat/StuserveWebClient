export interface ProviderAccount {
    avatar?: {
        public_id: string,
        url: string
    }[],
    username: string,
    _id?: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    phone: string,
    schoolyear: string,
    address: string,
    //pincode: string,
    //currlocation: string,
    role: string
}
