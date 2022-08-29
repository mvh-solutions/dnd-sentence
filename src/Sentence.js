import update from 'immutability-helper'
import {useCallback, useState} from 'react'
import {Clause} from './Clause.js'
import testData from './testData';

const style = {
    padding: "10px",
    paddingBottom: "15px",
    border: "1px solid black"
}
export const Sentence = () => {
    const [clauses, setClauses] = useState([...testData]);
    const moveClause = useCallback((dragIndex, hoverIndex) => {
        setClauses((prevClauses) =>
            update(prevClauses, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevClauses[dragIndex]],
                ],
            }),
        )
    }, [])
    const renderClause = useCallback((clause, index) => {
        return (
            <Clause
                key={clause.id}
                index={index}
                clauseData={clause}
                moveClause={moveClause}
            />
        )
    }, [moveClause])
    const saveSentence = () => {
        console.log(clauses.map(c => `<${c}>`).join(' '))
    }
    return (
        <>
            <div
                style={style}
            >
                {
                    clauses.map(
                        (clause, i) => renderClause(clause, i)
                    )
                }
            </div>
            <button
                onClick={() => saveSentence()}
                style={{marginTop: "1em"}}
            >
                Save
            </button>
        </>
    )
}
