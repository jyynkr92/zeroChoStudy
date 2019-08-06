import React from 'react';
//shouldComponentUpdate -- 바뀌는게 없으면 렌뎌링 안되도록 해주는게 필요함!

const Try = ({tryInfo}) => { //props는 많이 rendering이 되기 때문에 에러가 날 가능성이 많은 곳임!
    return (
        <li> {/** 한 component에서 다른 component로 옮길때, props를 사용 */}
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}
// class Try extends Component {
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