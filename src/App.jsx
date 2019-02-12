import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { KendoGridContainer } from "./components/KendoGridContainer";
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `bearer 70efe880dfeaf75ce708fd99d14f3c786357f831`
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