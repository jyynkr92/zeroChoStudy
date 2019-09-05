import React from 'react';
import { useEffect, useState, useReducer, useCallback } from 'react';
//비동기적으로 처라할때 useEffect사룔
import Table from './Table';

/**
 * inital state는 불변 (누구도 직접 건드릴 수 없음)
 * event를 통해서 state를 변경하려면 action 을 dispatch해야함
 * action을 어떻게 처리할지는 reducer로 관리함
 * 
 */

const initialState = {
    winner : '',
    turn : 'O',
    tableData : [['','',''], ['','',''], ['','','']],
    recentCell : [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch(action.type) {
        case SET_WINNER :
            return { //state를 어떻게 바꿀지를 여기서 설정함 (바뀐 값만 바꿔줘야함  ...state라고 하면 얕은 복사가 되고, 바뀔부분만 설정해주면됨)
                ...state,
                winner : action.winner,
            }
        case CLICK_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결할 수 있음
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
                tableData,
                recentCell : [action.row, action.cell],
            }
        }

        case CHANGE_TURN : {
            return {
                ...state,
                turn : state.turn  === 'O' ? 'X' : 'O'
            }
        }

        case RESET_GAME : {
            return {
                ...state,
                turn : 'O',
                tableData : [['','',''], ['','',''], ['','','']],
                recentCell : [-1, -1],
            }
        }

        default : 
            return state;
    }
};

const TicTacToe = () => {
    //useReducer -- redux와 비슷하게 흉내낼수 있도록 하는 역할함
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, turn, winner, recentCell} = state;
    //const [winner, setWinner] = useState('');
    //const [turn, setTurn] = useState('0');
    //const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

    const onClickTable = useCallback(() => {
        //action을 dispatch할 때 reducer가 실행됨
        dispatch({type:'SET_WINNER', winner:'O'}); // action(type, winner내부)을 실행(dispatch)함
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;

        if (row < 0) {
            return;
        }

        let win = false;

        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로줄 검사
            win = true;
        }

        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로줄 검사
            win = true;
        }

        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선 \
            win = true;
        }

        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선 /
            win = true;
        }

        if (win) { //승리시
            dispatch({type : SET_WINNER, winner : turn});
            dispatch({type : RESET_GAME});
        } else {
            //무승부검사 해야함
            let all = true; // all이 true면 무승부라는 뜻
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                })
            });

            if (all) {
                dispatch({type : RESET_GAME});
            } else {
                //비동기로 되어있기 떄문에! 승리검사 하고 난 다음에 이긴사람이 없을 때 turn을 돌리도록 해야함
                dispatch({type : CHANGE_TURN});
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} dispatch={dispatch} tableData={tableData} />
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
}


export default TicTacToe;