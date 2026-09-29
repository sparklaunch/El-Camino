import Dish from "./Dish";

type CartDish = Dish & {
    quantity: number;
}

export default CartDish;
