const style = {
    marginRight: "5px",
    padding: "5px",
    backgroundColor: '#666',
    color: "#FFF",
    cursor: 'move',
}
const Word = ({wordData}) => {
    return <span style={style}>{wordData.text}</span>
}

export default Word;
