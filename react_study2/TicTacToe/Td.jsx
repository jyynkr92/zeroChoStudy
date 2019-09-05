import React, {useCallback, useEffect, useRef} from 'react';
import {CLICK_CELL} from './TicTacToe';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1],dispatch === ref.current[2],cellData === ref.current[3]);
        console.log(cellData, ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, idspatch, cellData]);

    const onClickTd = useCallback(() => {
        if (cellData) {
            return;
        }

        dispatch({type : CLICK_CELL, row: rowIndex, cell: cellIndex});
    }, [cellData]); //[cellData]가 바뀔 때마다 기억해놨던 함수를 새로 만들어줌

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
}


export default Td;