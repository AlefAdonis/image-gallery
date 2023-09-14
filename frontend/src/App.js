import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";

const App = () => {
  const [wordSearch, setWordSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(wordSearch);
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
