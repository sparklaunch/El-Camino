import Image from "next/image";
import logo from "../assets/images/logo.png";
import styles from "./Main.module.css";

export default function Main() {
	return (
		<div className={styles.main}>
			<Image src={logo} alt="" className={styles.logo} />
			<hr className={styles.horizontalLine} />
			<div className={styles.body}>
				<aside className={styles.category}>
					<button type="button" className={styles.categoryButton}>
						<h2 className={styles.categoryTitle}>타파스</h2>
						<p className={styles.categorySubtitle}>Tapas</p>
					</button>
					<button type="button" className={styles.categoryButton}>
						<h2 className={styles.categoryTitle}>빠에야</h2>
						<p className={styles.categorySubtitle}>Paella</p>
					</button>
					<button type="button" className={styles.categoryButton}>
						<h2 className={styles.categoryTitle}>메인 요리</h2>
						<p className={styles.categorySubtitle}>Principales</p>
					</button>
					<button type="button" className={styles.categoryButton}>
						<h2 className={styles.categoryTitle}>디저트</h2>
						<p className={styles.categorySubtitle}>Postre</p>
					</button>
					<button type="button" className={styles.categoryButton}>
						<h2 className={styles.categoryTitle}>음료</h2>
						<p className={styles.categorySubtitle}>Bebidas</p>
					</button>
				</aside>
				<article className={styles.menu}></article>
			</div>
		</div>
	);
}
