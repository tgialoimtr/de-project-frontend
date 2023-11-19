import logo from './logo.svg';
import './App.css';
import { Login } from "./pages/Login"
import { About } from "./pages/About"
import { UserStat } from "./pages/UserStat"
import { AdminStat } from "./pages/AdminStat"
import { Routes, Route, Link } from 'react-router-dom';
import { FindProblem } from './pages/FindProblem';
import { ReactSession } from 'react-client-session';
import {useNavigate} from "react-router-dom";

ReactSession.setStoreType("localStorage");

function App() {
  const navigate = useNavigate();
  const user_id = ReactSession.get("user_id");
  const username = ReactSession.get("username");
  console.log(username)
  const logout=function() {
    ReactSession.set("username", null);
    navigate('/')
  }
  return (
    <>
    <nav class="navbar navbar-expand-sm bg-light">

    <div class="container-fluid">
      <ul class="navbar-nav">
        {(username && username != 'admin')? <li class="nav-item"><Link class="nav-link" to="/problems">Problems</Link></li> :""}
        {(username && username != 'admin')? <li class="nav-item"><Link class="nav-link" to="/userstat">User Stats</Link></li> :""}
        {(username && username == 'admin')? <li class="nav-item"><Link class="nav-link" to="/adminstat">Admin Stats</Link></li> :""}
        {(!username)? <li class="nav-item"><Link class="nav-link" to="/login">Login</Link></li>:""}
        {(username)? <li class="nav-item"><a href="#!" class="nav-link" onClick={(e) => {logout()}}>Logout</a></li>:""}
        <li class="nav-item"><Link class="nav-link" to="/about">About</Link></li>
      </ul>
    </div>

    </nav>
    <div id="main">
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/problems" element={<FindProblem/>}></Route>
      <Route path="/userstat" element={<UserStat/>}></Route>
      <Route path="/adminstat" element={<AdminStat/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/about" element={<About/>}></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
