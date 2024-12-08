import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import TextBox from '../../components/TextBox/TextBox';

export default function Stairs() {
    const [userAnswer, setUserAnswer] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path, { state: { hasFlashlight: true } });
    };

    const handleTextBoxToggle = () => {
        setShowTextBox(!showTextBox);
    };

    const handleAnswerSubmit = () => {
        if (userAnswer === "BANANA") {
            handleNavigation("/maingate");
        } else {
            setShowTextBox(false);
            alert("오답입니다");
        }
    };
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                navigate("/upstairs");
            }
            if (event.key === "ArrowDown") {
                navigate("/mainGate");
            }
            if (event.key === "ArrowLeft") {
                navigate("/aisle");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);
    return (
        <div className={styles.container}>
            <img
                src="./images/uparrow.webp"
                alt="uparrow"
                className={styles.up}
                onClick={() => handleNavigation("/upstairs")}
            />
            <img
                src="./images/downarrow.webp"
                alt="downarrow"
                className={styles.down}
                onClick={handleTextBoxToggle}
            />
            <TextBox
                show={showTextBox}
                text="나가는 문에 자물쇠와 힌트가 있다.<br/> 여섯글자를 지워서 한 단어를 만드세요.<br/> [ SBIANXLEATNTEARS ]"
                buttonText="제출"
                onButtonClick={handleAnswerSubmit}
            >
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={styles.inputField}
                />
            </TextBox>
            <img
                src="./images/uparrow.webp"
                alt="backarrow"
                className={styles.back}
                onClick={() => handleNavigation("/aisle")}
            />
        </div>
    );
}
