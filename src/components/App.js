import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import "./App.css";
import MovieList from "./Movie-List/MovieList";
import SearchBar from "./Search-Bar/SearchBar";
import NominationList from "./Nomination-List/NominationList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      active: "active",
    };
    this.tabIndex = React.createRef();
  }

  handleSelect = (index) => {
    this.setState({ selectedIndex: index });
  };

  handleButtonClick = () => {
    this.setState({ selectedIndex: 0 });
  };

  handleClick = () => {};
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Shoppies</h1>
          <SearchBar />
        </header>

        <Tabs
          selectedIndex={this.state.selectedIndex}
          onSelect={this.handleSelect}
        >
          <TabList className="tabs-container">
            <Tab
              className={`tabs-item ${this.state.active}`}
              onClick={this.handleClick}
            >
              Movies
            </Tab>
            <Tab
              className={`tabs-item ${this.state.active}`}
              onClick={this.handleClick}
              tabIndex="2"
            >
              Nominations
            </Tab>
          </TabList>
          <main className="main-container">
            <TabPanel>
              <MovieList />
            </TabPanel>
            <TabPanel>
              <NominationList />
            </TabPanel>
          </main>
        </Tabs>
      </div>
    );
  }
}

export default App;
