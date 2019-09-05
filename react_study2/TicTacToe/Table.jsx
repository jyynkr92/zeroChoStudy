import React from 'react';
import Tr from './Tr';

const Table = ({onClick, tableData, dispatch}) => {
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => (<Tr key={'table_' + i} rowIndex={i} dispatch={dispatch} rowData={tableData[i]}/>))}
            </tbody>
        </table>
    )
}


export default Table;