const React = require('react');
const ReactDom = require('react-dom');
//import TicTacToe from './TicTacToe';
import MineSearch from './MineSearch/MineSearch';
//const TicTacToe = require('./TicTacToe'); 

const {hot} = require('react-hot-loader/root'); //{hot} 이런 형식은 구조분해문법
const Hot = hot(MineSearch);

//import vs const
// import React from 'react'; -> babel이 require로 바꿔줌!
// import {hot} from 'react-hot-loader/react';
ReactDom.render(<Hot />, document.querySelector('#root')); //wordrelay폴더의 내용이 들어감!