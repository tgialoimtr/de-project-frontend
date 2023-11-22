import { Test } from "./Test";
import './FindProblem.css';
import React, {useState, useEffect, useRef} from 'react';

// import data from '../sample/admin/statistic_areas.json';
// let data = require('../sample/admin/statistic_areas.json');
// let areas0 = require('../sample/area-topic-problem/get_all_areas.json');
// let topics0 = require('../sample/area-topic-problem/get_topics_by_area.json');
// let questions0 = require('../sample/area-topic-problem/get_problems_by_topic.json');

function convertString(str) {
    // split the string by the hyphen character
    return str.split("-").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")
}
function TopicItems({topics, setQuestions}) {
    const getQuestions = function(topic) {
        fetch(`http://127.0.0.1:5000/get_problems_by_topic?topic=${topic}`).then(res => res.json())
          .then(rs => setQuestions(rs["results"]))
        // setQuestions(questions0["results"])
  }
    const a = topics.map(topic => 
        <a href="#!" class="list-group-item list-group-item-action" onClick={(e) => {e.preventDefault(); getQuestions(topic);}}>
            {convertString(topic)}
        </a>
    )

return <div class="card">
<div class="card-header">
  TOPIC
</div>
{/* <div class="card-body subheader">
  SECTION #1
</div> */}
<ul class="list-group list-group-flush">
    {a}
</ul>
</div>
}

function AreaItems({areas, setTopics}) {
    const getTopics = function(area) {
          fetch(`http://localhost:5000/get_topics_by_area?area=${area}`).then(res => res.json())
            .then(topics => setTopics(topics["results"]))
          // setTopics(topics0["results"])
    }
    const a = areas.map(area => 
            <a href="#!" class="list-group-item list-group-item-action" onClick={(e) => {e.preventDefault(); getTopics(area)}}>
                {convertString(area)}
            </a>
        )

    return <div class="card">
    <div class="card-header">
      AREA
    </div>
    {/* <div class="card-body subheader">
      SECTION #1
    </div> */}
    <ul class="list-group list-group-flush">
        {a}
    </ul>
  </div>
}

export function FindProblem() {
    const [topics, setTopics] = useState([]);
    const [areas, setAreas] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/get_all_areas`).then(res => res.json())
        .then(rs => setAreas(rs["results"]))

        // setAreas(areas0['results'])
      },[]);

    return (
    <>
    <AreaItems areas={areas} setTopics={setTopics}/> 
    <TopicItems topics={topics} setQuestions={setQuestions}/>
    <Test questions={questions}/>

    </>
    )
}