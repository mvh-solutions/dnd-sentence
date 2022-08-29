import update from 'immutability-helper'
import {useCallback, useState} from 'react'
import {WordItem} from './WordItem.js'
import testData from './testData';

const style = {
    padding: "10px",
    border: "1px solid black"
}
export const Sentence = () => {
    const [cards, setCards] = useState([...testData]);
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])
    const renderCard = useCallback((card, index) => {
        return (
            <WordItem
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
                origPos={card.payload.origPos}
            />
        )
    }, [moveCard])
    const saveSentence = () => {
        console.log(cards.map(c => `<${c.text} (${c.origPos})>`).join(' '))
    }
    return (
        <>
            <div
                style={style}
            >
                {
                    cards.map(
                        (card, i) => renderCard(card, i)
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
