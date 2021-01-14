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
      searchQuery: "",
      Movies: [],
    };
    this.tabIndex = React.createRef();
  }

  componentDidMount() {
    this.handleSearchSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(
        `http://www.omdbapi.com/?s=${this.state.searchQuery}&apikey=d2850ca8&plot=full`
      );
      const responseJSON = await response.json();
      const Movies = responseJSON;

      this.setState({
        Movies: Movies.Search,
      });
    };
  }

  handleSelect = (index) => {
    this.setState({ selectedIndex: index });
  };

  handleButtonClick = () => {
    this.setState({ selectedIndex: 0 });
  };

  handleClick = () => {
    console.log();
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="ripple-background">
            <div className="circle xxlarge shade1"></div>
            <div className="circle xlarge shade2"></div>
          </div>
          <div className="hero">
            <h1>The Shoppies</h1>
            <p>Movie awards for entrepreneurs</p>
          </div>
          <SearchBar
            value={this.state.searchQuery}
            onSubmit={(e) => this.handleSearchSubmit(e)}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
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
              <MovieList Movies={this.state.Movies} />
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
