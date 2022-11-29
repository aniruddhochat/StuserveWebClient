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
    paidAt?: string,
    servicePrice: number,
    taxPrice: number,
    additionalPrice: number,
    totalPrice: number,
    provider: string
}
