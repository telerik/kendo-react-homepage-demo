import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { KendoGridContainer } from "./components/KendoGridContainer";
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';

const FIRST = '45d4fb1c20';
const SECOND = 'd4899858acd89f0';
const THIRD = '8b673fdefda51d2';

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `bearer ${FIRST}${SECOND}${THIRD}`
      }
    });
  }
});

class App extends Component {
  state = {
    selected: 0
  }

  handleSelect = (e) => {
    this.setState({ selected: e.selected })
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <h1 className="demo-heading">Github Issues</h1>
        <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>
          <TabStripTab title="KendoReact">
            <KendoGridContainer repo="kendo" />
          </TabStripTab>
          <TabStripTab title="React">
            <KendoGridContainer repo="react" />
          </TabStripTab>
        </TabStrip>
      </ApolloProvider>
    );
  }
}

export default App;