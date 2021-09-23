import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderByName, orderByWeight } from "../../Redux/actions";
import { getTemperaments } from "../../Redux/actions";
import { NavLink } from "react-router-dom";
import style from './Home.module.css'

import DogCard from '../Cards/index.js'
import Paginado from "../Pagination/index.js";
import NavBar from "../Nav/index.js";

const Home = () => {
    const dispatch = useDispatch()
    const allDogs = useSelector((state)=> state.dogs)
    const [orden, setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage 
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getDogs());
        dispatch(getTemperaments())
    }, [])
    
    const handleSort = (e) => {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleSortWeight = (e) => {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <div>
            <NavBar/>
            <div className={style.inputs}>
            <select className={style.select} onChange={e=> handleSort(e)}>
                    <option value='asc'>A-Z </option>
                    <option value='desc'>Z-A </option>   
                </select>

                <select className={style.select} onChange={e=> handleSortWeight(e)}>
                    <option value='weightasc'>Peso Ascendente</option>
                    <option value='weightdesc'>Peso Descendente</option>   
                </select>
            </div>
            <div className={style.dogcards}>
                <ul className={style.dogGrid}>{currentDogs?.map((el) => {
                    return (
                        <div className={style.margin}>
                            <NavLink className={style.navlink} to={`/home/${el.id}`}>
                                <DogCard img={el.img ? el.img : 'https://img.wallpapersafari.com/desktop/728/410/35/31/6GXmx5.gif' } origin={el.origin? el.origin : 'No se encontro el origen'} name={el.name} temperaments={!el.createdInDb ? el.temperament : el.temperaments.map((e) => e.name + ' ')} key={el.id} />
                            </NavLink>
                        </div>
                    )
                })}</ul>
                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado ={paginado} />
            </div>
        </div>
    )
}

export default Home