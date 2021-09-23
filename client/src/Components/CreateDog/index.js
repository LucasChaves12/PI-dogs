import React, { useState, useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments,} from '../../Redux/actions'
import { postDogs } from '../../Redux/actions';
import styles from './CreateDog.module.css'

const DogCreate = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)

    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: [],
        img: ''
    })

    
    const handleOnChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }


    const handleSelect = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, (e.target.value)]
        })
    }

    const handleDelete =(el) =>{
        setInput({
            ...input,
            temperament: input.temperament.filter(e=> e !== el)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input.name !== '' && input.height !== '' && input.weight !== '' && input.life_span !== '' && input.temperament.length !== 0){
        dispatch(postDogs(input))
        setInput({
            name:'',
            height: '',
            weight: '',
            life_span: '',
            temperament: [],
            img: ''
        })
        history.push('/home')
        }else{
            alert('Debe completar todos los campos')
        }
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    return(
        <div>
        <NavLink className={styles.navLink} to = '/home'>
        <button className={styles.button}>Volver</button>
        </NavLink>
        <h1 className={styles.text}>Crea tu nuevo perro!!</h1>
        <form className={styles.form} onSubmit ={(e) =>handleSubmit(e)}>
            <div>
                <label>Nombre</label>
                <input autoComplete='off' className={styles.input} type='text' value ={input.name} name='name' id='name' placeholder='Name' onInput={(e) => handleOnChange(e)} />
            </div>
            <div>
                <label className={styles.labelTemperament}>Selecciona temperamentos</label>
                <select className={styles.select} onChange ={(e) => handleSelect(e)}>
                    {temperaments && temperaments.map((temp) => (
                        <option value = {temp.name} key= {temp.id}>{temp.name}</option>
                    ))}
                </select>
                <ul className={styles.ul}><li className= {styles.lista}>{input.temperament.map(el=> <button type='button' key={el.id} onClick={()=>handleDelete(el)}>{el}</button>)}</li></ul>
            </div>
            <div>
                <label>Tamaño en cm</label>
                <input autoComplete='off' className={styles.input} type="text" value={input.height} name='height' id='height'  placeholder="Size" onChange={(e)=>handleOnChange(e)}/>
            </div>
            <div>
                <label>Peso en kg</label>
                <input autoComplete='off' className={styles.input} type="text" value={input.weight} name='weight' id='weight' placeholder="Weight" onChange={(e)=>handleOnChange(e)} />
            </div>
            <div>
                <label>Tiempo de vida</label>
                <input autoComplete='off' className={styles.input} type="text" value={input.life_span} name='life_span' id='life_span' placeholder="LifeSpan" onChange={(e)=>handleOnChange(e)} />
            </div>
            <div>
                <label>Imagen</label>
                <input autoComplete='off' className={styles.inputImg} type = 'text' value={input.img} name='img' placeholder='Sube la foto del perro!' onChange={(e)=>handleOnChange(e)} />
            </div>
                {input.img ? <img className={styles.img} src={input.img} alt="img not found" /> : ""}
                    <button className={styles.button} type='submit'>Crear Nuevo Perrito</button>
        </form>
        </div>
    )

}

export default DogCreate