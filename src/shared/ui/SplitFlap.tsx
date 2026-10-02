"use client";

import { useState } from "react";
import styles from "./SplitFlap.module.css";

const DIGITS = [..."0123456789"];

// 실제 스플릿 플랩처럼 숫자는 한 칸씩 넘기며 목표 숫자까지 가고, 나머지 글자는 한 번에 넘김
// (문자열의 includes를 쓰면 빈 자리("")도 숫자로 취급되어 끝없이 넘어가므로 배열로 비교함)
const nextChar = (from: string, to: string) =>
	DIGITS.includes(from) && DIGITS.includes(to) ?
		DIGITS[(DIGITS.indexOf(from) + 1) % DIGITS.length]
	:	to;

const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Flap({ char }: { char: string }) {
	// from과 to가 다르면 from에서 to로 한 장 넘기는 중
	const [flip, setFlip] = useState({ from: char, to: char, id: 0 });
	const isFlipping = flip.from !== flip.to;
	if (!isFlipping && flip.to !== char) {
		setFlip(
			prefersReducedMotion() ?
				{ from: char, to: char, id: flip.id }
			:	{ from: flip.to, to: nextChar(flip.to, char), id: flip.id + 1 }
		);
	}
	// 한 장이 다 넘어가면 목표 글자에 닿을 때까지 다음 장을 이어서 넘김
	const flipEndHandler = () => {
		setFlip(({ to, id }) =>
			to === char ?
				{ from: to, to, id }
			:	{ from: to, to: nextChar(to, char), id: id + 1 }
		);
	};
	return (
		<span className={styles.flap}>
			<span className={styles.sizer}>{flip.to || flip.from}</span>
			<span className={styles.top}>
				<span>{flip.to}</span>
			</span>
			<span className={styles.bottom}>
				<span>{flip.from}</span>
			</span>
			{isFlipping && (
				<span key={flip.id}>
					<span className={`${styles.top} ${styles.leaf}`}>
						<span>{flip.from}</span>
					</span>
					<span
						className={`${styles.bottom} ${styles.leaf}`}
						onAnimationEnd={flipEndHandler}
					>
						<span>{flip.to}</span>
					</span>
				</span>
			)}
		</span>
	);
}

export default function SplitFlap({ text }: { text: string }) {
	const chars = [...text];
	// 한 번이라도 있었던 자리는 계속 남겨 두어, 자릿수가 늘거나 줄 때도 빈칸과 글자 사이를 넘기도록 함
	const [length, setLength] = useState(chars.length);
	if (chars.length > length) {
		setLength(chars.length);
	}
	return (
		<span className={styles.splitFlap}>
			<span className={styles.label}>{text}</span>
			<span aria-hidden>
				{Array.from({ length }, (_, index) => {
					// 자릿수가 바뀌어도 같은 자리끼리 넘어가도록 오른쪽 끝부터 맞춤 (빈 자리는 폭이 없음)
					const position = length - index;
					return (
						<Flap
							key={position}
							char={chars[chars.length - position] ?? ""}
						/>
					);
				})}
			</span>
		</span>
	);
}
