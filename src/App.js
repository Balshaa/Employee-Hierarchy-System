import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Common
import Header from "./Common/Header/Header";
import Login from "./Common/Login/Login";
import Home from "./Components/Home/Home";
//import TryHere from "./Components/Home/TryHere"
function App() {
  return (
    <>
      <Router>

        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:id?" exact element={<Home />} />
          <Route path="/Login" exact element={<Login />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
