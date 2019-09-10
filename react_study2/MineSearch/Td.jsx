import React, {useContext, useCallback, memo, useMemo} from 'react'
import { CODE, OPEN_CELL,CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL :
        case CODE.MINE :
            return {
                background : '#444',
            }
        case CODE.CLICKED_MINE :
        case CODE.OPENED :
            return {
                background : 'white',
            }
        case CODE.QUESTION :
        case CODE.QUESTION_MINE :
            return {
                background : 'yellow',
            }
        case CODE.FLAG_MINE :
        case CODE.FLAG :
            return {
                background : 'red',
            }
        default : 
            return {
                background : 'white',
            }
    }
};

const getTdText = (code) => {
    switch(code) {
        case CODE.NORMAL :
            return '';
        case CODE.MINE :
            return 'X';
        case CODE.CLICKED_MINE :
            return '펑';
        case CODE.FLAG_MINE :
        case CODE.FLAG :
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION :
            return '?';
        default : {
            if (code == 0) {
                return '';
            } else {
                return code;
            }
        }
    }
};

const Td = memo(({rowIndex, cellIndex}) => {
    const {tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        console.log(halted);
        if (halted) {
            return;
        }
            switch(tableData[rowIndex][cellIndex]) {
                case CODE.OPENED :
                case CODE.FLAG_MINE :
                case CODE.FLAG :
                case CODE.QUESTION_MINE :
                case CODE.QUESTION :
                    return;
                case CODE.NORMAL :
                    dispatch({type : OPEN_CELL, row:rowIndex, cell:cellIndex});
                    return;
                case CODE.MINE :
                    dispatch({type : CLICK_MINE, row:rowIndex, cell:cellIndex});
                    return;
            }
        }, [tableData[rowIndex][cellIndex], halted]
    )

    const onRightClickTd = useCallback((e) => {//오른쪽클릭
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL :
            case CODE.MINE :
                dispatch({type : FLAG_CELL, row:rowIndex, cell:cellIndex});
                return;
            case CODE.FLAG_MINE :
            case CODE.FLAG :
                dispatch({type:QUESTION_CELL, row:rowIndex, cell:cellIndex});
                return;
            case CODE.QUESTION_MINE :
            case CODE.QUESTION :
                dispatch({type : NORMALIZE_CELL, row : rowIndex, cell : cellIndex});
                return;
            default :
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    //함수자체가 여러번 실행되도 return되는 부분은 한번만 실행됨! 
    // return useMemo(() => ( //contextAPI쓰면 실제로 rerendering이 안되도 깜박일수 있음(react 부하 보면..!)
    //     <td style={getTdStyle(tableData[rowIndex][cellIndex])}
    //         onClick={onClickTd}
    //         onContextMenu={onRightClickTd}
    //     >
    //         {getTdText(tableData[rowIndex][cellIndex])}
    //     </td>
    //  ));
    return <RealTd onClickTd={onClickTd} onRightClickTd = {onRightClickTd} data={tableData[rowIndex][cellIndex]}></RealTd>
});

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
    return (
        <td style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(data)}
        </td>
    )
})
export default Td;