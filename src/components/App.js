import React from "react";
import "./App.css";
import MovieList from "./Movie-List/MovieList";
import SearchBar from "./Search-Bar/SearchBar";
import NominationList from "./Nomination-List/NominationList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Shoppies</h1>
        <SearchBar />
      </header>
      <main className="main-container">
        <section className="container movie-list">
          <MovieList />
        </section>
        <section className="container nomination-list">
          <NominationList />
        </section>
      </main>
    </div>
  );
}

export default App;
