import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { fetchUser } from "./store/reducers/user_slice";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Survey from "./components/Survey";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
