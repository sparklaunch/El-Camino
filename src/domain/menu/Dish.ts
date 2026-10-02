import Allergen from "./Allergen";
import Category from "./Category";
import Diet from "./Diet";

type Dish = {
    id: string;
    category: Category;
    favorite: boolean;
    name: string;
    description?: string;
    englishDescription?: string;
    spanishDescription?: string;
    jamminDescription?: string;
    teulttakDescription?: string;
    subname: string;
    price: number;
    allergens?: Allergen[];
    // 고기나 해산물이 들어가면 비워 둠
    diet?: Diet;
}

export default Dish;