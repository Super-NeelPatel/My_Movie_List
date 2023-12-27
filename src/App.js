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
  const [currentMovieTitle, setCurrentMovieTitle] = useState(null);
  const [currentMovieImg, setCurrentMovieImg] = useState(null);
  return (
    <div className="boxes">
      <LeftBox
        tempMovieData={tempMovieData}
        setCurrentMovieTitle={setCurrentMovieTitle}
        setCurrentMovieImg={setCurrentMovieImg}
      />
      <RightBox
        currentMovieTitle={currentMovieTitle}
        currentMovieImg={currentMovieImg}
      />
    </div>
  );
}

//This is box where all the Movie query displays
function LeftBox({ tempMovieData, setCurrentMovieTitle, setCurrentMovieImg }) {
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
          <MovieList
            tempMovieData={tempMovieData}
            setCurrentMovieTitle={setCurrentMovieTitle}
            setCurrentMovieImg={setCurrentMovieImg}
          />
        </div>
      ) : null}
    </div>
  );
}

//Movie list----Contais all movies
function MovieList({
  tempMovieData,
  setCurrentMovieTitle,
  setCurrentMovieImg,
}) {
  return (
    <ul>
      {tempMovieData.map((movie) => (
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
