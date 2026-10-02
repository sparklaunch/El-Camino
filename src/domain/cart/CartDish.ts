import Dish from "../menu/Dish";

type CartDish = Dish & {
    // json-server가 POST 시 id를 새로 발급하므로 원래 요리의 id를 따로 보관
    dishId: string;
    quantity: number;
}

export default CartDish;
