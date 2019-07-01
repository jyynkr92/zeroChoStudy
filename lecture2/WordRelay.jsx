const React = require('react'); //npm 에서 불러옴!
const {Component} = React;

class WordRelay extends Component {
    state = {

    };

    render() {

    }
}

//이러면 client.jsx에서 require로 불러올 수 있음.
module.exports = WordRelay; //파일을 쪼개는 경우에는 이 라인과 맨 위의 npm으로 불러오는 라인들을 꼭 써줭함