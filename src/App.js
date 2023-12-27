import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Title />
      <Boxes tempMovieData={tempMovieData} />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="nav-container">
      <div className="logo">LOGO</div>
      <input type="text" placeholder="Search..." />
      <div>
        <p>X Result</p>
      </div>
    </nav>
  );
}
function Title() {
  return (
    <div className="title-container">
      <h1>Neel's Movie Finder</h1>
    </div>
  );
}

function Boxes({ tempMovieData }) {
  return (
    <div className="boxes">
      <LeftBox tempMovieData={tempMovieData} />
      <RightBox />
    </div>
  );
}

//This is box where all the Movie query displays
function LeftBox({ tempMovieData }) {
  const [btnState, setBtnState] = useState("+");

  return (
    <div className="box l-box">
      <div className="btn-container">
        <button
          className="btn-toggle"
          onClick={() => setBtnState(btnState === "+" ? "－" : "+")}
        >
          {btnState}
        </button>
      </div>
      {btnState === "－" ? (
        <div className="movie-list-container">
          <MovieList tempMovieData={tempMovieData} />
        </div>
      ) : null}
    </div>
  );
}

//Movie list----Contais all movies
function MovieList({ tempMovieData }) {
  return (
    <div className="movie-list">
      <ul>
        {tempMovieData.map((movie) => (
          <Movie movie={movie} />
        ))}
      </ul>
    </div>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} />
    </li>
  );
}

function RightBox() {
  const [btnState, setBtnState] = useState("+");

  return (
    <div className="box r-box">
      {/* <button
        className="btn-toggle"
        onClick={() => setBtnState(btnState === "+" ? "－" : "+")}
      >
        {btnState}
      </button> */}
      <div className="movie-details">
        <img src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" />
        <p>Description</p>
      </div>
      <div className="watch-list">Watch List</div>
    </div>
  );
}
