import { useEffect, useState } from "react";

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
  {
    imdbID: "tt1375666a",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093v",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668g",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const KEY = "2a96f788";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const temQuery = "";

  useEffect(
    function () {
      async function fetchMovies() {
        setIsLoading(true);

        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          //Here we are checking for errors. Checking response code "okay"
          if (!res.ok)
            throw new Error("Something Went Worng with Loading Movies.");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          // console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
          setError("");
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  console.log(movies);
  return (
    <div className="App">
      <NavBar query={query} setQuery={setQuery} />
      <Title />
      <Boxes
        tempMovieData={tempMovieData}
        movies={movies}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

function NavBar({ query, setQuery }) {
  return (
    <nav className="nav-container">
      <div className="logo">LOGO</div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setQuery(e.target.value);
          // console.log(query);
        }}
        value={query}
      />
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

function Boxes({ tempMovieData, movies, isLoading, setIsLoading, error }) {
  const [currentMovieTitle, setCurrentMovieTitle] = useState(null);
  const [currentMovieImg, setCurrentMovieImg] = useState(null);
  return (
    <div className="boxes">
      <LeftBox
        tempMovieData={tempMovieData}
        setCurrentMovieTitle={setCurrentMovieTitle}
        setCurrentMovieImg={setCurrentMovieImg}
        movies={movies}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
      />
      <RightBox
        currentMovieTitle={currentMovieTitle}
        currentMovieImg={currentMovieImg}
      />
    </div>
  );
}

//This is box where all the Movie query displays
function LeftBox({
  tempMovieData,
  setCurrentMovieTitle,
  setCurrentMovieImg,
  movies,
  isLoading,
  error,
}) {
  const [btnState, setBtnState] = useState("－");

  return (
    <div className="box l-box">
      <div className="btn-container">
        <button
          className="btn-toggle"
          onClick={() => setBtnState(btnState === "－" ? "+" : "－")}
        >
          {btnState}
        </button>
      </div>
      {btnState === "－" ? (
        <div className="movie-list-container">
          {/* IF currently loading but there is no error, there will be a data that will be show up */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              tempMovieData={tempMovieData}
              setCurrentMovieTitle={setCurrentMovieTitle}
              setCurrentMovieImg={setCurrentMovieImg}
              movies={movies}
            />
          )}
          {error && <ErrorMessage error={error} />}
          {/* {isLoading === true ? (
            <Loader />
          ) : (
            <MovieList
              tempMovieData={tempMovieData}
              setCurrentMovieTitle={setCurrentMovieTitle}
              setCurrentMovieImg={setCurrentMovieImg}
              movies={movies}
            />
          )} */}
        </div>
      ) : null}
    </div>
  );
}
function Loader() {
  return <h1 className="loading-text">Loading Movie Data...</h1>;
}
function ErrorMessage({ error }) {
  return <h1 className="error-text">⛔️ {error} ⛔️</h1>;
}

//Movie list----Contais all movies
function MovieList({
  tempMovieData,
  setCurrentMovieTitle,
  setCurrentMovieImg,
  movies,
}) {
  return (
    <ul>
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setCurrentMovieTitle={setCurrentMovieTitle}
          setCurrentMovieImg={setCurrentMovieImg}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, setCurrentMovieTitle, setCurrentMovieImg }) {
  return (
    <div
      className="li-container"
      onClick={() => {
        setCurrentMovieTitle(movie.Title);
        setCurrentMovieImg(movie.Poster);
      }}
    >
      <li className="li-movie">
        <div>
          <img className="li-movie_img" src={movie.Poster} alt={movie.imdbID} />
        </div>
        <div className="li-movie_details">
          <h2 className="li-movie-title">{movie.Title}</h2>
          <p className="li-movie-year">{movie.Year}</p>
        </div>
      </li>

      <button className="btn-add-watch">Add</button>
    </div>
  );
}

function RightBox({ currentMovieTitle, currentMovieImg }) {
  return (
    <div className="box r-box">
      <SelectedMovieDetails
        currentMovieTitle={currentMovieTitle}
        currentMovieImg={currentMovieImg}
      />
      <WatchList
        currentMovieTitle={currentMovieTitle}
        currentMovieImg={currentMovieImg}
      />
    </div>
  );
}

function SelectedMovieDetails({ currentMovieTitle, currentMovieImg }) {
  return (
    <div className="movie-details">
      {currentMovieTitle ? (
        <>
          <img src={currentMovieImg} alt="Img" />
          <p>{currentMovieTitle}</p>
        </>
      ) : (
        <h1>No Movie Selected</h1>
      )}
    </div>
  );
}
function WatchList({ currentMovieTitle, currentMovieImg }) {
  return (
    <div className="watch-list">
      <h2>Movies You Want To Watch</h2>
    </div>
  );
}
