import Category from "../enums/Category";
import Language from "../enums/Language";

const korean = {
	welcome: "화면을 터치해 주문하세요",
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
	add: "담기",
	close: "닫기",
	favorite: "추천 메뉴",
	invoiceTitle: "주문 내역",
	emptyCart: "담은 메뉴가 없어.",
	total: "합계",
	overLimit: "돼지야? 왜 이렇게 많이 먹어?",
	reset: "초기화",
	pay: "결제",
	useCoupon: "쿠폰 사용",
	couponTitle: "쿠폰 번호 입력",
	couponHint: "알파벳과 숫자로 된 16자리 쿠폰 번호를 입력해 주세요.",
	apply: "적용",
	price: (price: number) => `${price.toLocaleString("ko-KR")}원`,
	paymentComplete: "결제가 완료되었습니다",
	thanks: "주문해 주셔서 감사합니다. 음식이 준비되면 알려 드릴게요.",
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
	add: "Add",
	close: "Close",
	favorite: "Recommended",
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
	add: "Añadir",
	close: "Cerrar",
	favorite: "Recomendados",
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
