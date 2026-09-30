import Allergen from "../enums/Allergen";
import Category from "../enums/Category";
import Diet from "../enums/Diet";

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
    // 고기나 해산물이 들어가면 비워 둠
    diet?: Diet;
}

export default Dish;