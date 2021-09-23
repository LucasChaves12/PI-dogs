import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs, advancedSearch } from "../../Redux/actions";
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    dispatch(advancedSearch(e.target.value))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(getNameDogs(name));
      setName("");
    } else {
      alert("Ingresa un nombre para buscar");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchbar}>
          <input
            className={styles.input}
            type="text"
            placeholder="Buscar perro"
            onChange={(e) => handleInputChange(e)}
            value={name}
          />
          <br/>
          <button className={styles.button} type="submit" onClick={handleSubmit}>
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
