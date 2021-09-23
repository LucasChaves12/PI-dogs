import React from 'react'
import styles from './Card.module.css'

const DogCard = ({name, img, temperaments, origin}) => {
    return (
        <div>
            <h3 className={styles.dogTitle}>{name}</h3>
            <img className={styles.dogImage} src ={img} alt =''/>
            <h5 className={styles.dogTemperament}>{temperaments}</h5>
            <h3>{origin}</h3>
        </div>
    )
}

export default DogCard