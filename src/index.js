import React, {Component} from "react";
import ReactDOM from "react-dom";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

// fake data generator
const greek =
    "ὥστε ἀγαπητοί μου καθὼς πάντοτε ὑπηκούσατε μὴ ὡς ἐν τῇ παρουσίᾳ μου μόνον ἀλλὰ νῦν πολλῷ μᾶλλον ἐν τῇ ἀπουσίᾳ μου μετὰ φόβου καὶ τρόμου τὴν ἑαυτῶν σωτηρίαν κατεργάζεσθε";
const greekWords = greek.split(/ +/);
const getItems = (count) =>
    greekWords.map((w, n) => ({
        id: `item-${n}`,
        content: w
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 3;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: grid,
    overflow: "auto"
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArrays: [getItems(15)]
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result, n) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newItems = reorder(
            this.state.itemArrays[n],
            result.source.index,
            result.destination.index
        );

        const newItemArrays = [...this.state.itemArrays];
        newItemArrays[n] = newItems;
        this.setState({
            itemArrays: newItemArrays
        });
    }

    handleDoubleClick(item, rowN, colN) {
        let newItemArrays = [...this.state.itemArrays];
        if (colN === newItemArrays[rowN].length - 1) { // last col in row
            return;
        }
        if (colN === 0 && rowN === 0) { // first col in first row
            return;
        }
        if (colN === 0) { // merge with previous row
            newItemArrays[rowN - 1] = [...newItemArrays[rowN - 1], ...newItemArrays[rowN]];
            newItemArrays[rowN] = [];
            newItemArrays = newItemArrays.filter(a => a.length);
        } else { // Make new row
            newItemArrays = [
                ...newItemArrays.slice(0, rowN),
                newItemArrays[rowN].slice(0, colN),
                newItemArrays[rowN].slice(colN),
                ...newItemArrays.slice(rowN + 1),
            ];
        }
        this.setState({itemArrays: newItemArrays});
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <>
                <h1>Juxtalinear Organizer PoC</h1>
                <ul>
                    <li>Drag 'n' drop within a row</li>
                    <li>Double-click on an item makes a new row starting with that item</li>
                    <li>Double-click on first item to merge with previous row</li>
                </ul>
                {
                    this.state.itemArrays.map((items, n) =>
                        <DragDropContext key={n} onDragEnd={(result) => this.onDragEnd(result, n)}>
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        onClick={event => event.detail === 2 && this.handleDoubleClick(item, n, index)}
                                                    >
                                                        {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )
                }
            </>
        );
    }
}

// Put the thing into the DOM!
ReactDOM.render(<App/>, document.getElementById("root"));
