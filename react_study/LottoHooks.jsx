import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumber() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    //최적화 시켜주는 역할 (한번만 실행되도로고 (setTimeout할 때)
    //useMemo : 복잡한 함수 결과값을 기억
    //useCallback : 함수 자체를 기억하고 있음
    //useRef : 일반 값을 기억
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    /** 
     * hooks는 순서가 중요하며 조건문안에 넣어주면안됨!!!!!!!
     * useEffect나 그런거 안에서 hooks 쓰면안됨(useState 사용하면안됨)
     * if (조건) {const [redo, setRedo] = useState(false);}
     * 
     * 반복문안에서는 useState 넣어줘도되는데 굳이 넣어주지 않는게 좋음
     */

    useEffect(() => {
        for(let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => { //timeouts가 바뀐건 아님!!!
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => { // componentWillUnmount 위치
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]); //2번째 인자가 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 compnentDidMount랑 componentDidUpdate 둘 다 수행

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumber());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]); //winnumbers가 바뀌기 전까지 onClickRedo함수를 기억함

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
}

export default Lotto;