export interface Service {
    name: string,
    description: string,
    price: number,
    ratings: number,
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
    user: string
}
