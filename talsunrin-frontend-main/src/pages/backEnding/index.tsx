import { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

const BackEnding = () => {
  const navigate = useNavigate();

  const dialogueData = useMemo(() => [
    { text: "오늘이 초승달이어서 그런가.. 훨씬 더 어둡네..", image: "backDoor.jpg" },
    { text: "음... 내가 듣기로는 중학교 쪽으로 가면 후문이 있다고 들었는데...", image: "backDoor.jpg" },
    { text: "후문으로 가면 밝은 숙대거리가 나올거야", image: "backDoor.jpg" },
    { text: "후문으로 나가고 숙대입구역으로 가서 지하철을 타고 나가자!", image: "backDoor.jpg" },
  ], []);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showingMessage, setShowingMessage] = useState(true);
  const [isBackEnding, setIsBackEnding] = useState(false);
  const [fadeClass, setFadeClass] = useState("");

  const showNextMessage = useCallback(() => {
    setCurrentTextIndex((prevIndex) => {
      if (prevIndex < dialogueData.length - 1) {
        return prevIndex + 1;
      } else {
        setShowingMessage(false);
        setIsBackEnding(true);
        return prevIndex;
      }
    });
    setTextIndex(0);
  }, [dialogueData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        showNextMessage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showNextMessage]);

  useEffect(() => {
    if (!showingMessage) return;

    const interval = setInterval(() => {
      setTextIndex((prevIndex) => prevIndex + 1);
    }, 100);

    if (textIndex >= dialogueData[currentTextIndex]?.text.length) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [showingMessage, textIndex, currentTextIndex, dialogueData]);

  const message = useMemo(() => {
    return dialogueData[currentTextIndex]?.text.slice(0, textIndex) || "";
  }, [currentTextIndex, textIndex, dialogueData]);

  const currentImage = 'images/' + dialogueData[currentTextIndex]?.image || "default.jpg";

  const returnToMain = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  if (isBackEnding) {
    return (
      <div className={`${styles.BackEndingContainer} ${fadeClass}`}>
        <h1>탈출하였습니다?</h1>
        <p>1시엔 지하철 운영 안하는건 안비밀~~</p>
        <button onClick={returnToMain} className={styles.returnButton}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {showingMessage && (
        <div className={styles.speechBubble}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default BackEnding;
