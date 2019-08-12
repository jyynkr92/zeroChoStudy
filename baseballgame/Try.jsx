import React, {PureComponent, memo, useState} from 'react';
//shouldComponentUpdate -- 바뀌는게 없으면 렌뎌링 안되도록 해주는게 필요함!

const Try = memo(({tryInfo}) => { //props는 많이 rendering이 되기 때문에 에러가 날 가능성이 많은 곳임!
    //const일 경우에는 memo가 있음!!!!
    //tryInfo.try = 'hello'; 이렇게 props는 자식이 바꾸면 안됨. (부모가 바꿔야함)
    //바꿔야할때는!!
    //const [result, setResult] = useState(tryInfo.result); //이렇게 props를 state로 바꾼다음에 setResult를 사용하면 됨 (부모에게 영향을 미치지 않음)
    //const onClick = () => {
    //  setResult('1');
    //}
    return (
        <li> {/** 한 component에서 다른 component로 옮길때, props를 사용 */}
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});

// class Try extends PureComponent { //PureComponent는 잘게 쪼개질수록 유용함.. 점점 복잡해지면 안먹을 수도 있음
        // state = { //이런식으로 부모로 받은 porps를 state로 만들면됨
        //     result : this.props.result,
        //     try : this.props.try
        // }
        /**
         * constructor (props) {
         *  super(props);
         *  //다른동작 추가 가능 or console로그 찍을 수 있음(함수라서)
         *  this.state = {
         *      result : '1',
         *      try : this.props.try
         *  }
         * }
         */
//     render() {
//         return (
//             <li> {/** 한 component에서 다른 component로 옮길때, props를 사용 */}
//                 <div>{this.props.tryInfo.try}</div>
//                 <div>{this.props.tryInfo.result}</div>
//             </li>
//         )
//     }
// }

export default Try;