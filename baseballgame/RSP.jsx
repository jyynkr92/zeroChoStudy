import React, {Component} from 'react';

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

// in case of class
// constructor -> render -> ref -> componentDidMount -> 
// (when setState/props is changed) -> shouldComponentUpdate (if it returns true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때, -> componentWillUnmount -> 소멸
class RSP extends Component {
    state = {
        result : '',
        imgCord : '0',
        score : 0,
    };

    interval;

    //life cycle 
    componentDidMount() { // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 함! render 처음 실행될 때 동작하는 부분
        //setInterval을 하면 component가 제거되더라도 계속 작동함!!!! -- memory leak가 생김 
        this.interval = setInterval (this.changeHand, 100);
    }

    componentDidUpdate() { // re-rendering 후에는 얘가 실행됨

    }
    
    componentWillUnmount() { //컴포넌트가 제거되기 직전 //componentDidMount에서 한 작업을 삭제! //비동기요청정리를 해줌
        //부모에 의해서 자식 컴포넌트가 없어질때! (부모 컴포넌트가 나(자식) 컴포넌트가 없어질때에도 사용)
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {
        const {imgCord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCord)];

        const diff = myScore - cpuScore;

        if (diff === 0) {
            this.setState({
                result : '비겼습니다.',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result:'이겼습니다.',
                    score : prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result:'졌습니다.',
                    score : prevState.score - 1,
                };
            });
        }

        setTimeout(() => {
            this.interval = setInterval (this.changeHand, 100);
        }, 2000);
    }

    changeHand = () => {
        const {imgCord} = this.state;
            if (imgCord === rspCords.바위) {
                this.setState({
                    imgCord : rspCords.가위,
                });
            } else if (imgCord === rspCords.가위) {
                this.setState({
                    imgCord : rspCords.보,
                });
            } else if (imgCord === rspCords.보) {
                this.setState({
                    imgCord : rspCords.바위
                });
            }
    }
    render() {
        const {result, score, imgCord} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0`, width:'145px', height:'200px'}} />
                <div>
                    <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>햔제 {score}점</div>
            </>
        )
    }
}

export default RSP;
