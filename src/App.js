import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Table from "./Table";
import Map from "./Map";

const App = () => {
  let [now, setNow] = useState(new Date());
  window.setTime = setNow;
  useEffect(() => {
    let interval = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => {
      clearInterval(interval);
    }
  }, []);
  return (
  <>
    <Header />
    <Map />
    <Table now={now} />
    </>
)};

export default App;
