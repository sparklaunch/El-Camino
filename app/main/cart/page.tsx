import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import styles from "./CartPage.module.css";

export default function CartPage() {
	return (
		<section className={styles.section}>
			<Link href="/" className={styles.link}>
				<Image src={logo} alt="Go home" className={styles.logo} />
			</Link>
			<hr className={styles.horizontalLine} />
		</section>
	);
}
