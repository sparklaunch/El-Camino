enum Category {
    tapas = "tapas",
    paella = "paella",
    principales = "principales",
    postre = "postre",
    bebidas = "bebidas"
}

export default Category;

// 메뉴판에 표시되는 순서. spanishName은 번역과 상관없이 함께 보여 주는 원어 이름
export const categories = [
    { value: Category.tapas, spanishName: "Tapas" },
    { value: Category.paella, spanishName: "Paella" },
    { value: Category.principales, spanishName: "Principales" },
    { value: Category.postre, spanishName: "Postre" },
    { value: Category.bebidas, spanishName: "Bebidas" }
];
