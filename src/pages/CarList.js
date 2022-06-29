import { useEffect, useState } from "react";
import axios from "axios";

function CarList() {
  const api ="http://localhost:8000/api/cars";
  const [cars, setCars] = useState([]);
  const getCars = () => {
    axios
      .get(api)
      .then(function (response) {
        setCars(response.data.data)
        console.log(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })  
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    getCars();
  }, []);
  return (
    <div>
      <h2>Danh Sách xe</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Description</th>
            <th>Produced_on</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {!!cars ? (
            cars.map((car, index) => (
              <tr key={index}>
                <td scope="row">{car.id}</td>
                <td>{car.model}</td>
                <td>{car.decription}</td>
                <td>{car.produced_on}</td>
                <td>
                  <img width="100px" height="100px" src={car.images} alt="" />
                </td>
              </tr>
            ))
          ) : (
            <tr>No data</tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default CarList;
