import CartDish from "../types/CartDish";
import Dish from "../types/Dish";

const cartAPI = {
    fetchCart: async () => {
        try {
            const response = await fetch(`http://localhost:4000/cart`);
            if(!response.ok) {
                throw new Error("카트를 불러오는 데에 실패했어.")
            }
            const cart: CartDish[] = await response.json();
            // quantity 필드가 생기기 전에 담긴 아이템은 1개로 취급
            return cart.map(item => ({...item, quantity: item.quantity ?? 1}));
        } catch(error) {
            console.error(error);
        }
    },
    addToCart: async (dish: Dish) => {
        try {
            const response = await fetch(`http://localhost:4000/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...dish, dishId: dish.id, quantity: 1})
            });
            if(!response.ok) {
                throw new Error("카트에 아이템을 추가하는 데에 실패했어.");
            }
        } catch (error) {
            console.error(error);
        }
    },
    // 실패 시 낙관적 업데이트를 되돌릴 수 있도록 에러를 그대로 던짐
    updateQuantity: async ({id, quantity}: {id: string; quantity: number}) => {
        try {
            const response = await fetch(`http://localhost:4000/cart/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({quantity})
        });
        if(!response.ok) {
            throw new Error("수량을 변경하는 데에 실패했어.");
        }
        } catch(error) {
            console.error(error);
        }
    },
    deleteFromCart: async (id: string) => {
        try {
            const response = await fetch(`http://localhost:4000/cart/${id}`, {
                        method: "DELETE"
                    })
                    if(!response.ok) {
                        throw new Error("삭제하는 데에 실패했어.");
                    }
        } catch(error) {
            console.error(error);
        }
    },
    // json-server는 일괄 삭제를 지원하지 않아서 항목마다 DELETE 요청을 보냄
    clearCart: async (ids: string[]) => {
        await Promise.all(ids.map(id => cartAPI.deleteFromCart(id)));
    }
};

export default cartAPI;
