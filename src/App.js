import "./App.css";
import tinh_tp from "./json/tinh_tp.json";

import Home from "./pages/Home";
import CandleStick from "./pages/CandleStickChart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const tinh = JSON.parse(tinh_tp);
  console.log(tinh_tp);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<CandleStick />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
