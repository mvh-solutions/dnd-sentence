import update from 'immutability-helper'
import {useCallback, useState} from 'react'
import {WordItem} from './WordItem.js'

const style = {
    padding: "10px",
    border: "1px solid black"
}
export const Sentence = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            origPos: 1,
            text: 'ὥστε',
        },
        {
            id: 2,
            origPos: 2,
            text: 'ἀγαπητοί',
        },
        {
            id: 3,
            origPos: 3,
            text: 'μου',
        },
        {
            id: 4,
            origPos: 4,
            text: 'καθὼς',
        },
        {
            id: 5,
            origPos: 5,
            text: 'πάντοτε',
        },
        {
            id: 6,
            origPos: 6,
            text: 'ὑπηκούσατε',
        },
        {
            id: 7,
            origPos: 7,
            text: 'κατεργάζεσθε',
        },
    ])
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
                origPos={card.origPos}
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
