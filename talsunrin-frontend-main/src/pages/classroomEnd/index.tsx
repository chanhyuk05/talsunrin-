import { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import downarrow from '/downarrow.png';

interface DialogueItem {
  text: string;
  image: string;
}

const DialogueBox = () => {
  const location = useLocation();
  const { state } = location || {};

  const deskDialogue = useMemo(() => [
    { text: "교탁이다", image: "images/deskOver.jpg" },
    { text: "여기 쓸만한게 있을지도....", image: "images/deskOver.jpg" },
    { text: "음......", image: "images/find.jpg" },
  ], []);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showingMessage, setShowingMessage] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState<DialogueItem[] | string>([]);
  const [deskDialogueEnd, setDeskDialogueEnd] = useState(false);
  const [backgroundState, setBackgroundState] = useState("classroom");
  const [fadeClass] = useState("");
  const [hasFlashlight, setHasFlashlight] = useState(false);
  const [showTextBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const showNextMessage = useCallback(() => {
    setCurrentTextIndex((prevIndex) => {
      if (prevIndex < currentDialogue.length - 1) {
        return prevIndex + 1;
      } else {
        setShowingMessage(false);
        if (currentDialogue === deskDialogue) {
          setDeskDialogueEnd(true);
          setBackgroundState("find");
        } else if (currentDialogue === "MoveAisle") {
          navigate("/aisle", { state: { hasFlashlight: hasFlashlight } });
        }
        return prevIndex;
      }
    });
    setTextIndex(0);
  }, [currentDialogue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        showNextMessage();
      }
    };

    const handleClick = () => {
      showNextMessage();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [showNextMessage]);

  useEffect(() => {
    if (!showingMessage) return;

    const interval = setInterval(() => {
      setTextIndex((prevIndex) => prevIndex + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [showingMessage]);

  const message = useMemo(() => {
    if (typeof currentDialogue === 'string') {
      return currentDialogue.slice(0, textIndex) || "";
    } else {
      return currentDialogue[currentTextIndex]?.text.slice(0, textIndex) || "";
    }
  }, [currentTextIndex, textIndex, currentDialogue]);

  // const triggerFadeOut = () => {
  //   setFadeClass("fade-out");
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 800);
  // };

  const doorClick = () => {
    setCurrentDialogue("MoveAisle");
    setBackgroundState("find");
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
  };

  const deskClick = () => {
    setCurrentDialogue(deskDialogue);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
    setDeskDialogueEnd(false);
    setBackgroundState("deskOver");
  };

  const backToClassroom = () => {
    setDeskDialogueEnd(false);
    setCurrentDialogue([]);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(false);
    setBackgroundState("classroom");
  };

  if (deskDialogueEnd && backgroundState === "find") {
    return (
      <div
        className={`${styles.container}`}
        style={{
          backgroundImage: `url(${backgroundState === "find" ? "images/find.jpg" : "images/default.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <img
          src={downarrow}
          alt="downarrow"
          className={styles.backClassroom}
          onClick={backToClassroom}
        />
        <img
          src="./images/flashlight.png"
          alt="Flashlight"
          onClick={() => {
            setHasFlashlight(true);
            alert("손전등을 획득하셨습니다!");
          }}
          className={styles.flashlight}
          style={{ display: hasFlashlight ? "none" : "block" }}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${fadeClass}`}>
      <img
        src={
          backgroundState === "classroom"
            ? "./images/classroom.jpg"
            : Array.isArray(currentDialogue) ? currentDialogue[currentTextIndex]?.image || "" : ""
        }
        alt="Background"
        className={styles.backgroundImage}
      />
      {showingMessage && !deskDialogueEnd && (
        <div className={styles.speechBubble}>{message}</div>
      )}
      {!showingMessage && !deskDialogueEnd && !showTextBox && (
        <>
          <img
            src={downarrow}
            alt="downarrow"
            className={styles.door}
            onClick={doorClick}
          />
          <img
            src={downarrow}
            alt="downarrow"
            className={styles.desk}
            onClick={deskClick}
          />
        </>
      )}
    </div>
  );
};

export default DialogueBox;
