import React from 'react';

const Try = ({tryInfo}) => {
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