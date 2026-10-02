import Diet from "@/domain/menu/Diet";

const dietIcon: Record<Diet, string> = {
	[Diet.vegan]: "🌱",
	[Diet.vegetarian]: "🥗"
};

export default dietIcon;
