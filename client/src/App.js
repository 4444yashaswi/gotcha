import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
