import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Title from "./components/Title";


export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
        // tempMovieData={tempMovieData}
        movies={movies}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

function Boxes({ tempMovieData, movies, isLoading, setIsLoading, error }) {
  const [currentMovieTitle, setCurrentMovieTitle] = useState(null);
  const [currentMovieImg, setCurrentMovieImg] = useState(null);
  const [selectedMovieID, setSelectedMovieID] = useState("");

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
        setSelectedMovieID={setSelectedMovieID}
      />
      <RightBox
        currentMovieTitle={currentMovieTitle}
        currentMovieImg={currentMovieImg}
        selectedMovieID={selectedMovieID}
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
  setSelectedMovieID,
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
              setSelectedMovieID={setSelectedMovieID}
            />
          )}
          {error && <ErrorMessage error={error} />}
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
  setSelectedMovieID,
}) {
  return (
    <ul>
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedMovieID={setSelectedMovieID}
          setCurrentMovieTitle={setCurrentMovieTitle}
          setCurrentMovieImg={setCurrentMovieImg}
        />
      ))}
    </ul>
  );
}

function Movie({
  movie,
  setCurrentMovieTitle,
  setCurrentMovieImg,
  setSelectedMovieID,
}) {
  return (
    <div
      className="li-container"
      onClick={() => {
        setCurrentMovieTitle(movie.Title);
        setCurrentMovieImg(movie.Poster);
        setSelectedMovieID(movie.imdbID);
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

function RightBox({ currentMovieTitle, currentMovieImg, selectedMovieID }) {
  return (
    <div className="box r-box">
      <SelectedMovieDetails
        currentMovieTitle={currentMovieTitle}
        currentMovieImg={currentMovieImg}
        selectedMovieID={selectedMovieID}
      />
      <WatchList
        currentMovieTitle={currentMovieTitle}
        currentMovieImg={currentMovieImg}
      />
    </div>
  );
}

function SelectedMovieDetails({ selectedMovieID }) {
  console.log(selectedMovieID);
  // `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
  const [selectedMovieImg, setSelectedMovieImg] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [selectedMovieYear, setSelectedMovieYear] = useState("");
  const [selectedMovieGenre, setSelectedMovieGenre] = useState("");
  const [selectedMoviePlot, setSelectedMoviePlot] = useState("");

  const [selectedMovieTime, setSelectedMovieTime] = useState("");
  const [selectedMovieLang, setSelectedMovieLang] = useState("");
  const [selectedMovieRate, setSelectedMovieRate] = useState("");
  useEffect(
    function () {
      async function fetchMovies() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieID}`
        );
        const data = await res.json();
        console.log(data);
        setSelectedMovieImg(data.Poster);
        setSelectedMovieTitle(data.Title);
        setSelectedMovieYear(data.Year);
        setSelectedMovieGenre(data.Genre);
        setSelectedMoviePlot(data.Plot);
        setSelectedMovieTime(data.Runtime);
        setSelectedMovieLang(data.Language);
        setSelectedMovieRate(data.imdbRating);
      }
      fetchMovies();
    },
    [selectedMovieID]
  );

  return (
    <div className="movie-details">
      {selectedMovieTitle ? (
        <>
          <img src={selectedMovieImg} alt="Img" />
          <div className="movie-details_texts">
            <div>
              <p className="text-movie-name">Title: {selectedMovieTitle}</p>
              <p className="text-movie-year">Year: {selectedMovieYear}</p>
            </div>
            <p className="text-movie-genre">Genre: {selectedMovieGenre}</p>
            <p className="text-movie-des">Story: {selectedMoviePlot}</p>
            <div className="text-movie-small_details">
              <p>⏳ {selectedMovieTime}</p>
              <p>{selectedMovieLang}</p>
              <p>⭐️ {selectedMovieRate} / 10</p>
            </div>
          </div>
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
