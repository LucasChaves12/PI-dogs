import React from "react";
import styles from './Pagination.module.css'

const Paginado = ({dogsPerPage, allDogs, paginado}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav className={styles.nav}>
        <ul className={styles.page}>
            {pageNumbers &&
            pageNumbers.map(number=> (
           <li className={styles.number} key={number}>
                 <p className={styles.container} onClick={() => paginado(number)}>{number}</p>
             </li>
            ))}
        </ul>
    </nav>
    )

}

export default Paginado