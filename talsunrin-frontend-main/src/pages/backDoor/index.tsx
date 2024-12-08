import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import TextBox from '../../components/TextBox/TextBox';

export default function Stairs() {
    const [userAnswer, setUserAnswer] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    const [mode, setMode] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown") {
                navigate("/aisle");
            }
            if (event.key === "ArrowUp") {
                navigate("/backEnding");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);
    const handleNavigation = (path: string) => navigate(path);
    const handleTextBoxToggle = () => setShowTextBox(!showTextBox);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value);
    const [showOverlay, setShowOverlay] = useState(false);
    const handleSubmit = () => {
        if (userAnswer === "112431") {
            handleNavigation('/backEnding');
        } else {
            alert("오답입니다!");
            setShowTextBox(false);
        }
    };

    const handleClick = (newMode: string) => {
        setShowOverlay(true);
        setMode(newMode);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
        setMode("");
    };

    return (
        <div className={styles.container}>
            <img
                src="./images/uparrow.webp"
                alt="open"
                className={styles.open}
                onClick={handleTextBoxToggle}
            />
            <TextBox
                text="
                이 잠금장치의 비밀번호는 총 6자리 숫자로 이뤄져있다<br/>
                매우 중요한 문이기에 어려운 문제가 적혀져있다<br/>
                1 - 11 - 12 - 1121 - 1321 - 122131 - 132231 - 122232 - [ ?????? ]<br/>
                [ ?????? ] 안에 들어갈 6자리 수를 입력하시요"
                show={showTextBox}
                buttonText="제출"
                onButtonClick={handleSubmit}
            >
                <input
                    type="text"
                    value={userAnswer}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </TextBox>
            <img
                src="./images/uparrow.webp"
                alt="back"
                className={styles.backAisle}
                onClick={() => handleNavigation("/aisle")}
            />

            <img
                src="./images/paper.png"
                alt="Open Textbox"
                onClick={() => handleClick("fire")}
                className={styles.fire_extinguisher}
            />
            <TextBox
                show={showOverlay && mode === "fire"}
                text="1이 1개.. 1이 한개 2가 한개... 1이 3ㄱㅐ.. ..라 적혀있다"
                onButtonClick={closeOverlay}
            />

        </div>
    );
}
