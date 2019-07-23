const React = require('react');
const {Component} = React;

function getNumbers() { //숫자 네 개를 겹치지 않고 랜덥하게 뽑는 함수

}

class NumberBaseball extends Component {
    state = {
        result : '',
        value:'',
        answer: getNumbers(), //
        tries : [],
    };

    onChangeInput = () => { //화살표함수 안쓸꺼면 위에 constructor를 써야함
        
    };

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/> {/** value와 onChange는 set임 onChange안쓸꺼면 defaultValue필요 */}
                </form>
                <div>
                    시도 : {this.state.tries.length}
                </div>
                <ul>
                    {/** 
                        시도 로그들! --> 반복문을 쓸 예정(map) 
                        화면에 표시는 안되지만 리액트의 성능최적화를 위하여 key={}를 써서 고유한 아이디가 추가되어야함
                    */}
                    {[].map((v, index) => { //v는 배열의 객체, index는 인덱스! key로 index쓰는거는 비추임!(성능최적화가 안됨!)
                        return(
                            <li>like</li>
                        );
                    })}
                    {/**
                        [].map(() => (
                                <li>like</li>
                            );
                        ) //이렇게 쓸 수 있음
                    */}
                </ul>
            </>
        );
    }
}

module.exports = NumberBaseball;
//둘이 호환됨! 약간의 차이가 있음
//export const hellp = 'hello'; //import {hello} 로 가져옴, 여러개 쓸 수 있음
//export default NumberBaseball; //import NumberBaseball 로 가져옴 클래스당 하나만 쓸 수 있음

//node 모듈 시스템에서 쓸수 있을 거!
//const React = require('react');
//exports.hello = "hello";
//module.exports = NumberBaseball;