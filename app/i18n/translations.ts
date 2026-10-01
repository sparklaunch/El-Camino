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

// 장난 번역이지만 알레르기 정보는 정확히 전달되도록 일반 한국어 표기를 유지
const jammin: Translation = {
	welcome: "화면 ㅌㅊ하면 주문 ㄱㄱ",
	forHere: "여기서 먹을 거임",
	toGo: "들고 튈 거임",
	categories: {
		[Category.tapas]: "타파스",
		[Category.paella]: "빠에야",
		[Category.principales]: "찐 메인",
		[Category.postre]: "디저트 (배 따로 있음)",
		[Category.bebidas]: "마실 거"
	},
	loading: "로딩 중... 기다리셈",
	error: "헐 에러 남 ㅠㅠ:",
	retry: "다시 ㄱㄱ",
	add: "담기 ㄱㄱ",
	close: "닫을래",
	favorite: "개맛도리 추천",
	dietFilter: "채식 필터 ㅇㅇ",
	allDishes: "다 보여줘",
	diets: {
		[Diet.vegan]: "찐비건",
		[Diet.vegetarian]: "채식러"
	},
	noDishes: "그런 메뉴 없음 ㅋㅋ 어쩔티비",
	allergenTitle: "알레르기 주의 ㄹㅇ",
	allergens: korean.allergens,
	invoiceTitle: "내가 고른 거",
	emptyCart: "텅텅 비었음 ㅋㅋ",
	total: "총 얼마임",
	overLimit: "돼지임? 왜케 많이 먹음? ㅋㅋㅋ 킹받네",
	reset: "다 지워",
	pay: "결제 ㄱㄱ",
	useCoupon: "쿠폰 쓸래",
	couponTitle: "쿠폰 번호 ㄱㄱ",
	couponHint: "알파벳이랑 숫자 16자리 치셈. 틀리면 킹받음",
	apply: "적용 ㄱ",
	invalidCoupon: "쿠폰 번호 틀림 ㅋㅋ 다시 ㄱ",
	couponApplied: "쿠폰 적용 완 (50% 할인 개꿀)",
	discount: "할인 개꿀",
	price: korean.price,
	paymentComplete: "결제 완료 ㅅㄱ",
	thanks: "주문 ㄳㄳ 음식 나오면 알려줄게 기다리셈",
	home: "처음으로 ㄱㄱ"
};

// 장난 번역이지만 알레르기 정보는 정확히 전달되도록 일반 한국어 표기를 유지
const teulttak: Translation = {
	welcome: "화면을 손꾸락으로 꾹~ 누르시게나^^",
	forHere: "여기서 먹고 가겠네",
	toGo: "싸 가지고 가겠네",
	categories: {
		[Category.tapas]: "타파스 (술안주)",
		[Category.paella]: "빠에야 (서양 볶음밥)",
		[Category.principales]: "본 요리",
		[Category.postre]: "주전부리",
		[Category.bebidas]: "마실 것"
	},
	loading: "잠시만 기다리시게... 허허...",
	error: "어허... 뭐가 잘못됐구먼:",
	retry: "다시 해 보게",
	add: "담아 주게",
	close: "닫게나",
	favorite: "이 늙은이가 권하는 메뉴",
	dietFilter: "풀만 먹는 사람 메뉴",
	allDishes: "몽땅 보여 주게",
	diets: {
		[Diet.vegan]: "비건 (고기 일절 안 먹는 사람)",
		[Diet.vegetarian]: "채식"
	},
	noDishes: "그런 메뉴는 없다네... 다른 걸 골라 보게나",
	allergenTitle: "알레르기 조심하시게",
	allergens: korean.allergens,
	invoiceTitle: "주문 장부",
	emptyCart: "아직 아무것도 안 담았구먼...",
	total: "도합",
	overLimit: "어허~ 돼지인가? 젊은 사람이 뭘 그리 많이 먹나... 우리 때는 말이야...",
	reset: "처음부터 다시",
	pay: "셈하기",
	useCoupon: "쿠폰 쓰겠네",
	couponTitle: "쿠폰 번호를 넣어 주게",
	couponHint: "영어랑 숫자로 16자리라네... 돋보기 쓰고 천천히 넣으시게^^",
	apply: "적용하게",
	invalidCoupon: "번호가 틀렸다네... 손주한테 물어보시게",
	couponApplied: "쿠폰 적용됐네 (반값이라니 횡재구먼 허허)",
	discount: "에누리",
	price: korean.price,
	paymentComplete: "셈이 다 끝났다네",
	thanks: "주문해 줘서 고맙네. 음식 다 되면 부를 테니 앉아서 기다리시게나^^",
	home: "처음으로 돌아가세"
};

// 아직 번역이 없는 언어는 한국어로 표시
const translations: Partial<Record<Language, Translation>> = {
	[Language.korean]: korean,
	[Language.english]: english,
	[Language.español]: spanish,
	[Language.jammin]: jammin,
	[Language.teulttak]: teulttak
};

export default translations;
export { korean };
export type { Translation };
