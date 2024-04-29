import Header from "./component/Header/Header";
import Table from "./component/Table/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://covid-193.p.rapidapi.com/statistics",
          headers: {
            "X-RapidAPI-Key":
              "b0e3029f4fmsh8eb14ce15a93c09p1f7aabjsn8a109110cbb8",
            "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
          },
        };
        const response = await axios.request(options);
        setData(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  return (
    <div className="App">
      <Header onSearchInputChange={handleSearchInputChange} />
      <Table searchQuery={searchQuery} data={data} loading={loading} />
    </div>
  );
}

export default App;
