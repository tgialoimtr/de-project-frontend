import logo from './logo.svg';
import './App.css';
import { Login } from "./pages/Login"
import { About } from "./pages/About"
import { UserStat } from "./pages/UserStat"
import { AdminStat } from "./pages/AdminStat"
import { Routes, Route, Link } from 'react-router-dom';
import { FindProblem } from './pages/FindProblem';
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

function App() {
  return (
    <>
    <nav class="navbar navbar-expand-sm bg-light">

    <div class="container-fluid">
      <ul class="navbar-nav">
      <li class="nav-item"><Link class="nav-link" to="/">Home</Link></li>
        <li class="nav-item"><Link class="nav-link" to="/problems">Problems</Link></li>
        <li class="nav-item"><Link class="nav-link" to="/userstat">User Stats</Link></li>
        <li class="nav-item"><Link class="nav-link" to="/adminstat">Admin Stats</Link></li>
        <li class="nav-item"><Link class="nav-link" to="/login">Login</Link></li>
        <li class="nav-item"><Link class="nav-link" to="/about">About</Link></li>
        <li class="nav-item"><span class="nav-link" onClick={(e) => console.log("logout")}>Logout</span></li>
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
