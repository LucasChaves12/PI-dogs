import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../Redux/actions";
import styles from './DogDetail.module.css'


const Detail = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myDog = useSelector((state) => state.detail)


    return (
        <div>
            {myDog.length > 0 ?
            <div className={styles.contenedor}>
                <h1 className={styles.title}>{myDog[0].name}</h1>
                <div className={styles.container}>
                    <img className={styles.img} src ={myDog[0].img ? myDog[0].img : 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' } alt='' />
                    <div className={styles.text}>
                        <div>
                        <h2>Tamaño:</h2>
                        <p>{myDog[0].height} cm</p>
                    </div>
                    <div>
                        <h2>Peso:</h2>
                        <p>{myDog[0].weight} kg</p>
                    </div>
                    <div>
                        <h2>Esperanza de vida:</h2>
                        <p>{myDog[0].life_span}</p>
                    </div>
                    <div>
                        <h2>Temperamentos:</h2>
                        <p>{myDog[0].temperament ? myDog[0].temperament :myDog[0].temperaments.map((e) => e.name + " ")}</p>
                    </div>
                    </div>
                </div>
            </div>
        : <img src ='https://c.tenor.com/uj4Cnt7RVE0AAAAM/fatdog-dog.gif4' alt='' />}
        <Link to= '/home'><button className={styles.button}>Volver</button></Link>
        </div>
    )
}

export default Detail