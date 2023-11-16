import { useRef, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { ReactSession }  from 'react-client-session';
import "./Table.css";

function toUTC(epoch) {
    return new Date(epoch/1000).toISOString().slice(0,-5).replace("T"," ") 
}

function udChart(arr, chartname, setData, setLayout) {
    const valCol = 'num_done'
    const baseCol = 'last_try'
    setData([{
            x: arr.map(x => toUTC(x[baseCol])),
            y: arr.map(x => x[valCol]),
            text: arr.map(x => x['name'] || x['exercise'] || x['area'] || x['topic']),
            type: 'scatter',
            mode: 'lines+markers+text',
            marker: {color: 'red'},
          }]);
    setLayout({  xaxis: {title: baseCol},
    yaxis: {title: valCol},title: chartname, autosize: true} )
}

function popoutChild(arr, valCol, setDisplayChart, setData, setLayout) {
    const othersCol = Object.keys(arr[0]).filter(function(e) { return e !== valCol })
    var baseCol = othersCol[0]
    if (othersCol.length == 1) 
        baseCol = othersCol[0]
    else
        baseCol = prompt("Select base column from " + othersCol.join(", "));
    const xArray = arr.map(x => x[baseCol])
    const yArray = arr.map(x => x[valCol])
    console.log(yArray)
    setData([{
            x: xArray,
            y: yArray,
            type: 'bar',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }]);
    setLayout({ width: 1000, height: 800,   xaxis: {title: baseCol},
    yaxis: {title: valCol},title: 'A Fancy Plot'} )
    setDisplayChart(true)
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



export function UserStat() {
    const [displayChart, setDisplayChart] = useState(false);
    const [displayTable, setDisplayTable] = useState(false);
    const [plotData, setData] = useState({});
    const [layout, setLayout] = useState({});
    const [arr, setArr] = useState([]);
    const date_from = useRef(null);
    const date_to = useRef(null);

    const getCRbyTopic = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_topics_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => {
            rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
            setArr(rs); 
            udChart(rs, "Topics correct rate", setData, setLayout);
            setDisplayChart(true);
            setDisplayTable(true);
        })
    }
    const getCRbyArea = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_areas_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => {
            rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
            setArr(rs); 
            udChart(rs, "Areas correct rate", setData, setLayout);
            setDisplayChart(true);
            setDisplayTable(true);
        })
    }

    const getCRbyProblem = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_problems_correct_rate_by_user_id?user_id=${user_id}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => {
            rs = rs["results"].sort(function(a, b){return a["last_try"] - b["last_try"]}); 
            setArr(rs); 
            udChart(rs, "Problems correct rate", setData, setLayout);
            setDisplayChart(true);
            setDisplayTable(true);
        })
    }

    const getRecentProblems = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const user_id = ReactSession.get("user_id");
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_recent_problems_by_user_id?user_id=${user_id}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => {
            setArr(rs["results"]); 
            setDisplayChart(false);
            setDisplayTable(true);
        })
    }

    return (
        <>
        <form action="" id="olap" class="form-inline container">
        <div class="form-group col-lg-8">
        <div class="d-flex align-items-center">
        <label class="form-label m-2">From: </label>
        <input  class="form-control m-2" type="date" ref={date_from}/> 
        <label class="form-label m-2">To: </label>
        <input  class="form-control mx-3" type="date" ref={date_to}/> 
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
        <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); getCRbyTopic()}}>Topics correct rate</button>
        <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); getCRbyArea()}}>Areas correct rate</button>  
        <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); getCRbyProblem()}}>Problems correct rate</button> 
        <button type="submit" class="btn btn-primary mx-2" onClick={(e)=>{e.preventDefault(); getRecentProblems()}}>My recent problems</button> 
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