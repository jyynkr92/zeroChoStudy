//Hooks에는 life cycle이 없지만 흉내는 낼수 있음

import React, {useState, useRef} from 'react';

const rspCords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px',
}

const scores = {
    가위 : 1,
    바위 : 0, 
    보 : -1,
}

const computerChoice = (imgCord) => {
    return Object.entries(rspCords).find(function(v) {
        return v[1] === imgCord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCord, setImgCord] = useState(rspCords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    //useLayoutEffect() -> 화면의 resizing 되기 전에 ! (화면 바뀌는걸 감지하는 역할)
    //useEffect() -> 화면이 resizing된 후에 실행됨

    /** useEffect는 세로 기준, class에서는 가로 기준
     *                          result,     imgCord,    score
     * componentDidMount
     * componentDidUpdate
     * componentWillUnmount
     * 
     * 
     * class일때
     * componentDidMount() {
     *   this.setState({
     *      imgCord : 3,
     *      score:1,
     *      result :2,
     *    })
     * }
     * 
     * hooks일 때
     * useEffect(() => {
     *      setImgCord(3);
     *      setScore(1);
     * }, [imgCord, score]);
     * 
     * useEffect(() => {
     *      setResult();
     * }, [result]);
     */
    //componentDidMount, componentDidUpdate, componentWillUnmount 역할을 모두 함
    //useEffect는 여러번 사용 가능! (다른 효과를 내고싶을 때 각각 쓸 수 있음)
    useEffect(() => { //componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        //매번 clearInterval하기 때문에 setInterval과 같은효과를 나타냄
        interval.current = setInterval(changeHand, 100);
        return () => { //componentWillUnmount역할
            clearInterval(interval.current);
        }
    }, [imgCord]); //2번째 인자 배열에 넣은 값(imgCord)들이 바뀔 때, useEffect가 실행됨, 빈 배열인 경우 한번만 실행되고 안됨! (뭐가 바뀌어도 상관없다는 느낌임! -- componentDidMount느낌임)
    
    const changeHand = () => {
        if (imgCord === rspCords.바위) {
            setImgCord(rspCords.가위);
        } else if (imgCord === rspCords.가위) {
            setImgCord(rspCords.보);
        } else if (imgCord === rspCords.보) {
            setImgCord(rspCords.바위);
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCord)];

        const diff = myScore - cpuScore;

        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다.');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다.');
            setScore((prevScore) => prevScore - 1);
        }

        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    };

    return (
        <>
        <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0`, width:'145px', height:'200px'}} />
        <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>햔제 {score}점</div>
    </>
    );
}

export default RSP;