import Allergen from "../enums/Allergen";
import Category from "../enums/Category";
import Diet from "../enums/Diet";
import Language from "../enums/Language";

const korean = {
	welcome: "화면을 터치해 주문해",
	forHere: "매장 식사",
	toGo: "포장",
	categories: {
		[Category.tapas]: "타파스",
		[Category.paella]: "빠에야",
		[Category.principales]: "메인 요리",
		[Category.postre]: "디저트",
		[Category.bebidas]: "음료"
	},
	loading: "로딩중...",
	error: "에러가 발생했어:",
	retry: "다시 시도",
	add: "담기",
	close: "닫기",
	favorite: "추천 메뉴",
	dietFilter: "채식 필터",
	allDishes: "전체",
	diets: {
		[Diet.vegan]: "비건",
		[Diet.vegetarian]: "채식"
	},
	noDishes: "조건에 맞는 메뉴가 없어.",
	allergenTitle: "알레르기 유발 성분",
	allergens: {
		[Allergen.gluten]: "글루텐",
		[Allergen.crustacean]: "갑각류",
		[Allergen.mollusc]: "연체류",
		[Allergen.fish]: "생선",
		[Allergen.egg]: "달걀",
		[Allergen.milk]: "우유",
		[Allergen.nuts]: "견과류",
		[Allergen.sulfites]: "아황산류"
	},
	invoiceTitle: "주문 내역",
	emptyCart: "담은 메뉴가 없어.",
	total: "합계",
	overLimit: "돼지야? 왜 이렇게 많이 먹어?",
	reset: "초기화",
	pay: "결제",
	useCoupon: "쿠폰 사용",
	couponTitle: "쿠폰 번호 입력",
	couponHint: "알파벳과 숫자로 된 16자리 쿠폰 번호를 입력해.",
	apply: "적용",
	invalidCoupon: "올바르지 않은 쿠폰 번호야.",
	couponApplied: "쿠폰 적용 (50% 할인)",
	discount: "할인",
	price: (price: number) => `${price.toLocaleString("ko-KR")}원`,
	paymentComplete: "결제가 완료되었어",
	thanks: "주문해 주셔서 고마워. 음식이 준비되면 알려드릴게.",
	home: "처음으로"
};

type Translation = typeof korean;

const english: Translation = {
	welcome: "Touch the screen to order",
	forHere: "For Here",
	toGo: "To Go",
	categories: {
		[Category.tapas]: "Tapas",
		[Category.paella]: "Paella",
		[Category.principales]: "Main Dishes",
		[Category.postre]: "Desserts",
		[Category.bebidas]: "Drinks"
	},
	loading: "Loading...",
	error: "Something went wrong:",
	retry: "Try again",
	add: "Add",
	close: "Close",
	favorite: "Recommended",
	dietFilter: "Dietary filter",
	allDishes: "All",
	diets: {
		[Diet.vegan]: "Vegan",
		[Diet.vegetarian]: "Vegetarian"
	},
	noDishes: "No dishes match this filter.",
	allergenTitle: "Allergens",
	allergens: {
		[Allergen.gluten]: "Gluten",
		[Allergen.crustacean]: "Crustaceans",
		[Allergen.mollusc]: "Molluscs",
		[Allergen.fish]: "Fish",
		[Allergen.egg]: "Eggs",
		[Allergen.milk]: "Milk",
		[Allergen.nuts]: "Tree nuts",
		[Allergen.sulfites]: "Sulfites"
	},
	invoiceTitle: "Your Order",
	emptyCart: "Your cart is empty.",
	total: "Total",
	overLimit: "Are you a pig? Why are you eating so much?",
	reset: "Clear",
	pay: "Pay",
	useCoupon: "Use Coupon",
	couponTitle: "Enter Coupon Code",
	couponHint: "Enter the 16-character code of letters and numbers.",
	apply: "Apply",
	invalidCoupon: "Invalid coupon code.",
	couponApplied: "Coupon applied (50% off)",
	discount: "Discount",
	price: (price: number) => `₩${price.toLocaleString("en-US")}`,
	paymentComplete: "Payment Complete",
	thanks: "Thank you for your order. We'll let you know when your food is ready.",
	home: "Back to Start"
};

const spanish: Translation = {
	welcome: "Toca la pantalla para pedir",
	forHere: "Para comer aquí",
	toGo: "Para llevar",
	categories: {
		[Category.tapas]: "Tapas",
		[Category.paella]: "Paella",
		[Category.principales]: "Platos principales",
		[Category.postre]: "Postres",
		[Category.bebidas]: "Bebidas"
	},
	loading: "Cargando...",
	error: "Se ha producido un error:",
	retry: "Reintentar",
	add: "Añadir",
	close: "Cerrar",
	favorite: "Recomendados",
	dietFilter: "Filtro de dieta",
	allDishes: "Todo",
	diets: {
		[Diet.vegan]: "Vegano",
		[Diet.vegetarian]: "Vegetariano"
	},
	noDishes: "No hay platos que coincidan con este filtro.",
	allergenTitle: "Alérgenos",
	allergens: {
		[Allergen.gluten]: "Gluten",
		[Allergen.crustacean]: "Crustáceos",
		[Allergen.mollusc]: "Moluscos",
		[Allergen.fish]: "Pescado",
		[Allergen.egg]: "Huevo",
		[Allergen.milk]: "Leche",
		[Allergen.nuts]: "Frutos secos",
		[Allergen.sulfites]: "Sulfitos"
	},
	invoiceTitle: "Tu pedido",
	emptyCart: "Tu carrito está vacío.",
	total: "Total",
	overLimit: "¿Eres un cerdo? ¿Por qué comes tanto?",
	reset: "Vaciar",
	pay: "Pagar",
	useCoupon: "Usar cupón",
	couponTitle: "Introduce el código del cupón",
	couponHint: "Introduce el código de 16 caracteres (letras y números).",
	apply: "Aplicar",
	invalidCoupon: "El código del cupón no es válido.",
	couponApplied: "Cupón aplicado (50% de descuento)",
	discount: "Descuento",
	price: (price: number) =>
		`${price.toLocaleString("es-ES", { useGrouping: "always" })} ₩`,
	paymentComplete: "Pago completado",
	thanks: "Gracias por tu pedido. Te avisaremos cuando tu comida esté lista.",
	home: "Volver al inicio"
};

// 아직 번역이 없는 언어는 한국어로 표시
const translations: Partial<Record<Language, Translation>> = {
	[Language.korean]: korean,
	[Language.english]: english,
	[Language.español]: spanish
};

export default translations;
export { korean };
export type { Translation };
