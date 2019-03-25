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
        Authorization: `bearer ${process.env.REACT_APP_API_KEY.split("").reverse().join("")}`
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
        <h1 className="demo-heading">GitHub Repos</h1>
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