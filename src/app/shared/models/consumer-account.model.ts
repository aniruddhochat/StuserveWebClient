export interface ConsumerAccount {
    avatar?: {
        public_id: string,
        url: string
    }[],
    interests?: string[],
    username: string,
    _id?: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    phone: string,
    schoolyear: string,
    address: string,
    pincode: string,
    currlocation: string
}
