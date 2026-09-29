const dishAPI = {
    fetchDishes: async () => {
        try {
            const response = await fetch("http://localhost:4000/dishes");
            if(!response.ok) {
                throw new Error("요리를 불러오는 데에 실패했어.")
            }
            return response.json();
        } catch(error) {
            console.error(error);
        }
    }
};

export default dishAPI;