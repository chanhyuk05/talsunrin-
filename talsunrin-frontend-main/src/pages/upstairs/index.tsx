import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const GHOST_IMAGE_SRC = './images/ghost.jpg';
const DIALOGUE_TEXT = "바..ㄴ...나...바..나.나..(바나나에 한이 맺힌 듯 하다.)";
const IMAGE_DISPLAY_DELAY = 2000;
const ARROW_IMAGE_SRC = './images/downarrow.webp';  // downarrow image path
const ARROW_DISPLAY_DELAY = 4000;  // Delay before showing down arrow image

export default function UpStairs() {
    const [showImage, setShowImage] = useState(false);
    const [showArrow, setShowArrow] = useState(false);  // New state for down arrow
    const navigate = useNavigate();

    const dialogueText = useMemo(() => DIALOGUE_TEXT, []);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown") {
                navigate("/stairs");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);
    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowImage(true);  // Show ghost image
        }, IMAGE_DISPLAY_DELAY);

        const timer2 = setTimeout(() => {
            setShowArrow(true);  // Show down arrow after the ghost image
        }, ARROW_DISPLAY_DELAY);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handleArrowClick = () => {
        navigate('/stairs');  // Navigate to /stairs when the down arrow is clicked
    };

    return (
        <div className={styles.container}>
            {showImage && (
                <>
                    <img src={GHOST_IMAGE_SRC} alt="ghost" className={styles.ghost} />
                    <div className={styles.textBox}>
                        <p>{dialogueText}</p>
                    </div>
                </>
            )}

            {showArrow && (
                <img
                    src={ARROW_IMAGE_SRC}
                    alt="down arrow"
                    className={styles.arrow}
                    onClick={handleArrowClick}  // Handle arrow click to navigate
                />
            )}
        </div>
    );
}
