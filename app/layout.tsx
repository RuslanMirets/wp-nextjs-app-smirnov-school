import "./globals.scss";
import { Roboto } from "next/font/google";
import Providers from "./providers";
import Header from "@/src/components/header/Header";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata = {
	title: "Главная",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body className={roboto.className}>
				<Providers>
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}