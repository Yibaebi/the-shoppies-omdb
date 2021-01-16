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
    const storedNominations = JSON.parse(
      localStorage.getItem("shoppify-movie-app")
    );

    if (storedNominations !== null) {
      this.setState({
        Nominations: storedNominations,
      });
    }
    this.handleSearchSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(
        `https://www.omdbapi.com/?s=${this.state.searchQuery}&apikey=d2850ca8`
      );
      const responseJSON = await response.json();
      const MoviesList = responseJSON.Search;

      MoviesList.forEach(function (movie) {
        movie.nominated = false;
        movie.label = "Nominate";
      });

      TitlesAreSame(MoviesList, this.state.Nominations);

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

  handleButtonClick = () => {
    this.setState({ selectedIndex: 0 });
  };

  saveToLocalStorage = (list) => {
    localStorage.setItem("shoppify-movie-app", JSON.stringify(list));
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

const TitlesAreSame = (moviesList, nominationList) => {
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
