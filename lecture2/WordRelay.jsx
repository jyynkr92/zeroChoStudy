const React = require('react'); //npm 에서 불러옴!
const {Component} = React;

class WordRelay extends Component {
    state = {
        word : "은정",
        value : '',
        result : '',
    };

    //만드는 함수들은 화살표함수 써야함!
    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState ({
                result : '딩동댕',
                word : this.state.value,
                value : '',
            })

            this.input.focus();
        } else {
            this.setState({
                result : '땡',
                value : '',
            });

            this.input.focus();
        }
    }

    onChangeInput = (e) => {
        this.setState({value : e.currentTarget.value});

    }

    onRefInput = (c) => {
        this.input = c;
    }

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value = {this.state.value} onChange={this.onChangeInput}/>
                    <button>입력!!!!!!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

//이러면 client.jsx에서 require로 불러올 수 있음.
module.exports = WordRelay; //파일을 쪼개는 경우에는 이 라인과 맨 위의 npm으로 불러오는 라인들을 꼭 써줭함

//**** 자동빌드 설정방벙 */
//npm i -D react-hot-loader
//npm i -D webpack-dev-server : nodemon, 변경점을 바꿔줌!
/**
 * 
 * webpack-dev-server : webpack.config.js를 읽어서 실행 -> 항상 뒤쪽 서버에 유지를 시켜줌
 *                  npm run을 하면 http://localhost:8080 으로 서버를 줘서 돌릴 수 있도록 함.
 * 
 *  console창 => [HMR] : hot moudle reload
 * [WDS] : webpack dev server
 */
