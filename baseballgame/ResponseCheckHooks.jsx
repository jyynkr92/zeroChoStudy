import React, {useState} from 'react';
import './ResponseCheckCss.css';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    //document object에 직접접근할때 ref를 사용하는데, this의 속성들을 ref로 표현하기도함
    //값이 바뀌는데 화면을 변환시키고 싶지 않을 때 사용함!
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    // #######
    //state는 setState등으로 return부분이 다시 실행됨
    //useRef의 값들을 바꾸면 return부분이 다시 실행되지 않음.

    const onClickScreen = () => {
        if (state === 'waiting') {
            timeout.current = setTimeout(() => { //Timeout.current에서는 잠시 기록하는 역할함.
                setState('now');
                setMessage('지금 클릭 하세요');
                startTime.current = new Date(); //반응속도 체크
            }, Math.floor(Math.random() * 1000) + 2000); //2 ~ 3초 랜덤

            //여기서 setState하는 순간에 바뀜!
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
        } else if (state === 'ready') { //성급하게 클릭
            //기존의 setTimeout을 초기화 시켜주기
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
        } else if (state === 'now') { //반응 속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    }

    const onReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return result.length === 0
         ? null
         : <>
            <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
            </>
    }

    return (
        <>
            <div id = "screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck;