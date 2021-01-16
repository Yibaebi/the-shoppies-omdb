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
      Nominations: [],
    };
    this.tabIndex = React.createRef();
  }

  componentDidMount() {
    const NominationList = JSON.parse(
      localStorage.getItem("shopify-movies-app")
    );

    this.setState({
      Nominations: NominationList,
    });

    this.handleSearchSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(
        `https://www.omdbapi.com/?s=rangers&apikey=d2850ca8`
      );
      const responseJSON = await response.json();
      const MoviesList = responseJSON.Search;

      // ${this.state.searchQuery}

      MoviesList.forEach(function (movie) {
        movie.nominated = false;
        movie.label = "Nominate";
      });

      this.setState({
        Movies: MoviesList,
      });
    };
  }

  handleSelect = (index) => {
    this.setState({ selectedIndex: index });
  };

  handleButtonClick = () => {
    this.setState({ selectedIndex: 0 });
  };

  saveToLocalStorage = (list) => {
    localStorage.setItem("shopify-movies-app", JSON.stringify(list));
  };

  handleNomination = (e, movie) => {
    const Movies = this.state.Movies.map((movieItem) => {
      if (movie.imdbID === movieItem.imdbID) {
        movieItem.nominated = true;
        movieItem.label = "Nominated";
      }

      return movieItem;
    });
    this.setState({
      Movies: Movies,
    });

    const NominationList = [...this.state.Nominations, movie];
    this.setState({
      Nominations: NominationList,
    });

    this.saveToLocalStorage(NominationList);
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
              <MovieList
                Movies={this.state.Movies}
                onNominate={this.handleNomination}
              />
            </TabPanel>
            <TabPanel>
              <NominationList Nominations={this.state.Nominations} />
            </TabPanel>
          </main>
        </Tabs>
      </div>
    );
  }
}

export default App;
