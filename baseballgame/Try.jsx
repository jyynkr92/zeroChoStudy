import React, {Component} from 'react';

class Try extends Component {
    render() {
        return (
            <li> {/** 한 component에서 다른 component로 옮길때, props를 사용 */}
                <b>{this.props.value.fruit}</b> - {this.props.index}
                <div>컨텐츠</div>
                <div>컨텐츠1</div>
                <div>컨텐츠2</div>
                <div>컨텐츠3</div>
            </li>
        )
    }
}

export default Try;