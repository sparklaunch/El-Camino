import Category from "../enums/Category";

type Dish = {
    id: string;
    category: Category;
    favorite: boolean;
    name: string;
    englishName?: string;
    description?: string;
    englishDescription?: string;
    subname: string;
    price: number;
}

export default Dish;