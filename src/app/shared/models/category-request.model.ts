import { Category } from "./category.model";

export interface CategoryRequest {
    success: boolean,
    category: Category[]
}
