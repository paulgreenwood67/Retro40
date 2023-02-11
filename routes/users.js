const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const carsFile = fs.readFile("../carFile.json");

//reading the json file
let parsedCars;
fs.readFile("../carFile.json", "utf8")
  .then((data) => {
    parsedCars = JSON.parse(data);
  })
  .catch((err) => {
    console.error(err);
  });


// GET Request json details
router.get("/", function (req, res) {
  fs.readFile("../carFile.json", "utf8")
    .then((data) => {
      parsedCars = JSON.parse(data);
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("App.get");
  console.table("carsFile in router.get", parsedCars);
  res.json(parsedCars);
});

// POST Request to add additional cars to the list
router.post("/add", function (req, res) {
  console.log("App.post req.body", req.body);
  const newItem = req.body;

  parsedCars.push(newItem);

  // write to the json file

  fs.writeFile("../carFile.json", JSON.stringify(parsedCars))
    .then(() => {
      console.log("The new car has been added");
    })
    .catch((err) => {
      console.error(err);
    });

  // return json
  return res.json({
    message: "New car added to the list",
    parsedCars,
  });
});


// PUT Request to edit cars to the list
router.put("/update/:id", function (req, res) {
  console.log("req.body in update", req.body);
  console.log("req.params.id in update", req.params.id);
  console.log("app.put");

  const id = req.params.id;
  console.log("req.body in update", req.body);
  console.log("req.params.id in update", req.params.id);
  for (let idx = 0; idx < parsedCars.length; idx++) {
    if (parsedCars[idx].id === id) {
      const newUpdatedObj = { ...parsedCars[idx] };

      const updatedItemKeysArray = Object.keys(req.body);

      for (let i = 0; i < updatedItemKeysArray.length; i++) {
        newUpdatedObj[updatedItemKeysArray[i]] =
          req.body[updatedItemKeysArray[i]];
      }

      parsedCars[idx] = newUpdatedObj;
    }
  }

  // write to the json file
  fs.writeFile("../carFile.json", JSON.stringify(parsedCars))
    .then(() => {
      console.log("The new car has been added");
    })
    .catch((err) => {
      console.error(err);
    });
  // return json
  return res.json({
    message: "Updated an item in the list!",
    parsedCars,
  });
});


// POST Request to delete cars to the list
router.delete("/delete/:id", function (req, res) {
  const id = req.params.id;
  parsedCars = parsedCars.filter((item) => {
    return item.id !== id;
  });

  fs.writeFile("../carFile.json", JSON.stringify(parsedCars))
    .then(() => {
      console.log("The item has been deleted");
    })
    .catch((err) => {
      console.error(err);
    });
// return json
  return res.json({
    message: "Deleted an item from the list!",
    parsedCars,
  });
});

module.exports = router;