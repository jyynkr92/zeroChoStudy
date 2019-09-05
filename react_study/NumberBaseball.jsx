import React, {useState, memo, createRef} from 'react'; //비구조화할당
import Try from './Try';

//shouldComponentUpdate()를 사용하던지! 아니면 
//import React, {PureComponent} from 'react';
//로 하고.. class Test extends PureComponent {} 로 해주면됨.
// PureComponent라는게 shouldComponentUpdate를 자동으로 구현해줌.
// state가 바뀌었는지 안바뀌었는지 알아서 확인함. but 객체나 배열(참조관계가 있는)의 변경여부는 판단을 어려워함. (현재 array와 뒤에 push한 array는 같은거로 생각함)
// 그래서 purecomponent나 component를 사용할때든 setState할때 기존배열복사 + 추가 형식으로 해줘야함.
//shouldComponentUpdate나 memo를 꼭 최적화를 위해서 사용해주는게 좋음

//hooks로 바꿔도 독립적으로 존재함 (class 안에 없기 때문에)
function getNumbers() { //숫자 네 개를 겹치지 않고 랜덥하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }

    return array;
}

const NumberBaseball = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    //hooks에서 ref사용 import React, {useState, memo, createRef} from 'react';

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (value === answer.join('')) {
            setResult('홈런');
            setTries((prevTries) => {
               return [...prevTries, {try:value, result:'홈런!'}]
            });
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9) {
                setResult(`10번 넘게 돌려서 실패! 답은 ${answer.join(",")}였습니다!`);
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                
                setTries((prevTries) => {
                    return [...prevTries, {try : value, result : `${strike} 스트라이크, ${ball} 볼입니다.`}]
                });
                setValue('');
            }
        }
    }

    const onChangeInput = (e) => { //화살표함수 안쓸꺼면 위에 constructor를 써야함
        setValue(e.target.value);
    };

    return (
        <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input maxLength={4} value={value} onChange={onChangeInput}/>
        </form>
        <div>
            시도 : {tries.length}
        </div>
        <ul>
            {/**
                (() => { // 배열에 jsx문법을 담아서 push하는 것도 유효한 문법임 
                    const array = [];
                    for (let i = 0; i < tries.length; i++) {
                        array.push(<Try key={`${i + 1}차 시도 :`} tryInfo={v}/> );
                    }
                    return array;
                })
            */}
            {tries.map((v, i) => { 
                return(
                    <Try key={`${i + 1}차 시도 :`} tryInfo={v}/> 
                );
            })}
        </ul>
    </>
    )
})
// class NumberBaseball extends Component {
//     state = {
//         result : '',
//         value:'',
//         answer: getNumbers(), // [1,3,5,7]
//         tries : [],
//     };

//     onSubmitForm = (e) => {
//         const {value, tries, answer} = this.state;
//         e.preventDefault();

//         if (this.state.value === this.state.answer.join('')) {
//             //옛 state로 새로운 state를 만들 때, prevState로 받아서 함수형으로 써쥬면 아래의 setState랑 겹쳐질때 문제가 안생김
//             this.setState((prevState) => {
//                 return {
//                     result:'홈런',
//                     //const array = []; array.push(1); 리액트는 이렇게 push하면 안됨
//                     //react는 이러면 뭐가 바뀌었는지 감지를 못하기 때문!
//                     //감지할 수 있도록하기 위해
//                     // const array2 = [...array,2] --- 기존 배열 복사 + 새로운거 추가
//                     //   --- react의 rendering이 바뀌는건! state가 바뀌어야함.
//                     // const arr = []; arr.push(1); arr === arr; 이러면 true를 반환해서 같은걸로 인식함
    
//                     //옛날꺼 복사해서 새로운거 추가로 넣어주는 형태로 해줘야함!! (새로운 배열로 인식하기 때문)
//                     tries : [...prevState.tries, {try:value, result:'홈런!'}]
//                 }
//             })
//         } else {
//             const answerArray = this.state.value.split('').map((v) => parseInt(v));
//             let strike = 0;
//             let ball = 0;

//             if(this.state.tries.length >= 9) {
//                 this.setState({
//                     reuslt : `10번 넘게 돌려서 실패! 답은 ${answer.join(",")}였습니다!`,
//                 });

//                 this.setState({
//                     value : '',
//                     answer : getNumbers(),
//                     tries : [],
//                 });
//             } else {
//                 for(let i = 0; i < 4; i++) {
//                     if(answerArray[i] === this.state.answer[i]) {
//                         strike += 1;
//                     } else if (this.state.answer.includes(answerArray[i])) {
//                         ball += 1;
//                     }
//                 }

//                 this.setState((prevState) => {
//                     return {
//                         tries : [...prevState.tries, {try : value, result : `${strike} 스트라이크, ${ball} 볼입니다.`}],
//                         value : '',
//                     }
//                 })
//             }
//         }
//     }

//     onChangeInput = (e) => { //화살표함수 안쓸꺼면 위에 constructor를 써야함
//         console.log(this.state.answer);
//         this.setState({
//             value : e.target.value
//         })
//     };

//     /** 화살표 함수 안쓸떄는?
//      * 
//      * onChangeInput(e) {
//      *  this.setState({ 이렇게 this를 쓸 수 없음! 쓰려면 contructor와 같이 써줘야함
//      *  value : e.target.value
//      * })
//      * }
//      * 
//      * 
//      * ----------------
//      * constructor(props) {
//      *  super(props);
//      *  this.state = {
//      *      result : '',
//      *      value : '',
//      *      answer : getNumbers(),
//      *      trys : []
//      *  };
//      *  this.onSubmitForm = this.onSubmitForm.bind(this);
//      *  this,onChangeInput = this.onChangeInput.bind(this);
//      * }
//      */ 

//     render() { //render는 extends Component에서 처리해주기 때문에 화살표 함수로 만들 필요가 없음
//         return (
//             <>
//                 <h1>{this.state.result}</h1>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/> {/** value와 onChange는 set임 onChange안쓸꺼면 defaultValue필요 */}
//                 </form>
//                 <div>
//                     시도 : {this.state.tries.length}
//                 </div>
//                 <ul>
//                     {/** 
//                         시도 로그들! --> 반복문을 쓸 예정(map) 
//                         화면에 표시는 안되지만 리액트의 성능최적화를 위하여 key={}를 써서 고유한 아이디가 추가되어야함

//                         다 한 페이지에 적어서 반복문 단위로 먼저 컴포넌트 파일을 분리함 (Top-Down 방식)
//                     */}
//                     {this.state.tries.map((v, i) => { //v는 배열의 객체, index는 인덱스! key로 index쓰는거는 비추임!(성능최적화가 안됨!)
//                         return(
//                             <Try key={`${i + 1}차 시도 :`} tryInfo={v}/> /** html에서는 attribute, react에서는 props */
//                         );
//                     })}
//                     {/**
//                         [].map(() => (
//                                 <li>like</li>
//                             );
//                         ) //이렇게 쓸 수 있음
//                     */}
//                 </ul>
//             </>
//         );
//     }
// }

export default NumberBaseball;
// module.exports = NumberBaseball;
//둘이 호환됨! 약간의 차이가 있음
//export const hellp = 'hello'; //import {hello} 로 가져옴, 여러개 쓸 수 있음
//export default NumberBaseball; //import NumberBaseball 로 가져옴 클래스당 하나만 쓸 수 있음

//node 모듈 시스템에서 쓸수 있을 거!
//const React = require('react');
//exports.hello = "hello";
//module.exports = NumberBaseball;