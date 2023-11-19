import { useRef, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { ReactSession }  from 'react-client-session';
import "./Table.css";

let gender0 = require('../sample/admin/statistic_gender.json');
let cities0 = require('../sample/admin/statistic_cities.json');
let areas0 = require('../sample/admin/statistic_areas.json');
let topics0 = require('../sample/admin/statistic_topics.json');
let questions0 = require('../sample/admin/statistic_problems.json');
let attempts0 = require('../sample/admin/statistic_attempts_by_exercise.json');
let correct_rate0 = require('../sample/admin/statistic_correct_rate_by_exercise.json');
// let time_taken0 = require('../sample/admin/statistic_time_taken_by_exercise.json');


function toUTC(epoch) {
    return new Date(epoch/1000).toISOString().slice(0,-5).replace("T"," ") 
}

function udChart(arr, chartname, setData, setLayout) {
    const valCol = 'correct rate'
    const baseCol = 'last try'
    setData([{
            x: arr.map(x => toUTC(x['last_try'])),
            y: arr.map(x => x['correct']/x['num_done']),
            text: arr.map(x => x['name'] || x['exercise'] || x['area'] || x['topic']),
            type: 'scatter',
            mode: 'lines+markers+text',
            marker: {color: 'red'},
          }]);
    setLayout({  xaxis: {title: baseCol},
    yaxis: {title: valCol},title: chartname, autosize: true} )
}

function udChart1(arr, chartname, setData, setLayout, baseCol, valCol) {
    setData([{
            y: arr.map(x => x[baseCol]),
            x: arr.map(x => x[valCol]),
            type: "bar",
            orientation: "h",
            mode: 'lines+markers',
            marker: {color: 'blue'},
          }]);
    setLayout({  xaxis: {title: valCol.replace('_', ' ')},
    yaxis: {title: baseCol.replace('_', ' ')},title: chartname, autosize: true} )
}

function udChart2(arr, chartname, setData, setLayout, baseCol, valCol) {
    setData([{
            x: arr.map(x =>x[baseCol]),
            y: arr.map(x => x[valCol]),
            type: 'bar',
            mode: 'markers+text',
            marker: {color: 'green'},
          }]);
    setLayout({  xaxis: {title: baseCol.replace('_', ' ')},
    yaxis: {title: valCol.replace('_', ' ')},title: chartname, autosize: true} )
}

function udChart3(arr, chartname, setData, setLayout, baseCol, valCol) {
    setData([{
            y: arr.map(x => x[baseCol]),
            x: arr.map(x => x[valCol]),
            type: "bar",
            orientation: "h",
            mode: 'lines+markers',
            marker: {color: 'yellow'},
          }]);
    setLayout({  xaxis: {title: valCol.replace('_', ' ')},
    yaxis: {title: baseCol.replace('_', ' ')},title: chartname, autosize: true} )
}

function Table({arr, setData, setLayout}) {
    if (arr && (arr.length == 0))
        return <></>
    const headers = Object.keys(arr[0]).map(item => <th>{item} 
        </th>)
    const contents = arr.map(item =>
        <tr>
            { Object.entries(item).map(entry => <td>{((entry[0]=='last_try') || (entry[0]=='time_done'))?toUTC(entry[1]):String(entry[1])}</td>)}
        </tr>)
    return <table class="table table-bordered">
        <tbody>
        <tr>
            {headers}
        </tr>
            {contents}
        </tbody>
        </table>
}



export function AdminStat() {
    const [displayChart, setDisplayChart] = useState(false);
    const [displayTable, setDisplayTable] = useState(false);
    const [plotData, setData] = useState({});
    const [layout, setLayout] = useState({});
    const [arr, setArr] = useState([]);
    const date_from = useRef(null);
    const date_to = useRef(null);
    const problem_name = useRef(null);

    const numdoneByArea = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""

        // fetch(`http://127.0.0.1:5000/get_topics_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        // .then(res => res.json())
        // .then(rs => {
        //     rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        //     setArr(rs); 
        //     udChart(rs, "Topics correct rate", setData, setLayout);
        //     setDisplayChart(true);
        //     setDisplayTable(true);
        // })

        const rs = areas0["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        setArr(rs); 
        udChart1(rs, "Num done by areas", setData, setLayout, 'area', 'num_done');
        setDisplayChart(true);
        setDisplayTable(true);
    }

    const numdoneByTopic = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""

        // fetch(`http://127.0.0.1:5000/get_topics_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        // .then(res => res.json())
        // .then(rs => {
        //     rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        //     setArr(rs); 
        //     udChart(rs, "Topics correct rate", setData, setLayout);
        //     setDisplayChart(true);
        //     setDisplayTable(true);
        // })

        const rs = topics0["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        setArr(rs); 
        udChart1(rs, "Num done by topics", setData, setLayout, 'topic', 'num_done');
        setDisplayChart(true);
        setDisplayTable(true);
    }

    const numdoneByProblem = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""

        // fetch(`http://127.0.0.1:5000/get_topics_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        // .then(res => res.json())
        // .then(rs => {
        //     rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        //     setArr(rs); 
        //     udChart(rs, "Topics correct rate", setData, setLayout);
        //     setDisplayChart(true);
        //     setDisplayTable(true);
        // })

        const rs = questions0["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        setArr(rs); 
        udChart1(rs, "User by exercises", setData, setLayout, 'exercise', 'num_user');
        setDisplayChart(true);
        setDisplayTable(true);
    }

    const attemptsByExcercise = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        // fetch(`http://127.0.0.1:5000/get_areas_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        // .then(res => res.json())
        // .then(rs => {
        //     rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        //     setArr(rs); 
        //     udChart(rs, "Areas correct rate", setData, setLayout);
        //     setDisplayChart(true);
        //     setDisplayTable(true);
        // })
        const rs = attempts0["results"].sort(function(a, b){return a["num_trial"] - b["num_trial"]}); 
        setArr(rs); 
        udChart2(rs, "attempts by excercise", setData, setLayout, 'num_trial', 'num_user');
        setDisplayChart(true);
        setDisplayTable(true);
    }
    const crByExcercise = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        // fetch(`http://127.0.0.1:5000/get_areas_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        // .then(res => res.json())
        // .then(rs => {
        //     rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        //     setArr(rs); 
        //     udChart(rs, "Areas correct rate", setData, setLayout);
        //     setDisplayChart(true);
        //     setDisplayTable(true);
        // })
        const rs = correct_rate0["results"].sort(function(a, b){return a["correct_rate"] - b["correct_rate"]}); 
        setArr(rs); 
        udChart2(rs, "correct rate by excercise", setData, setLayout, 'correct_rate', 'num_user');
        setDisplayChart(true);
        setDisplayTable(true);
    }
    const usersByCities = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        // fetch(`http://127.0.0.1:5000/get_problems_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        // .then(res => res.json())
        // .then(rs => {
        //     rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        //     setArr(rs); 
        //     udChart(rs, "Problems correct rate", setData, setLayout);
        //     setDisplayChart(true);
        //     setDisplayTable(true);
        // })
        const rs = cities0["results"]
        setArr(rs); 
        udChart3(rs, "users by cities", setData, setLayout, 'user_city', 'num_user');
        setDisplayChart(true);
        setDisplayTable(true);
    }
    const usersByGenders = function() {
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        // fetch(`http://127.0.0.1:5000/get_problems_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        // .then(res => res.json())
        // .then(rs => {
        //     rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
        //     setArr(rs); 
        //     udChart(rs, "Problems correct rate", setData, setLayout);
        //     setDisplayChart(true);
        //     setDisplayTable(true);
        // })
        const rs = gender0["results"]
        setArr(rs); 
        udChart3(rs, "users by genders", setData, setLayout, 'gender', 'count');
        setDisplayChart(true);
        setDisplayTable(true);
    }

    return (
        <>
        <form action="" id="olap" class="form-inline container">
        <div class="form-group col-lg-9">
        <div class="d-flex align-items-center">
        <label class="form-label m-2">From: </label>
        <input  class="form-control m-2" type="date" ref={date_from}/> 
        <label class="form-label m-2">To: </label>
        <input  class="form-control mx-3" type="date" ref={date_to}/> 
        <label class="form-label m-2">Problem: </label>
        <input  class="form-control mx-3" type="text" ref={problem_name}/> 
        Return 
        <input class="form-check-input m-1" type="checkbox" value="" id="displayChart" checked={displayChart} onChange={(e)=>setDisplayChart(e.target.checked)}/>
        <label class="form-check-label m-1" for="displayChart">
            Chart
        </label>
        <input class="form-check-input m-1" type="checkbox" value="" id="displayTable" checked={displayTable}  onChange={(e)=>setDisplayTable(e.target.checked)}/>
        <label class="form-check-label m-1" for="displayTable">
            Table
        </label>
        </div>
        </div>
        <div id="query" class="form-group pt-2">
        <button type="submit" class="btn btn-warning mx-2" onClick={(e)=>{e.preventDefault(); usersByGenders()}}>Users by Genders</button> 
        <button type="submit" class="btn btn-warning mx-2" onClick={(e)=>{e.preventDefault(); usersByCities()}}>Users by Cities</button> 

        <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); numdoneByArea()}}>Num done by area</button>
        <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); numdoneByTopic()}}>Num done by topic</button>
        <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); numdoneByProblem()}}>User by exercise</button>

        <button type="submit" class="btn btn-success mx-2" onClick={(e)=>{e.preventDefault(); attemptsByExcercise()}}>Attempts by exercise</button>  
        <button type="submit" class="btn btn-success mx-2" onClick={(e)=>{e.preventDefault(); crByExcercise()}}>Correct rates by exercise</button>  
        
        {/* <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); getRecentProblems()}}>My recent problems</button>  */}
        </div>
        </form>
        <div id="chart" class="pt-4">
        {(displayChart && arr && arr.length > 0)?<Plot 
        data={plotData}
        layout={layout}
        />:""}
        {(displayTable && arr && arr.length > 0)?<Table arr={arr} setData={setData} setLayout={setLayout}/>:""}
        </div>
      </>
    )
}