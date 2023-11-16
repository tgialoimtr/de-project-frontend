import { useRef, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { ReactSession }  from 'react-client-session';
import "./Table.css";


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

function Table({arr, setDisplayChart, setData, setLayout}) {
    if (arr && (arr.length == 0))
        return <></>
    const headers = Object.keys(arr[0]).map(item => <th>{item} 
    <a href="#!" onClick={(e) => popoutChild(arr, item, setDisplayChart, setData, setLayout)}>
        <i class="fa fa-upload"></i>
    </a>
        </th>)
    const contents = arr.map(item =>
        <tr>
            { Object.values(item).map(v => <td>{String(v)}</td>)}
        </tr>)
    return <table>
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
    const [plotData, setData] = useState({});
    const [layout, setLayout] = useState({});
    const [arr, setArr] = useState([]);
    const date_from = useRef(null);
    const date_to = useRef(null);
    const problem_name = useRef(null);

    const getCRbyTopic = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_problems_correct_rate_by_user_id?user_id=${45}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => setArr(rs["results"]))
    }
    const getCRbyArea = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_areas_correct_rate_by_user_id?user_id=${45}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => setArr(rs["results"]))
    }

    const getCRbyProblem = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_problems_correct_rate_by_user_id?user_id=${45}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => setArr(rs["results"]))
    }

    const getRecentProblems = function() {
        console.log(ReactSession.get("username"))
        console.log(ReactSession.get("user_id"))
        const d1 = (date_from.current)?`&start=${date_from.current.value}`:""
        const d2 = (date_to.current)?`&end=${date_to.current.value}`:""
        fetch(`http://127.0.0.1:5000/get_recent_problems_by_user_id?user_id=${45}${d1}${d2}`)
        .then(res => res.json())
        .then(rs => setArr(rs["results"]))
    }

    return (
        <>
        <form action="" id="olap">
        <div>
        <label>From: </label>
        <input type="date" ref={date_from}/> 
        <label>To: </label>
        <input type="date" ref={date_to}/> 
        <label>Problem: </label>
        <input type="text" ref={problem_name}/> 
        </div>
        <div id="query">
        <button type="submit" onClick={(e)=>{e.preventDefault(); getCRbyTopic()}}>Topics correct rate</button>
        <button type="submit" onClick={(e)=>{e.preventDefault(); getCRbyArea()}}>Areas correct rate</button>  
        <button type="submit" onClick={(e)=>{e.preventDefault(); getCRbyProblem()}}>Problems correct rate</button> 
        <button type="submit" onClick={(e)=>{e.preventDefault(); getRecentProblems()}}>My recent problems</button> 
        </div>
        </form>
        <a href="#!" onClick={(e) => setDisplayChart(!displayChart)}>
        <i class="fa fa-search"></i>
        </a>
        {displayChart?
        <Plot
        data={plotData}
        layout={layout}
      /> :"Chart"}
        <Table arr={arr} setDisplayChart={setDisplayChart} setData={setData} setLayout={setLayout}/>

      </>
    )
}