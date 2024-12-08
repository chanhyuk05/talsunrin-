import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import TextBox from '../../components/TextBox/TextBox';

const dialogueData = [
    { text: "드디어 여기만 나가면 탈출이야!!", image: "images/maingate.jpg" }
];

export default function MainGate() {
    const [textIndex, setTextIndex] = useState(0);
    const [showSpeechBubble, setShowSpeechBubble] = useState(true); // Track speech bubble visibility
    const [showTextBox, setShowTextBox] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => {
                if (prevIndex < dialogueData[0].text.length) return prevIndex + 1;
                clearInterval(interval);
                return prevIndex;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const message = useMemo(() => dialogueData[0].text.slice(0, textIndex), [textIndex]);

    const handleSubmit = useCallback(() => {
        if (userAnswer === "투명색") {
            navigate('/ending');
        } else {
            setShowTextBox(false);
            alert("오답입니다");
        }
    }, [userAnswer, navigate]);

    const backToClassroom = () => {
        navigate("/stairs");
    };

    const handleContainerClick = useCallback(() => {
        if (showSpeechBubble) {
            setShowSpeechBubble(false); // Hide the speech bubble when clicking anywhere in the container
        }
    }, [showSpeechBubble]);

    return (
        <div
            className={styles.container}
            onClick={handleContainerClick} // Add click event to container
        >
            <img
                src="./images/people.png"
                alt="people"
                className={styles.people}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent TextBox from closing when clicking this image
                    setShowTextBox(true);
                }}
            />
            <img
                src={dialogueData[0].image}
                alt="Gate"
                className={styles.backgroundImage}
            />
            {showSpeechBubble && ( // Conditionally render speech bubble
                <div
                    className={styles.speechBubble}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent closing on speech bubble click
                        setShowSpeechBubble(false); // Hide on click
                    }}
                >
                    {message}
                </div>
            )}
            <TextBox
                text="곰 한 마리가 남쪽으로 10km, 서쪽으로 10km, 북쪽으로 10km 이동했더니 집으로 돌아왔다. 곰의 털 색깔은? (ex. 파란색, 빨간색)"
                show={showTextBox}
                buttonText="제출"
                onButtonClick={handleSubmit}
            >
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={styles.inputField}
                    onClick={(e) => e.stopPropagation()} // Prevent TextBox from closing when clicking input
                />
            </TextBox>
            <img
                src="./images/downarrow.webp"
                alt="downarrow"
                className={styles.backClassroom}
                onClick={backToClassroom}
            />
        </div>
    );
}
