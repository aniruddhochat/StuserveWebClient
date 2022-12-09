import { Category } from "./category.model";

export interface CategoriesRequest {
    success: boolean,
    category: Category[]
}
