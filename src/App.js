import React, { useState, useEffect } from "react";
import axios from "axios";

const URL =
  "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(URL).then(res => setData(res.data.items));
  }, []);

  console.log(data);

  return <div>Hello World!!!</div>;
};

export default App;
