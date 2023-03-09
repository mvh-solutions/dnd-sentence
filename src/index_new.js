import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Proskomma } from "proskomma";
import path from 'path';

class App extends Component {
    constructor(props) {
        super(props);
        // const fname = path.join("../tests/psa.usfm");
        this.state = {};
        this.pk = new Proskomma();

        // pathExists(fname)
        // .then(exists => console.log(exists)) // => false

        
        this.content = fs.readFileSync(path.resolve("../tests/psa.usfm")).toString();

        this.mutation = `mutation { addDocument(` +
        `selectors: [{key: "lang", value: "eng"}, {key: "abbr", value: "ust"}], ` +
        `contentType: "usfm", ` +
        `content: """${this.content}""") }`;
        this.queryPK = this.queryPk(this.pk, this.mutation);
    }

    async queryPk(pk, query) {
        const result = await pk.gqlQuery(query);
        this.setState({data: JSON.stringify(result, null, 2)});
    }

    render() {
        return (
            <>
                {
                    this.state.data && <MyQuery data={this.state.data}/>
                }
            </>
        );
    }
}

const MyQuery = ({data}) => (
    <tr>
        {data}
    </tr>
);

ReactDOM.render(<App/>, document.getElementById("root"));