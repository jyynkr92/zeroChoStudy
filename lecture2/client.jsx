const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay'); //필요한거만 불러올 수 있음.
//js와 jsx확장자의 차이
//jsx -> jsx문법을 담고 있음!

ReactDom.render(<WordRelay/>, document.querySelector('#root')); //wordrelay폴더의 내용이 들어감!