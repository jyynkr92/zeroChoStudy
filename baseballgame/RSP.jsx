import React, {Component} from 'react';

// in case of class
// constructor -> render -> ref -> componentDidMount -> 
// (when setState/props is changed) -> shouldComponentUpdate (if it returns true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때, -> componentWillUnmount -> 소멸
class RSP extends Component {
    state = {
        result : '',
        imgCord : 0,
        score : 0,
    };

    //life cycle 
    componentDidMount() { //render 처음 실행될 때 동작하는 부분

    }

    componentDidUpdate() { // re-rendering 후에는 얘가 실행됨

    }
    
    componentWillUnmount() { //컴포넌트가 제거되기 직전 //componentDidMount에서 한 작업을 삭제!
        //부모에 의해서 자식 컴포넌트가 없어질때! (부모 컴포넌트가 나(자식) 컴포넌트가 없어질때에도 사용)
    }


    render() {
        const {result, score, imgCord} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>햔제 {score}점</div>
            </>
        )
    }
}

export default RSP;
