import Image from "next/image";
import logo from "../assets/images/logo.png";
import styles from "./Main.module.css";

export default function Main() {
	return (
		<div className={styles.main}>
			<Image src={logo} alt="" className={styles.logo} />
		</div>
	);
}
