import { ReactNode, ViewTransition } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
	return (
		<ViewTransition enter="page-fade" exit="page-fade" default="none">
			{children}
		</ViewTransition>
	);
}
