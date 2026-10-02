import Allergen from "../enums/Allergen";

// 카드처럼 좁은 곳에서도 알아볼 수 있도록 성분마다 아이콘을 붙임
const allergenIcon: Record<Allergen, string> = {
	[Allergen.gluten]: "🌾",
	[Allergen.crustacean]: "🦐",
	[Allergen.mollusc]: "🦑",
	[Allergen.fish]: "🐟",
	[Allergen.egg]: "🥚",
	[Allergen.milk]: "🥛",
	[Allergen.nuts]: "🌰",
	[Allergen.sulfites]: "🍷"
};

export default allergenIcon;
