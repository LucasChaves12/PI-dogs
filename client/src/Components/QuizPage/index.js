import React, {useState, useEffect} from 'react'
import Quiz from '../Quiz'
import Results from '../Results'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from "../Nav/index.js";
import axios from 'axios'
import {NavLink} from 'react-router-dom';
import style from './QuizPage.module.css'
import { getDogs } from '../../Redux/actions';
const QuizPage = () => {
    const [testSet, setTestSet] = useState([])
    const [correct, setCorrect] = useState(0)
    const [wrong, setWrong] = useState(0)
    const [spinner, setSpinner] = useState(false)
    const [done, setDone] = useState(false)
    const [selected10, setSelected10] = useState([])
    const [restart, setRestart] = useState(false)
    const [dogSet, setDogSet] = useState([])
    const [gotImages, setGotImages] = useState(false)
    
    const allDogs = useSelector((state)=> state.dogs)
    const dispatch = useDispatch()
    useEffect(() => {
      getDogSet()
      newGame()
      dispatch(getDogs)
    }, []);

    const getRandomInt =(max) =>{
        return Math.floor(Math.random() * Math.floor(max))
      }
    
  
  
    useEffect(() => {
      if (dogSet.length > 1) {
        getImageRequests(dogSet)
      }
    }, [dogSet]);
  
    //Hago request para cambiar los datos de los perros para incluir la imagen
     const getImageRequests = (array) => {
    const requests = array.map((dog) => {
      return getImage(dog);
    });
    Promise.all(requests).then((request) => {
      for (var i = 0; i < request.length; i++) {
        let obj = {
          id: array[i].id,
          name: array[i].name,
          url: request[i],
        };
        array[i] = obj;
      }
      setGotImages(true);
    });
  };
  
    
    useEffect(() => {
      if (gotImages) {
        makeTestSet()
      }
    }, [gotImages])
  
    //Traigo la info de los perros y la guardo
    const getDogSet = () => {
       let copy =  allDogs.slice()
       setDogSet(copy)
    };
  

    
    //Eligo 10 perros y 4 respuestas
    const makeTestSet = () => {
      let randomDog
      let theFourChoices = []
      let questionsSet = []
      let selectedDogInfo = []
      for (let i = 0; i < 10; i++) {
        theFourChoices = [];
        for (let j = 0; j < 4; j++) {
          randomDog = getRandomInt(dogSet.length)
          while (theFourChoices.includes(dogSet[randomDog])) {
            randomDog = getRandomInt(dogSet.length)
          }
          theFourChoices.push(dogSet[randomDog])
        }
        let selectedDog = theFourChoices[getRandomInt(3)]
        selectedDogInfo.push(selectedDog)
        questionsSet.push(theFourChoices)
      }
      setTestSet(questionsSet)
      setSelected10(selectedDogInfo)
    };
  
    const newGame = () => {
      setCorrect(0)
      setWrong(0)
      setDone(false)
      setRestart(false)
    }
    const handleValue = (answer, choice) => {
      if (answer === choice) {
        setCorrect(correct + 1)
      } else {
        setWrong(wrong + 1)
      }
      setDone(true)
    }

    const getImage = async (info) => {
      let result = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${info.id}`)
      return result.data[0].url
    }
    return ( 
       
          <div>
            <NavBar/>
            <NavLink className={style.navLink} to = '/home'>
            <button className={style.button}>Volver</button>
              </NavLink>
            <Results spinner={spinner} setSpinner={setSpinner} correct={correct} />
                <Quiz
                  correct={correct}
                  wrong={wrong}
                  selected={selected10}
                  testSet={testSet}
                  handleValue={handleValue}
                  done={done}
                  setDone={setDone}
                  newGame={newGame}
                  setSpinner={setSpinner}
                  setRestart={setRestart}
                  restart={restart}
                  makeTestSet={makeTestSet}
                />
          </div>
       
      );
}

export default QuizPage