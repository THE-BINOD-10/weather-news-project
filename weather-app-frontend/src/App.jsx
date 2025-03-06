
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weather from "./components/weather";
import News from "./components/news";
import Home from "./components/Home";


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={ <Weather /> } />
        <Route path="/news" element={ <News /> } />

      </Routes>
      </Router>
  );
}

export default App;
