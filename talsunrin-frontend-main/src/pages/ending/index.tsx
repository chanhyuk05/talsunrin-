import { useEffect } from 'react';
import styles from './style.module.css';
import axios from 'axios';

export default function Ending() {
    useEffect(() => {
        const currentTime = new Date().getTime();
        if (!document.cookie.split(';').find((cookie) => cookie.includes('startTime'))?.split('=')[1]) return;
        const startTimeCookie = document.cookie.split(';').find((cookie) => cookie.includes('startTime'))?.split('=')[1];
        const playTime = Math.floor((currentTime - (startTimeCookie ? parseInt(startTimeCookie) : 0)) / 1000);

        axios.post('https://talsunrin-backend.eungyolee.kr/record', {
            name: document.cookie.split(';').find((cookie) => cookie.includes('nickname'))?.split('=')[1],
            time: playTime,
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.error(err);
        });

        document.cookie = 'gameStarted=false';
        document.cookie = 'nickname=';
        document.cookie = 'startTime=';
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.text}>플레이 해주셔서 감사합니다.</h1>
            <h1 className={styles.developer}>BE: 이은교 <br />FE: 박찬혁, 원현서, 이은교 🥕 </h1>
        </div>
    );
}
