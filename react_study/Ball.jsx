import React, {PureComponent} from 'react';
//제일 최하위는 PureComponent를 사용하면 됨! (단순 표현 부분이라서..)
//함수컴포넌트로 만들어도됨
// hooks는 useState, useEffect를 사용하는 것을 얘기함
// 함수컴포넌트일 때, PureComponent대신에 memo사용하면됨
class Ball extends PureComponent {
    render() {
        const {number} = this.props;
        let background;
        if (number <= 10) {
            background = 'red';
        } else if (number <= 20) {
            background = 'orange';
        } else if (number <= 30) { 
            background = 'yellow';
        } else if (number <= 40) {
            background = 'blue';
        } else {
            background = 'green';
        }

        return (
            <div className = "ball" style={{background}}>{number}</div>
        )
    }
}

export default Ball;