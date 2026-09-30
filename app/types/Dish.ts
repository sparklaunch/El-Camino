import Allergen from "../enums/Allergen";
import Category from "../enums/Category";

type Dish = {
    id: string;
    category: Category;
    favorite: boolean;
    name: string;
    description?: string;
    englishDescription?: string;
    spanishDescription?: string;
    subname: string;
    price: number;
    allergens?: Allergen[];
}

export default Dish;