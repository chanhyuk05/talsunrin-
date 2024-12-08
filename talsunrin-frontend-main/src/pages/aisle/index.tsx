import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextBox from "../../components/TextBox/TextBox";

export default function Aisle() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [mode, setMode] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // 경고 메시지 상태
    const [hasFlashlight, setHasFlashlight] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // flashlight 클릭 여부 확인
    const { state } = location || {};

    const handleClick = (newMode: string, path?: string) => {
        if (path) {
            // flashlight 조건 확인 후 경로 이동
            if (path === "/stairs" && !hasFlashlight) {
                setErrorMessage("손전등이 필요해 보인다."); // 에러 메시지 설정
                setShowOverlay(true); // TextBox를 표시
                return;
            }
            navigate(path, { state: { ...state, hasFlashlight: true } });
        } else {
            setShowOverlay(true);
            setMode(newMode);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                navigate("/stairs");
            }
            if (event.key === "ArrowLeft") {
                navigate("/classroomEnd");
            }
            if (event.key === "ArrowUp") {
                navigate("/backDoor");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);
    const handleSubmit = () => {
        if (userAnswer === "TEN" || userAnswer === "ten") {
            navigate("/backDoor");

        } else {
            alert("오답입니다");
        }
        setShowTextBox(false);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
        setMode("");
        setErrorMessage(""); // 에러 메시지 초기화
    };

    useEffect(() => {
        setHasFlashlight(!!state?.hasFlashlight);
    }, [state]);

    return (
        <div className={styles.container}>
            {/* 소화기 */}
            <img
                src="./images/fire_extinguisher.jpg"
                alt="Open Textbox"
                onClick={() => handleClick("fire")}
                className={styles.fire_extinguisher}
            />
            <TextBox
                show={showOverlay && mode === "fire"}
                text="소화기 뒤 쪽지엔 '[english] 북극점은 동쪽을 안거쳐도 원점으로 올수있는거 알아?' 라고 쓰여있다."
                onButtonClick={closeOverlay}
            />

            {/* 포인트 */}
            <img
                src="./images/point.png"
                alt="Open Textbox"
                onClick={() => handleClick("point")}
                className={styles.point}
            />
            <TextBox
                show={showOverlay && mode === "point"}
                text="밤이라서 그런지 뒤쪽은 매우 어둡다."
                onButtonClick={() => handleClick("", "/stairs")}
            />

            {/* 계단 이동 조건 TextBox */}
            <TextBox
                show={!!errorMessage} // 에러 메시지가 있는 경우 표시
                text={errorMessage}
                onButtonClick={closeOverlay}
            />

            {/* 문 */}
            <img
                src="./images/door.png"
                alt="Open Textbox"
                onClick={() => setShowTextBox(true)}
                className={styles.door}
            />
            {showTextBox && ( // 텍스트 박스 조건부 렌더링 151 161 191 151 
                <TextBox
                    show={showTextBox}
                    text={`멈춘다는 것은 냄비"와 같고<br/>
                     "살아있다는 것은 악마"와 같다.<br/>
                      그렇다면, "그물"은 무엇과 같을까?`}
                    buttonText="제출"
                    onButtonClick={handleSubmit}
                >
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className={styles.inputField}
                    />
                </TextBox>
            )}

            {/* 교실 문 */}
            <img
                src="./images/door.png"
                alt="Open Textbox"
                onClick={() => handleClick("", "/classroomEnd")}
                className={styles.classroomdoor}
            />
        </div>
    );
}
