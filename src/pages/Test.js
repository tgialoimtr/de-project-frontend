import "./Test.css"
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState, useEffect, useRef} from 'react';
import { ReactSession }  from 'react-client-session';
import ReturnDialog from './ReturnDialog';

function convertString(str) {
    // split the string by the hyphen character
    return str.split("_").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")
}

function udChart(arr, chartname, setData, setLayout) {
    const valCol = 'correct rate'
    // const baseCol = 'problem'
    setData([{
            y: arr.map(x => x['name'] || x['exercise'] || x['area'] || x['topic']),
            x: arr.map(x => x['correct']/x['num_done']),
            text: arr.map(x => Math.round(x['correct']/x['num_done']*100)/100),
            type: "bar",
            orientation: "h",
            mode: 'lines+markers+text',
            marker: {color: 'blue'},
          }]);
    setLayout({  xaxis: {title: valCol},
    // yaxis: {title: vertical_name},
    title: chartname, autosize: true} )
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
    console.log(question.options)
    const [showDialog, setShowDialog] = useState(false);
    const [returnDialogMessage, setReturnDialogMessage] = useState('');

    const openDialog = (message) => {
        setReturnDialogMessage(message);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    const nextQuestion = () => {
        console.log("im here")
        if (names.indexOf(selected) < names.length - 1) 
            setSelected(names[index + 1])
        setShowDialog(false);
    };
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
    const disableNext = (index == names.length - 1) 
    const questionDone = function(e) {
        e.preventDefault()
        const user_id = ReactSession.get("user_id");
        const is_correct = (userAnswers[question.name] == question.answer);
        const ddd = JSON.stringify({'user_id':user_id, 'exercise':question.name, 'time_taken':0, 'correct':(userAnswers[question.name] == question.answer)})
        console.log(is_correct)
        { is_correct ? openDialog("Your answer is correct!") : openDialog("Your answer is incorrect!")}


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: ddd
          };
          // TODO fix hardcode
          fetch(`http://localhost:5000/write_log`, requestOptions).then(res => console.log(res.json()) )

        // if (index < names.length - 1) 
        //     setSelected(names[index + 1])
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
    {/* <input type="submit" value="Submit&Next" disabled={disableNext}/> */}
    <input type="submit" value="Submit"/>
    {hints}
    </form>
    <hr/>
    <ReturnDialog
        showDialog={showDialog}
        returnDialogMessage={returnDialogMessage}
        onClose={closeDialog}
        onNext={nextQuestion}
    />
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