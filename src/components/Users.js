

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const elemenOne = <FontAwesomeIcon icon={faPenToSquare} />;
const elemenTwo = <FontAwesomeIcon icon={faTrashCan} />;

// User States
function CarDetails() {
  const [users, setUser] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState(null);
  //create object with all keys
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    image: "",
    userId: "",
  });
  const [selectedCar, setSelectedCar] = useState({});
  const [carToUpdate, setCarToUpdate] = useState({});

  //------------------------------------------------------select


  // function to allow the selction of a car to edit
  function selectCar(e, index) {
    let id = e.target.dataset.id;
    let make = e.target.dataset.make;
    let model = e.target.dataset.model;
    let year = e.target.dataset.year;
    let image = e.target.dataset.image;

    setSelectedCar({
      make: make,
      model: model,
      year: year,
      image: image,
      userId: id,
    });

  
  }

 

  //------------------------------------------------------GET

  // the get car function

  function getCar() {
    fetch("/api").then((result) => {
      result.json().then((response) => {
        setCar(response);
      });
    });
  }

  // useffect() allows the getCar function to set state
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then(
        (data) => setCar(data),
       
      );
  }, []);

  //------------------------------------------------------POST

  // the add a car functio
  function addCar(e) {
    e.preventDefault();
    let item = { id: Date.now().toString(), make, model, year, image };
    fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((response) => {});
    });
  }
  //------------------------------------------------------DELETE
  let idToDelete = "";

  //the delete a car function
  function deleteCar(e, index) {
    let id = e.target.dataset.id;
    car.splice(index, 1);
    fetch(`/api/delete/${id}`, {
      method: "DELETE",
      "Content-Type": "application/json",
    }).then((result) => {
      result.json().then((response) => {
        
        getCar();
      });
    });
  }

  //------------------------------------------------------PUT

// useEffect getting data from the select car function
  useEffect(() => {
    setCarToUpdate(selectedCar);
  }, [selectedCar]);


// function to update a car from the info put in the form from  the selectcar function
  function updateCar(e) {
    e.preventDefault();
    setCarToUpdate(selectedCar);

    apiCall();
  }

  useEffect(() => {
    getCar();
  }, [car]);

  const apiCall = () => {
    let id = selectedCar.userId;
    fetch(`/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carToUpdate),
    }).then((result) => {
      result.json().then((response) => {
        
        getCar();
      });
    });
  };

  return (
    <main className="main">
      <hr className="horizontalRow"></hr>
      <div className="row body">
        <div className="col-lg-3">
          <div className="leftContainer">
              <form className="carForm">
            <h5 className="aed">Add a car </h5>
            <p className="sideTextTopOne">
              To add car enter the details below and click <b>'ADD'</b>
            </p>
{/* add car form */}
            <input
              className="inputBox"
              type="text"
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
              }}
              placeholder="Make"
            ></input>
            <input
              className="inputBox"
              type="text"
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
              placeholder="Model"
            ></input>
            <input
              className="inputBox"
              type="text"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              placeholder="Year"
            ></input>
            <input
              className="inputBox"
              type="text"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              placeholder="Image URL"
            ></input>
            <br></br>
            <button onClick={addCar} className="sideButton" type="submit">
              Add
            </button>
          </form>
{/* edit car form */}
          <form className="carForm">
          <h5 className="aed">Edit a car </h5>
          <p className="sideTextTopOne">
              To edit a car select <b>'update'</b> under a car, enter the details in the form 
              that will appear below then click <b>'EDIT</b>
            </p>
              {selectedCar &&
                Object.entries(selectedCar).map(([key, value]) => (
                  <>
                    <input
                      className="inputBox"
                      type="text"
                      value={value}
                      placeholder={value}
                      onChange={(e) => {
                        setSelectedCar((prevSelectedCar) => ({
                          ...prevSelectedCar,
                          [key]: e.target.value,
                        }));
                      }}
                    />
                  </>
                ))}
              <br></br>
            
              <button onClick={updateCar} className="sideButton">
                Edit
              </button>
              
            </form>

            {/* side div display */}
           
            <ul className="carSide">
              {Array.from(car).map((car, index) => (
                <li key={car.id}>
                  {" "}
                  {car.make}&nbsp;{car.model}&nbsp;({car.year})&nbsp;&nbsp;
                  <button
                    className="sideEdit"
                    data-id={car.id}
                    data-make={car.make}
                    data-model={car.model}
                    data-year={car.year}
                    data-image={car.image}
                    onClick={(e) => selectCar(e)}
                  >
                    Update
                  </button>
                  {" / "}
                  < button
                    className="sideEdit"
                    data-id={car.id}
                    onClick={(e) => deleteCar(e)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            
          </div>
         
         
        </div>
 {/* main body display */}
        <div className="col-lg-9 backGround">
          <div className="rightContainer">
            <ul className="carStats">
              {Array.from(car).map((car) => (
                <li key={car.id}>
                  <img className="image" src={car.image}></img> {car.make}
                  &nbsp;{car.model}&nbsp;({car.year})&nbsp;&nbsp;
                  <br></br>
                  <button
                    className="edit"
                    data-id={car.id}
                    onClick={(e) => selectCar(e)}
                  >
                    Update
                  </button>
                  {" / "}
                  <button
                    className="edit"
                    data-id={car.id}
                    onClick={(e) => deleteCar(e)}
                  >
                    Delete
                  </button>
                  &nbsp;{" "}
                  
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CarDetails;

