import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  const [wordSearch, setWordSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(wordSearch);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${wordSearch}&client_id=${UNSPLASH_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setWordSearch("");
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search
        word={wordSearch}
        setWord={setWordSearch}
        handleSubmit={handleSearchSubmit}
      />
    </div>
  );
};

export default App;
