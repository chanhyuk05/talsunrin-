import styles from "./style.module.css";
import React, { ReactNode } from "react";

interface TextBoxProps {
	show: boolean;
	text: string;
	buttonText?: string;
	onButtonClick: () => void;
	children?: ReactNode;
}

export default function TextBox({ show, text, buttonText = "닫기", onButtonClick, children }: TextBoxProps) {
	if (!show) return null;

	const formattedText = text.split("<br/>").map((line, index) => (
		<React.Fragment key={index}>
			{line}
			<br />
		</React.Fragment>
	));

	return (
		<div className={styles.overlay}>
			<div className={styles.textBox}>
				<p>{formattedText}</p>
				{children}
				<button onClick={onButtonClick} className={styles.closeButton}>
					{buttonText}
				</button>
			</div>
		</div>
	);
}
