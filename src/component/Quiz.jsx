import React, { useRef, useState } from 'react'
import { data } from './Data/Data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [que, setQue] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];


    const checkAns = (e, ans) => {
        if (lock === false) {

            if (que.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[que.ans - 1].current.classList.add("correct");

            }
        }
    }
    const next = () => {

        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;

            }
            setIndex(++index);
            setQue(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQue(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <>
            <div className="quiz-main">
                <div className="container">
                    <h1>Quiz App</h1>
                    <hr />

                    {result ? <></> : <>

                        <div className="quiz-inner">
                            <h3> {index + 1}{que.que}  </h3>
                            <ul>
                                <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{que.option1}</li>
                                <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{que.option2}</li>
                                <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{que.option3}</li>
                                <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{que.option4}</li>
                            </ul>

                        </div>
                      
                        <button onClick={next}>Next</button>
                        <div className="index">{index + 1} of {data.length} questions</div>
                    </>}
                    {result ? <>
                        <h2>You Scored {score} out of {data.length}</h2>
                        <button onClick={reset}>Reset</button>
                    </> : <></>}

                </div>
            </div>

        </>
    )
}

export default Quiz