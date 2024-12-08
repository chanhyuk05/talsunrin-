import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';

export default function Main() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [rankingData, setRankingData] = useState([]);
  const [showRanking, setShowRanking] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = () => setShowInput(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  useEffect(() => {

    // 서버에서 랭킹 데이터 가져오기
    axios.get('https://talsunrin-backend.eungyolee.kr/records', {
      headers: {
        'Access-Control-Allow-Origin': '*', // CORS 정책을 위반하지 않기 위한 임시 방편
      },
    }).then((res) => {
      if (res.data.message === "No records found") {
        setRankingData([]);
        return;
      }
      setRankingData(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error(err);
    });

    // 게임이 시작된 경우 기존 닉네임을 불러옴
    const gameStarted = document.cookie.split(';').find((cookie) => cookie.includes('gameStarted'))?.split('=')[1];
    if (gameStarted === 'true') {
      setInputValue(document.cookie.split(';').find((cookie) => cookie.includes('nickname'))?.split('=')[1] || '');
    }
  }, []);

  const handleSubmit = () => {
    if (!inputValue) return;
    if (inputValue.length > 20) {
      alert('닉네임은 20자 이내로 입력해주세요.');
      return;
    }
    document.cookie = `nickname=${inputValue}`;
    document.cookie = `startTime=${new Date().getTime()}`;
    document.cookie = `gameStarted=true`;
    navigate(`/classroom`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        navigate("/classroom");
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
      <img src="./images/downarrow.png" alt="" style={{
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1%',
        pointerEvents: 'none',
      }} />
      <img src="./images/downarrow.webp" alt="" style={{
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1%',
        pointerEvents: 'none',
      }} />
      <div className={styles.title}>탈선린</div>
      {showInput ? (
        <InputSection
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <StartButton onClick={handleStartClick} />
      )}
      <div className={styles.rankingBtn} onClick={() => {
        setShowRanking(!showRanking);
      }}>
        <img src="/images/ranking.png" alt="랭킹" />
      </div>
      {showRanking && (
        <div className={styles.rankingContainer}>
          <div className={styles.rankingTitle}>랭킹</div>
          {rankingData && rankingData.length > 0 ? (
            rankingData.map((data: { name: string; time: number }, index: number) => (
              <div key={index} className={styles.rankingItem}>
                <div className={styles.rankingIndex}>#{index + 1}</div>
                <div className={styles.rankingNickname}>{data.name}</div>
                <div className={styles.rankingTime}>{Math.floor(data.time / 60)}분 {Math.floor(data.time % 60)}초</div>
              </div>
            ))
          ) : (
            <div className={styles.rankingItem}>기록이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}

interface InputSectionProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const InputSection = ({ inputValue, onInputChange, onSubmit }: InputSectionProps) => (
  <div className={styles.inputContainer}>
    <input
      type="text"
      value={inputValue}
      onChange={onInputChange}
      placeholder="닉네임을 입력해주세요."
      className={styles.input}
    />
    <button onClick={onSubmit} className={styles.submitButton}>
      완료
    </button>
  </div>
);

interface StartButtonProps {
  onClick: () => void;
}

const StartButton = ({ onClick }: StartButtonProps) => (
  <div className={styles.startButton} onClick={onClick}>
    start
  </div>
);
