import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getDogs, filterCreated } from "../../Redux/actions";
import { getTemperaments, filterDogsByTemperaments } from "../../Redux/actions"
import SearchBar from "../Searchbar";
import styles from './Nav.module.css'

const NavBar = () => {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const temperaments = useSelector((state) => state.temperaments)

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    },[])

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getDogs())
    }

    const handleFilterTemperament = (e) => {
        dispatch(filterDogsByTemperaments(e.target.value))
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    }

    return(
        <header>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.items}>
            <NavLink className={styles.home} exact to="/">
              <button className={styles.buttonnew}>Landing page</button>
            </NavLink>
        <div className={styles.container}>
            <h1 className={styles.title}>DogeWorld!</h1>
            <div className={styles.filtros_search}>
            <div className={styles.select_button}>
              <div className={styles.filters}>
                <div>
                  <label className={styles.label}>
                    Temperamentos
                  </label>
                  <select className={styles.select}
                    onChange={(e) => handleFilterTemperament(e)}
                    >
                    {temperaments.map((temp) => (
                      <option value={temp.name} key={temp.id}>
                        {temp.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label  className={styles.label}>
                    Api o DB
                  </label>
                  <select className={styles.select}
                    onChange={(e) => handleFilterCreated(e)}
                  >
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                  </select>
                </div>
              </div>
              <button className={styles.button}
                onClick={(e) => {
                  handleClick(e);
                }}
                >
                Re-load
              </button>
              </div>
            <SearchBar />
            </div>
            </div>
            <Link className={styles.newdog} to="/dogs">
                <button className={styles.buttonnew} >Crea tu perro!</button>
            </Link>
            <Link className={styles.newdog} to="/quiz">
                <button className={styles.buttonnew} >Quiz!</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    )
}

export default NavBar