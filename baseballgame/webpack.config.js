//
const path = require('path'); //node가 깔려있으면 path가 있음

module.exports = {
    name : 'wordrelay-setting', //단순이 어떤거 개발하는지에 대한 이름
    mode : 'development', // 실서비스일때는  production을 사용하면됨
    devtool : 'eval',
    //app안에 확장자를 넣을 필요 없음!!
    resolve : {
        extensions : ['.js', '.jsx'] //알아서 client.js나 client.jsx가 있는지 확인함. 확인하고 아래의 app에서 해당 파일을 찾아줌!
    },
    //요기가 중요
    entry : {
        app : ["./client"],
    }, // 입력 ->client와 wordrelay를 하나의 파일로 모아줘야함
     
    //entry의 파일을 읽고 모듈을 적용한 후에 output에 뺌!
    module : {
        rules : [{
            test : /\.jsx?/, //js와 jsx파일을 적용시키겠다! 규칙을 적용할 파일들
            loader : 'babel-loader', //어떤 룰을 적용시키냐면 babel-loader!
            options : { //babel의 옵션 설정
                presets : ['@babel/preset-env', '@babel/preset-react'],
                plugins : ['@babel/plugin-proposal-class-properties',
                            'react-hot-loader/babel' //수정사항 자동 변경!
                ], // state = {} 이런 문법을 쓰려면 얘를 설치해줘야함
            }
        }]
    },
    output : { //client와 wordrelay를 하나로 뭉쳐서 얘로 만들게됨
        path : path.join(__dirname, 'dist'), // __dirname 현재 폴더를 가리킴
        filename : 'app.js'
    }, // 출력
};

//요롷게 설정해주고 터미널에서 webpack을 치면 알아서 하나로 만들어줌
//webpack은 다른 파일이 또 다른 파일을 불러오기 때문에 client.jsx를 불러오면 wordrelay.jsx를 app부분에 안써줘도 한번에 불러옴
// package.json 에 scripts안에 webpack넣고 명령어로 실행시킬 수 있거나
// npx webpack 이라고 터미널에 치면 됨!