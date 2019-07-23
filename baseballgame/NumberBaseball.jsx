const React, {Component} = require('react');

class NumberBaseball extends Component {

}

export default NumberBaseball;
//둘이 호환됨! 약간의 차이가 있음
//export const hellp = 'hello'; //import {hello} 로 가져옴, 여러개 쓸 수 있음
//export default NumberBaseball; //import NumberBaseball 로 가져옴 클래스당 하나만 쓸 수 있음

//node 모듈 시스템에서 쓸수 있을 거!
//const React = require('react');
//exports.hello = "hello";
//module.exports = NumberBaseball;