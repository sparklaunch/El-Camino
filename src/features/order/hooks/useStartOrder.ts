import { useRouter } from "next/navigation";
import Option from "@/domain/order/Option";
import { useOptionStore } from "../model/useOptionStore";

// 매장 식사·포장을 고르면 저장해 두고 메뉴 화면으로 이동
export default function useStartOrder() {
	const setOption = useOptionStore((state) => state.setOption);
	const router = useRouter();
	return (option: Option) => {
		setOption(option);
		router.push("/main");
	};
}
