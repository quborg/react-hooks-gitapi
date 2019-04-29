import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";

const URL = (page = 1) =>
  `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = page =>
    axios.get(URL(page)).then(res => setData([...data, ...res.data.items]));

  return (
    <InfiniteScroll hasMore loadMore={loadPage}>
      {data.map(item => {
        return (
          <div key={item.id} className="card">
            <div className="avatar">
              <img src={item.owner.avatar_url} alt="user avatar" />
              <div>{item.owner.login}</div>
            </div>
            <div className="detail">
              <div className="name">{item.name}</div>
              <div className="desc">{item.description}</div>
              <div className="marks">
                <span className="stars">Stars: {item.stargazers_count}</span>
                <span className="issues">Issues: {item.open_issues_count}</span>
                <span className="created">
                  {`Submitted ${moment(item.created_at).fromNow()} by ${
                    item.owner.login
                  }`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};

export default App;
