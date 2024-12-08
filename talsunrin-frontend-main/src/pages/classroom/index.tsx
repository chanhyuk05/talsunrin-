import React, { useState, useEffect, useCallback } from 'react';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import TextBox from '../../components/TextBox/TextBox';
import downarrow from '/downarrow.png';

const dialogueData = [
  { text: '음...', image: 'me.jpg' },
  { text: '..어.....?', image: 'me.jpg' },
  { text: '내가...얼마나 잔거지?', image: 'me.jpg' },
  { text: '.............', image: 'me.jpg' },
  { text: '..... 어????', image: 'clock.jpg' },
  { text: '어!!?!?!? 1시라고??!!!!!!', image: 'clock.jpg' },
  { text: '엄', image: 'clock.jpg' },
  { text: '빨리 집으로 돌아가야해', image: 'classroom.jpg' },
];

const windowDialogue = [
  { text: '음...', image: 'window.jpg' },
  { text: '와 원현서 엄청 똑똑해', image: 'window.jpg' },
  { text: '어떻게 사람머리에서 이런 아이디어가 나오지?', image: 'window.jpg' },
  { text: '이정도면 낙법만 잘하면 살 수 있겠는걸? ㅋㅋㅋㅋㅋ', image: 'fall.jpg' },
  { text: '당장 해보자', image: 'fall.jpg' },
  { text: '영~~차', image: 'fall.jpg' },
];

const outletDialogue = [
  { text: '음ㅁ...', image: 'outletMain.jpg' },
  { text: '이거는 ......', image: 'outletMain.jpg' },
  { text: '전기로 작동하나봐', image: 'outlet.jpg' },
  { text: '어 어ㅓㅓㅓㅓ', image: 'outlet.jpg' },
  { text: '으ㅡ으야야약ㄱㄱ', image: 'outlet.jpg' },
];

const deskDialogue = [
  { text: '교탁이다', image: 'deskOver.jpg' },
  { text: '여기 쓸만한게 있을지도....', image: 'deskOver.jpg' },
  { text: '음......', image: 'find.jpg' },
];

const doorDialogue = [
  { text: '앞문은 단단히 잠겨있다', image: 'find.jpg' },
  { text: '잠금을 풀려면 열쇠가 필요해보인다', image: 'find.jpg' },
  { text: '출석부 담당인 동화 책상에 있을지도 .....', image: 'find.jpg' },
];

const moveAisleDialogue = [
  { text: '앞문은 단단히 잠겨있다', image: 'find.jpg' },
  { text: ' 달그락 다ㄹ 닫ㄷ... ', image: 'find.jpg' },
  { text: ' .... 찰칵! ', image: 'find.jpg' },
  { text: ' 드드ㅡ드르르르 쿵', image: 'find.jpg' },
];

const seaChestDialogue = [
  { text: '우리반 사물함이다..', image: 'SeaChest.jpg' },
  { text: '백승우, 염승엽, 황동화의 사물함만 잠금장치가 없다', image: 'SeaChest.jpg' },
  { text: '탈출에 필요한게 있는지 탐색해보자', image: 'SeaChest.jpg' },
];

const dongDialogue = [
  { text: '동화의 사물함이다', image: 'seaChestClose.jpg' },
  { text: '여기에 아마 열쇠가 있을거야', image: 'seaChestClose.jpg' },
  { text: '....?', image: 'safe.jpg' },
  { text: '누가 반 열쇠를 금고에 넣어놔...', image: 'safe.jpg' },
  { text: '엄', image: 'safe.jpg' },
];

const qwerDialogue = [
  { text: '........', image: 'seaChestClose.jpg' },
  { text: '뭔가 .... 이상한 느낌이.....', image: 'seaChestClose.jpg' },
  { text: '쿵!!!!!', image: 'qwertySeaChest.jpg' },
  { text: '어..ㅇ 승여ㅂ아?', image: '20241202_115522.png' },
  { text: '승엽 : 현서야 ㅎㅎ', image: '20241202_115522.png' },
  { text: '승엽 : 너가 일어나기만을 계속 기다려썽 ㅎㅎㅎ', image: '20241202_115522.png' },
  { text: '승엽 : 일루와 ㅎㅎㅎㅎㅎㅎ', image: '20241202_115439.webp' },
  { text: '으아아아ㅏㅏ각ㄱ', image: '20241202_115439.webp' },
  { text: '안돼돼ㅐㅐㅐㅐㅐㅐ', image: '20241202_115439.webp' },
];

const tmddnDialogue = [
  { text: '이 사물함은....', image: 'seaChestClose.jpg' },
  { text: '뭔 냄새지....?', image: 'seaChestClose.jpg' },
  { text: '..어.. 머리가ㅏㅏ....', image: 'seaChestClose.jpg' },
  { text: '윽...!!', image: 'hot6.jpg' },
  { text: '핫X스가 몇..개야 이게...', image: 'hot6.jpg' },
  { text: '으..윽ㅇ 냄새만으..로도 심장이..랑 머..리가..', image: 'hot6.jpg' },
  { text: '어ㅓ..ㅓㅓ', image: 'hot6.jpg' },
];

const DialogueBox = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showingMessage, setShowingMessage] = useState(true);
  const [currentDialogue, setCurrentDialogue] = useState(dialogueData);
  const [isElectrocuted, setIsElectrocuted] = useState(false);
  const [isFallen, setIsFallen] = useState(false);
  const [isTmddn, setIsTmddn] = useState(false);
  const [isQwer, setIsQwer] = useState(false);
  const [deskDialogueEnd, setDeskDialogueEnd] = useState(false);
  const [seaChestDialogueEnd, setSeaChestDialogueEnd] = useState(false);
  const [backgroundState, setBackgroundState] = useState('default');
  const [fadeClass, setFadeClass] = useState('');
  const [hasFlashlight, setHasFlashlight] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [showTextBox, setShowTextBox] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const navigate = useNavigate();

  const message = currentDialogue[currentTextIndex]?.text.slice(0, textIndex) || '';

  const showNextMessage = useCallback(() => {
    if (currentTextIndex < currentDialogue.length - 1) {
      setCurrentTextIndex((prevIndex) => prevIndex + 1);
      setTextIndex(0);
    } else {
      setShowingMessage(false);
      if (currentDialogue === outletDialogue) setIsElectrocuted(true);
      else if (currentDialogue === windowDialogue) setIsFallen(true);
      else if (currentDialogue === deskDialogue) {
        setDeskDialogueEnd(true);
        setBackgroundState('find');
      } else if (currentDialogue === doorDialogue) backToClassroom();
      else if (currentDialogue === moveAisleDialogue) navigate('/aisle', { state: { hasFlashlight } });
      else if (currentDialogue === seaChestDialogue) setSeaChestDialogueEnd(true);
      else if (currentDialogue === tmddnDialogue) setIsTmddn(true);
      else if (currentDialogue === qwerDialogue) setIsQwer(true);
      else if (currentDialogue === dongDialogue) setShowTextBox(true);
    }
  }, [currentTextIndex, currentDialogue, navigate, hasFlashlight]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        navigate("/aisle");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') showNextMessage();
    };
    const handleClick = () => showNextMessage();
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, [showNextMessage]);

  useEffect(() => {
    if (!showingMessage) return;
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => prevIndex + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [showingMessage]);

  const triggerFadeOut = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  const returnToMain = () => triggerFadeOut();

  const doorClick = () => {
    if (hasKey) {
      setCurrentDialogue(moveAisleDialogue);
    } else {
      setCurrentDialogue(doorDialogue);
    }
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
    setBackgroundState('deskOver');
  };

  const windowClick = () => {
    setCurrentDialogue(windowDialogue);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
    setBackgroundState('default');
  };

  const outletClick = () => {
    setCurrentDialogue(outletDialogue);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
    setBackgroundState('default');
  };

  const seaChestClick = () => {
    setCurrentDialogue(seaChestDialogue);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
    setSeaChestDialogueEnd(false);
    setBackgroundState('seachest');
  };

  const backToClassroom = () => {
    setDeskDialogueEnd(false);
    setSeaChestDialogueEnd(false);
    setCurrentDialogue(dialogueData);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(false);
    setBackgroundState('classroom');
  };

  const tmddnClick = () => {
    setCurrentDialogue(tmddnDialogue);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
    setBackgroundState('default');
    setDeskDialogueEnd(false);
    setSeaChestDialogueEnd(false);
  };

  const qwerClick = () => {
    setCurrentDialogue(qwerDialogue);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
    setBackgroundState('default');
    setDeskDialogueEnd(false);
    setSeaChestDialogueEnd(false);
  };

  const dong = () => {
    setCurrentDialogue(dongDialogue);
    setCurrentTextIndex(0);
    setTextIndex(0);
    setShowingMessage(true);
    setBackgroundState('default');
    setDeskDialogueEnd(false);
    setSeaChestDialogueEnd(false);
  };

  const handleSubmit = () => {
    if (userAnswer === '1511') {
      alert('정답입니다!!!');
      setHasKey(true);
      setBackgroundState('classroom');
    } else {
      alert('오답입니다');
      setBackgroundState('seachest');
    }
    setShowTextBox(false);
    setUserAnswer('');
    setSeaChestDialogueEnd(true);
    setCurrentDialogue(seaChestDialogue);
  };

  if (seaChestDialogueEnd) {
    return (
      <div
        className={styles.container}
        style={{
          backgroundImage: `url('./images/SeaChest.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <img src={downarrow} alt="dong" className={styles.dong} onClick={dong} />
        <img src={downarrow} alt="tmddn" className={styles.tmddn} onClick={tmddnClick} />
        <img src={downarrow} alt="qwerty" className={styles.qwerty} onClick={qwerClick} />
        <img src={downarrow} alt="back" className={styles.seabackClassroom} onClick={backToClassroom} />
      </div>
    );
  }

  if (deskDialogueEnd && backgroundState === 'find') {
    return (
      <div
        className={styles.container}
        style={{
          backgroundImage: `url('/images/find.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <img src={downarrow} alt="back" className={styles.backClassroom} onClick={backToClassroom} />
        {!hasFlashlight && (
          <img
            src="./images/flashlight.png"
            alt="Flashlight"
            onClick={() => {
              setHasFlashlight(true);
              alert('손전등을 획득하셨습니다!');
            }}
            className={styles.flashlight}
          />
        )}
      </div>
    );
  }

  if (isElectrocuted) {
    return (
      <div className={`${styles.electrocutedContainer} ${fadeClass}`}>
        <h1>감전사하셨습니다</h1>
        <p>어디서 맛있는 냄새가 나는데요? : )</p>
        <button onClick={returnToMain} className={styles.returnButton}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  if (isFallen) {
    return (
      <div className={`${styles.fallenContainer} ${fadeClass}`}>
        <h1>낙사하였습니다</h1>
        <p>아 10kg만 가벼웠으면 가능했다고 ㅋㅋㅋ</p>
        <button onClick={returnToMain} className={styles.returnButton}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  if (isTmddn) {
    return (
      <div className={`${styles.tmddnContainer} ${fadeClass}`}>
        <h1>심장이 마비되셨습니다</h1>
        <p>하나만 마셔도 가슴이 벌렁거리는데 승우는.... 뭐지?</p>
        <button onClick={returnToMain} className={styles.returnButton}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  if (isQwer) {
    return (
      <div className={`${styles.qwerContainer} ${fadeClass}`}>
        <h1>결혼하였습니다</h1>
        <p>ㅅ..새로운 취향에.. 눈이 떠버려어어ㅓㅇㅆ</p>
        <button onClick={returnToMain} className={styles.returnButton}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${fadeClass}`}>
      <img
        src={
          backgroundState === 'classroom'
            ? '/images/classroom.jpg'
            : '/images/' + currentDialogue[currentTextIndex]?.image || ''
        }
        alt="Background"
        className={styles.backgroundImage}
      />
      {showingMessage && !deskDialogueEnd && !seaChestDialogueEnd && (
        <div className={styles.speechBubble}>{message}</div>
      )}
      {!showingMessage && !deskDialogueEnd && !seaChestDialogueEnd && !showTextBox && (
        <>
          <img src={downarrow} alt="door" className={styles.door} onClick={doorClick} />
          <img src={downarrow} alt="desk" className={styles.desk} onClick={deskClick} />
          <img src={downarrow} alt="outlet" className={styles.outlet} onClick={outletClick} />
          <img src={downarrow} alt="window" className={styles.window} onClick={windowClick} />
          <img src={downarrow} alt="seaChest" className={styles.seaChest} onClick={seaChestClick} />
        </>
      )}
      {showTextBox && (
        <TextBox
          show={showTextBox}
          text={`동화의 금고 안에 열쇠가 들어있다.<br/>
                금고의 비밀번호는 네 자리다.<br/>
                [151] [161] [191] [151] [ ? ]<br/>
                [ ? ] 안에 들어간 수가 동화의 비밀번호이다<br/>
                동화의 비밀번호를 입력하자.
                (디지털 숫자로 생각해보자.)`}
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
    </div>
  );
};

export default React.memo(DialogueBox);

