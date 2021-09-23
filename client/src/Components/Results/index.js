import React, { useEffect, useState } from "react";
import style from './Results.module.css'

const Results = ({ setSpinner, spinner, correct }) => {
  const [copySuccess, setCopySuccess] = useState("");
 

  useEffect(() => {
    setCopySuccess("");
  }, [spinner]);

 

  return (
    <div className={spinner ? style.darkscreen : style.none}>
      <div className={style.popup}>
        <h2>{correct + '/10'}</h2>
        <div
          className={style.close}
          onClick={() => {
            setSpinner(false);
          }}
        >
          &times;
        </div>
        <div className={style.message}>
          You got a score of {correct * 10}%!{" "}
        </div>

      </div>
    </div>
  );
}
export default Results