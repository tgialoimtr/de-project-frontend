import "./Test.css"
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState, useEffect, useRef} from 'react';

function convertString(str) {
    // split the string by the hyphen character
    return str.split("_").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")
}

function Selector({names, selected, setSelected}) {
    const a = names.map((name, index) => 
        <div  class="form-check" >
            <input type="radio" name="A" class="form-check-input" checked={name==selected} value={name} onChange={(e)=>setSelected(e.target.value)}/> 
            <label class="form-check-label" >{index}</label>
        </div>
    )
    return (
    <form action="#!">
    <div class="testselect">
    {a}
    </div>
    </form>
    )
    
}

function Question({question, names, selected, setSelected, userAnswers, setUserAnswers}) {
    const options = JSON.parse(question.options.replace(/'/g, "\""))
    const a = options.map((option, index) => 
        <div  class="form-check" >
        <input type="radio" name={question.name} 
        class="form-check-input" 
        value={option[0]} 
        checked={option[0]==userAnswers[question.name]}
        onChange={(e)=>setUserAnswers({...userAnswers, [question.name]:e.target.value})}/> 
        <label class="form-check-label" >{option.replace(")", ") ")}</label>
        </div>
    )
    const index = names.indexOf(selected)
    console.log(index)
    const disableNext = (index == names.length - 1) 
    const questionDone = function(e) {
        e.preventDefault()

        console.log(userAnswers[question.name] + " --- " + question.answer)
        // fetch() write log 
        if (index < names.length - 1) 
            setSelected(names[index + 1])
    }
    const docs = JSON.parse(question.documents.replace(/'/g, "\"")).slice(1,-1)
    const hints = docs.map((link, index) => <>
            <a href={link}> Hint {index} </a>
        </>)
    console.log(hints.length)
    return (
    <div class="question">
    <h4>{convertString(question.name)}</h4>
    <p>{question.question}</p>
    <form onSubmit={(e) => questionDone(e)}>
    {a}
    <input type="submit" value="Submit&Next" disabled={disableNext}/>
    {hints}
    </form>
    <hr/>
    </div>
    )
}

export function Test({questions}) {
    const [selected, setSelected] = useState("");
    const [userAnswers, setUserAnswers] = useState({});
    const names = questions.map(q => q["name"])
    const question = questions.filter(q => q["name"] == selected)
    // const a = questions.map(question => 
    //     <Question question={question} />
    // )
    return <div class="card test">
    <div class="card-header">
      QUESTION
    </div>
    {(selected == "")? "Please select question to start doing topic": ""}
    <Selector names={names} selected={selected} setSelected={setSelected}/>
    <hr/>
    {(question.length > 0)?
    <Question question={question[0]} names={names} 
    selected={selected} setSelected={setSelected}
    userAnswers={userAnswers} setUserAnswers={setUserAnswers} />:""}
  </div>

}