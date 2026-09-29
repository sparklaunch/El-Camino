import Dish from "../types/Dish";

const cartAPI = {
    fetchCart: async () => {
        try {
            const response = await fetch(`http://localhost:4000/cart`);
            if(!response.ok) {
                throw new Error("카트를 불러오는 데에 실패했어.")
            }
            return response.json();
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
                body: JSON.stringify(dish)
            });
            if(!response.ok) {
                throw new Error("카트에 아이템을 추가하는 데에 실패했어.");
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export default cartAPI;