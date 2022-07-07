import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";
// https://api.github.com/users/wesbos corthead
// https://api.github.com/rate_limit
// https://api.github.com/users/john-smilga/followers
// https://api.github.com/users/john-smilga/repos?per_page=100
const GithubContaxt = React.createContext();

const GithubProvider = ({ children }) => {
  const [user, setUser] = useState("wesbos");
  const [request, setRequest] = useState({
    limit: 0,
    remaining: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, SetIsError] = useState({
    show: false,
    msg: "",
  });
  const [githubUser, setGithubUser] = useState([]);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubFollowers, setGithubFollowers] = useState([]);

  const getRequest = async () => {
    try {
      const response = await axios(`${rootUrl}/rate_limit`);
      const { data } = response;
      const { limit, remaining } = data.rate;
      // remaining = 0;
      setRequest({
        limit,
        remaining,
      });
      // errorSet();
    } catch (error) {
      console.log(error);
      errorSet(true, "Request is not available");
    }
  };

  const fetchUser = async () => {
    setIsLoading(true);
    errorSet();
    try {
      const response = await axios(`${rootUrl}/users/${user}`);
      if (response) {
        // console.log(response);
        setGithubUser(response.data);
        const { followers_url, repos_url } = response.data;
        // axios(`${repos_url}?per_page=100`).then((res) => {
        //   setGithubRepos(res.data);
        // });
        // axios(`${followers_url}?per_page=100`).then((res) => {
        //   setGithubFollowers(res.data);
        // });
        await Promise.allSettled([
          axios(`${repos_url}?per_page=100`),
          axios(`${followers_url}?per_page=100`),
        ]).then((result) => {
          const [repos, followers] = result;
          console.log(repos);
          if (repos.status === "fulfilled") {
            setGithubRepos(repos.value.data);
          }
          if (followers.status === "fulfilled") {
            setGithubFollowers(followers.value.data);
          }
        });
      } else {
        errorSet(true, "User is not available");
      }
    } catch (error) {
      console.log(error, "tesssssssssst");
      errorSet(true, "User is not available");
    }
    setIsLoading(false);
    getRequest();
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
    console.log(user);
    // setUser("");
  };
  const errorSet = (show = false, msg = "") => {
    SetIsError({
      show,
      msg,
    });
  };
  return (
    <GithubContaxt.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        request,
        user,
        isLoading,
        isError,
        setUser,
        handleSubmit,
      }}
    >
      {children}
    </GithubContaxt.Provider>
  );
};

export const useGlobalContaxt = () => {
  return useContext(GithubContaxt);
};

export { GithubProvider };
