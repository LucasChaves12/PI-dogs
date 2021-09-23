import React, { useState, useEffect} from 'react'
import style from './Quiz.module.css'

const Quiz = ({
    correct,
    wrong,
    selected,
    testSet,
    handleValue,
    done,
    setDone,
    newGame,
    setSpinner,
    setRestart,
    restart,
    makeTestSet
}) => {
    const [currIndex, setCurrIndex] = useState(0)
    const [translateVal, setTranslateVal] = useState(0)

    let questionDiv = []

    if(selected.length) {
        for(let i = 0; i < testSet.length; i++) {
            // 4 opciones en botones
            let question = testSet[i]
            const buttonChoices = question.map((item, idx) => (
                <button
                key={idx}
                className={!done ?style.choiceButton : selected[i].name === item.name ? style.correct : style.wrong }
                  onClick={(e) => {
                      if(!done){
                          handleValue(selected[i].name, item.name)
                      }
                      if(currIndex === imagesLength) {
                          setRestart(true)
                          setSpinner(true)
                      }
                  }}
                  >
                      <div >{item.name}</div>
                  </button>
            ))
            questionDiv.push(
                <div className ={style.post} key={i} id='pic'>
                    <div className ={style.imageContainer}>
                        <img src={selected[i].url} alt ='' className={style.img} />
                    </div>
                    <h2>{i + 1}</h2>
                    <div className={style.btnFlex}>{buttonChoices}</div>
                </div>
            )
        }
    }
    const widthOfQuestionItem = () => {
        return 792
    }
    const imagesLength = selected.length - 1
    const nextQuestion = () => {
        if(currIndex === imagesLength) {
            setRestart(true)
            setSpinner(true)
        } else {
            setCurrIndex(currIndex + 1)
            setTranslateVal(translateVal + -widthOfQuestionItem())
            setDone(false)
        }
    }
    return (
        <div className={style.mainFlexFontainer}>
      <h1>Quiz</h1>
      <div className={style.scoreContainer}>
        <h3>
          correct: <span>{correct} </span>
        </h3>
        <h3>
          wrong: <span>{wrong} </span>
        </h3>
      </div>

      <div className={style.contentContainer}>
        <div className={style.wrapper}>
          <div
            className={style.movingQuestions}
            style={{
              transform: `translateX(${translateVal}px)`
            }}
          >
            {questionDiv}
          </div>
          <div className={style.bubbleButtonContainer}>
            {currIndex === imagesLength && restart ? (
              <button
                className={style.bubblesButtonRestart}
                onClick={() => {
                  newGame();
                  setCurrIndex(0);
                  setTranslateVal(0);
                  makeTestSet();
                }}
              >
                Start Over
                <span />
                <span />
                <span />
                <span />
              </button>
            ) : (
              <button onClick={nextQuestion} className={ style.bubblesButtonRestart}>
                {done ? "continue" : "skip"}
                <span />
                <span />
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    )
}

export default Quiz