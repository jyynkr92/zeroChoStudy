const React = require('react');
const ReactDom = require('react-dom');
const NumberBaseball = require('./NumberBaseball'); 

const {hot} = require('react-hot-loader/root'); //{hot} 이런 형식은 구조분해문법
const Hot = hot(NumberBaseball);

//import vs const
// import React from 'react'; -> babel이 require로 바꿔줌!
// import {hot} from 'react-hot-loader/react';
ReactDom.render(<Hot />, document.querySelector('#root')); //wordrelay폴더의 내용이 들어감!