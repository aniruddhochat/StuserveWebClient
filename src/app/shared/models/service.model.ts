export interface Service {
    _id?: string,
    name: string,
    description: string,
    type: string,
    price: number,
    ratings: number,
    tags: string[],
    isApproved: number,
    images: 
    {
        public_id: string,
        url: string
    }[],
    category: string,
    numOfReviews: string,
    location: string,
    reviews:
    {
        user: string,
        rating: number,
        comment: string,
        name: string
    }[],
    user: string,
    createdAt?: Date
}
