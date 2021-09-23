import React from "react";
import { NavLink } from "react-router-dom";
import style from './Landing.module.css'



const LandingPage = () => {
    return (
        <div>
            <div className={style.bg}>
                <div className={style.container}>
                    <h2 className={style.title}>
                        Bienvenidos a DogeWorld
                    </h2>
                    <h4 className={style.text}>
                        Esta es una pagina para ver y aprender sobre perros!
                    </h4>
                    <h4 className={style.text}>
                        Tambien podras crear tu propio perro y participar en un Quiz!
                    </h4>
                    <div>
                        <NavLink to ='/home'>
                        <button className={style.button}>INGRESAR</button>
                        </NavLink>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default LandingPage