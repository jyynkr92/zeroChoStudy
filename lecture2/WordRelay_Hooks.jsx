const React = require('react'); //npm 에서 불러옴!
const {useState, useRef} = React;

const WordRelay = () => {

    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result,setResult] = useState('');
    const inputRef = useRef(null);
    state = {
        word : "은정",
        value : '',
        result : '',
    };

    //만드는 함수들은 화살표함수 써야함!
    onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    onChangeInput = (e) => {
        setValue(e.target.value);

    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력하세요.</label> {/** <label for="wordInput">으로 나옴 */}
                {/** className은 class로 됨... -> class와 for로 써도됨!(예전에는 안됐움!) */}
                <input id="wordInput" className="wordInput" ref={inputRef} value = {value} onChange={onChangeInput}/>
                <button>입력!!!!!!</button>
            </form>
            <div>{result}</div>
        </>
    )
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
 */