const React = require('react');

class GuGuDan extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         first : Math.ceil(Math.random() * 9),
    //         second : Math.ceil(Math.random() * 9),
    //         value : '', //입력창
    //         result : '', //결과 값
    //         answer : '',
    //     };
    // }
    state = {
        first : Math.ceil(Math.random() * 9),
        second : Math.ceil(Math.random() * 9),
        value : '', //입력창
        result : '', //결과 값
     };

    onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            // this.setState({ //바꾸고 싶은 상태를 바꿔주면됨
            //     //this.state.first --- 현재의 state
            //     //setState 내부는 미래의 state
            //     result : this.state.first + ' x ' + this.state.second + ' = ' + this.state.value + ' 정답',
            //     first : Math.ceil(Math.random() * 9),
            //     second : Math.ceil(Math.random() * 9),
            //     value : '',
            // });

            //setState는 비동기임
            //같은 setState를 동시에 여러번 하면 한번만 적용될 수 있음.

            //기존값으로 새롭게 setState로 하려고 하면
            //setState 안에 함수를 사용하면됩
            this.setState((prevState) => {
                return {
                    result : '정답' + prevState.value,
                    first : Math.ceil(Math.random() * 9),
                    second : Math.ceil(Math.random() * 9),
                    value : '',
                }
            })
        } else {
            this.setState({
                result : this.state.first + ' x ' + this.state.second + ' = ' + this.state.value + ' 땡',
                value : '',
            })
        }
        
        //(ref)함수로 사용할수 있음
        this.input.focus();
    }
    
    onChange = (e) => {
        this.setState({
            value : e.target.value
        })
    }

    onRefInput = (c) => {this.input = c;}
    
    //(ref)ref에서 선언한 아이를 클래스처럼 선언해줌
    input;

    render() {
        return (
            // React.Fragment 를 사용하면 쓸 데 없는 div를 없앨 수 있음.
            // babel2를 설치하면 <> 빈태그를 사용할 수 있음
            // 함수를 따로 빼는 이유는 -> 안에다 쓰면 계속 rendering할 때, 계속 새로 생겨서 성능의 문제가 생길 수 있음.
            <>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}> {/* {} 안에는 javascript 코드를 넣을 수 있음 */}
                    <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChange}/> 
                    {/* (ref)input에다가 focus를 주고 싶을 떄 어떻게 할까? ref!!!!!!! */}
                    <button>입력!</button>    
                </form>
                <div>{this.state.answer} {this.state.result}</div>
            </>
        );
    }
}

module.exports = GuGuDan;