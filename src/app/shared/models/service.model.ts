export interface Service {
    name: string,
    description: string,
    type: string,
    price: number,
    ratings: number,
    tags: string[],
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
        comment: string
    }[],
    user: string,
    createdAt?: Date
}
