import React, {Component} from 'react';
import Try from './Try';

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

    /** 화살표 함수 안쓸떄는?
     * 
     * onChangeInput(e) {
     *  this.setState({ 이렇게 this를 쓸 수 없음! 쓰려면 contructor와 같이 써줘야함
     *  value : e.target.value
     * })
     * }
     * 
     * 
     * ----------------
     * constructor(props) {
     *  super(props);
     *  this.state = {
     *      result : '',
     *      value : '',
     *      answer : getNumbers(),
     *      trys : []
     *  };
     *  this.onSubmitForm = this.onSubmitForm.bind(this);
     *  this,onChangeInput = this.onChangeInput.bind(this);
     * }
     */ 

    fruits = [
        {fruit : '사과', taste : '맛있다'},
        {fruit : '감', taste : '시다'},
        {fruit : '귤', taste : '달다'},
        {fruit : '밤', taste : '떫다'},
        {fruit : '배', taste : '맛있다'},
        {fruit : '무', taste : '맛있다'},
        {fruit : '사과', taste : '맛없따'},
    ]

    render() { //render는 extends Component에서 처리해주기 때문에 화살표 함수로 만들 필요가 없음
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

                        다 한 페이지에 적어서 반복문 단위로 먼저 컴포넌트 파일을 분리함 (Top-Down 방식)
                    */}
                    {this.fruits.map((v, index) => { //v는 배열의 객체, index는 인덱스! key로 index쓰는거는 비추임!(성능최적화가 안됨!)
                        return(
                            <Try key={v.fruit + v.taste} value={v} index={index}/> /** html에서는 attribute, react에서는 props */
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

export default NumberBaseball;
// module.exports = NumberBaseball;
//둘이 호환됨! 약간의 차이가 있음
//export const hellp = 'hello'; //import {hello} 로 가져옴, 여러개 쓸 수 있음
//export default NumberBaseball; //import NumberBaseball 로 가져옴 클래스당 하나만 쓸 수 있음

//node 모듈 시스템에서 쓸수 있을 거!
//const React = require('react');
//exports.hello = "hello";
//module.exports = NumberBaseball;