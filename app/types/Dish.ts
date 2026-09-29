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
}

export default Dish;