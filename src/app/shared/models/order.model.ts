export interface Order 
{
    deliveringOrderInfo: {
        address: string,
        phoneNo: string
    },
    orderService: {
        name: string,
        price: number,
        image: string,
        product: string 
    },
    paymentInfo: {
        id: string,
        status: string
    },
    _id?: string,
    paidAt?: string,
    servicePrice: number,
    taxPrice: number,
    additionalPrice: number,
    orderStatus?: string,
    totalPrice: number,
    provider: string
}
