import React, {useRef, useEffect, useMemo} from 'react';
import Td from './Td';

const Tr = ({rowData, rowIndex, dispatch}) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => //useMemo는 함수 뿐만아니라 컴포넌트도 기억해쥼!
                useMemo((<Td key={i} rowIndex={rowIndex} dispatch={dispatch} cellIndex={i} cellData={rowData[i]}/>)))}
        </tr>
    )
}


export default Tr;