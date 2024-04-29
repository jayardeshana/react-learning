import React, { useState } from "react";
import "../../Assets/style/Table.css";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
const Table = ({ searchQuery, data, loading }) => {
  const [filteredData, setFilteredData] = useState(null);
  const [itemsPerPage] = useState(19);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) =>
        item.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1)
    }
  }, [data, searchQuery]);

  // Calculate the indexes of the items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredData && filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Continent</th>
                <th>Country</th>
                <th>Population</th>
                <th>Active-Cases</th>
                <th>Deaths</th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((data, index) => (
                  <tr key={index}>
                    <td>{data.continent}</td>
                    <td>{data.country}</td>
                    <td>{data.population}</td>
                    <td>{data.cases.active}</td>
                    <td>{data.deaths.total}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {filteredData && (
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, i) => (
                  <li key={i} className={currentPage === i + 1 ? "active" : ""}>
                    <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Table;
