import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
	src: "./assets/fonts/pretendard.woff2",
	display: "swap"
});

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="ko" className={pretendard.className}>
			<body>{children}</body>
		</html>
	);
}
