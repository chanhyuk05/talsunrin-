import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './components/router.tsx';
let AudioContext;

window.onload = function () {
    console.log("이 홈페이지는 뮤팟에서 제공한 음원 소스를 사용했습니다. Why Are You Avoiding Me?- Download: mewc.at/songs/6663");
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
        AudioContext = window.AudioContext;
        new AudioContext();
    }).catch(e => {
        console.error(`Audio permissions denied: ${e}`);
    });
}
const audio = new Audio('/MP_왜 나를 피하는거야_.mp3');
audio.loop = true; // 음성 반복 설정
audio.play(); // 음성 재생

const App = () => (
    <RouterProvider router={router}></RouterProvider>
);

createRoot(document.getElementById('root')!).render(<App />);
export default App;
