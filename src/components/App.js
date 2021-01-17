import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import "./App.css";
import MovieList from "./Movie-List/MovieList";
import SearchBar from "./Search-Bar/SearchBar";
import NominationList from "./Nomination-List/NominationList";
import Loader from "../utilities/loaders/loaders";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      active1: "tabs-item active",
      active2: "tabs-item",
      searchQuery: "",
      Movies: [],
      Nominations: [],
      searchIcon: <i className="fa fa-search"></i>,
    };
    this.tabIndex = React.createRef();
  }

  componentDidMount() {
    const storedNominations = JSON.parse(
      localStorage.getItem("shopify-movie-app")
    );

    if (storedNominations !== null) {
      this.setState({
        Nominations: storedNominations,
        active1: "tabs-item active",
      });
    }

    this.handleSearchSubmit = async (e) => {
      e.preventDefault();

      this.setState({
        searchIcon: <Loader />,
        selectedIndex: 0,
      });

      const response = await fetch(
        `https://www.omdbapi.com/?s=${this.state.searchQuery}&apikey=d2850ca8`
      );
      const responseJSON = await response.json();
      const MoviesList = responseJSON.Search;

      if (MoviesList.length) {
        this.setState({
          searchIcon: <i className="fa fa-search"></i>,
        });
      }

      MoviesList.forEach(function (movie) {
        movie.nominated = false;
        movie.label = "Nominate";
      });

      titlesAreSame(MoviesList, this.state.Nominations);

      if (this.state.Nominations.length >= 5) {
        MoviesList.map((movie) => (movie.nominated = true));
      }

      this.setState({
        Movies: MoviesList,
      });
    };
  }

  handleSelect = (index) => {
    this.setState({ selectedIndex: index });
  };

  saveToLocalStorage = (list) => {
    localStorage.setItem("shopify-movie-app", JSON.stringify(list));
  };

  handleNomination = (e, movie) => {
    const Movies = this.state.Movies;
    Movies.map((movieItem) => {
      if (movie.imdbID === movieItem.imdbID) {
        movieItem.nominated = true;
        movieItem.label = "Nominated";
      }
      return movieItem;
    });

    const NominationList = [...this.state.Nominations, movie];
    if (NominationList.length >= 5) {
      const newMovies = this.state.Movies.map(
        (movie) => (movie.nominated = true)
      );

      this.setState({
        Movies: newMovies,
      });
    }

    this.setState({
      Nominations: NominationList,
      Movies: Movies,
    });

    this.saveToLocalStorage(NominationList);
  };

  handleTabActiveness = (e) => {
    if (e.target.tabIndex === 1) {
      this.setState({
        active1: "tabs-item active",
        active2: "tabs-item",
      });
    } else if (e.target.tabIndex === 2) {
      this.setState({
        active1: "tabs-item",
        active2: "tabs-item active",
      });
    }
  };

  //Function to remove nominations from list
  removeNomination = (e, nominated) => {
    const newNominationList = this.state.Nominations;
    const newNominations = newNominationList.filter(
      (nomination) => nomination.Title !== nominated.Title
    );

    let updateMoviesList = this.state.Movies;

    updateMoviesList.map((movieItem) => {
      if (nominated.imdbID === movieItem.imdbID) {
        movieItem.nominated = false;
        movieItem.label = "Nominate";
      }
      return movieItem;
    });

    updateMoviesList = restoreNominationStatus(
      updateMoviesList,
      newNominations
    );
    this.saveToLocalStorage(newNominations);

    this.setState({
      Nominations: newNominations,
      Movies: updateMoviesList,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="hero">
            <h1>
              <i className="fab fa-shopify"></i> The <span>Shopp</span>ies
            </h1>
            <p>"Movie awards for entrepreneurs"</p>
            <div className="ripple-background">
              <div className="circle xxlarge shade1"></div>
              <div className="circle xlarge shade2"></div>
            </div>
            <SearchBar
              value={this.state.searchQuery}
              onSubmit={(e) => this.handleSearchSubmit(e)}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
              searchIcon={this.state.searchIcon}
            ></SearchBar>
          </div>
        </header>

        <Tabs
          selectedIndex={this.state.selectedIndex}
          onSelect={this.handleSelect}
        >
          <TabList className="tabs-container">
            <Tab
              className={`${this.state.active1}`}
              onClick={this.handleTabActiveness}
              tabIndex="1"
              onSelect={this.handleSelect}
            >
              Movies
            </Tab>
            <Tab
              className={`${this.state.active2}`}
              onClick={this.handleTabActiveness}
              tabIndex="2"
              onSelect={this.handleSelect}
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
              <NominationList
                Nominations={this.state.Nominations}
                removeNomination={this.removeNomination}
              />
            </TabPanel>
          </main>
        </Tabs>
      </div>
    );
  }
}

const titlesAreSame = (moviesList, nominationList) => {
  for (let nominated in nominationList) {
    for (let Title in moviesList) {
      if (moviesList[Title].Title === nominationList[nominated].Title) {
        moviesList[Title].nominated = true;
        moviesList[Title].label = "Nominated";
      }
    }
  }
};

const restoreNominationStatus = (moviesList, nominationList) => {
  for (let nomination in nominationList) {
    for (let Title in moviesList) {
      if (moviesList[Title].label === "Nominated") {
        continue;
      } else if (moviesList[Title].label === "Nominate") {
        moviesList[Title].nominated = false;
        moviesList[Title].label = "Nominate";
      }
    }
  }
  return moviesList;
};

export default App;
