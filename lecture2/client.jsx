const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay'); //필요한거만 불러올 수 있음.
//js와 jsx확장자의 차이
//jsx -> jsx문법을 담고 있음!
//jsx를 사용하기 위해서 Webpack에 babel을 넣어줘야함!
//babel안에서 jsx설정을 해줘야함! (babel만 깐다고 해결되는게 아님)
//npm i -D @babel/core --> 기본 babel이 최신문법을 알아서 구문법으로 바꿔줌!
//npm i -D @babel/preset-env   --> 브라우저에 맞춰서 알아서 바꿔줌
//npm i -D @babel/preset-react  --> jsx를 쓸 수 있게 해줌
//npm i -D babel-loader --> babel과 webpack을 연결해줌

ReactDom.render(<WordRelay/>, document.querySelector('#root')); //wordrelay폴더의 내용이 들어감!