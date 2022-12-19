var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(5000, function () {
  console.log("Server is running!!!!!");
});
const { db } = require("./config/admin");

// API ADMIN
//CATEGORY
// get all category
app.get("/Cate", async (req, res) => {
  //res.status(201).json(items);
  const cateRef = db.collection("Category");
  try {
    cateRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(items);
      res.status(201).json(items);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
///search
app.get("/searchCate/:keyword", async (req, res) => {
  const cateRef = db.collection("Category");
  try {
    cateRef.get().then((snapshot) => {
      const data = snapshot.docs.map((value) => ({
        id: value.id,
        ...value.data(),
      }));
      let key = req.params.keyword;
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toLowerCase() : "".toLowerCase();
        const textData = key.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      res.status(200).json(newData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//create category
app.post("/addCate", async (req, res) => {
  const { name, Img } = req.body;
  try {
    const category = db.collection("Category").doc();
    const item = {
      name: name,
      Img: Img,
    };
    console.log("add category", item);
    category.set(item);

    res.status(200).send({
      status: "success",
      message: "Add category successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//update category
app.put("/updateCate/:docId", async (req, res) => {
  const { name, Img } = req.body;
  try {
    const docId = req.params.docId;
    const body = db.collection("Category").doc(docId);
    const item = {
      name: name,
      Img: Img,
    };
    console.log("update", item);
    body.update(item);
    res.status(200).send({
      message: "update successful",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
//delete category
app.delete("/deleteCate/:docId", async (req, res) => {
  try {
    const docId = req.params.docId;
    db.collection("Category").doc(docId).delete();
    res.status(200).send({
      message: "delete successful",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
////////////////////////////////////////
//PET
//get all
app.get("/Shop", async (req, res) => {
  //res.status(201).json(items);
  const petRef = db.collection("Shop");
  try {
    petRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("hello", items);
      res.status(201).json(items);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
//search
app.get("/searchPet/:keyword", async (req, res) => {
  const petRef = db.collection("Shop");
  try {
    petRef.get().then((snapshot) => {
      const data = snapshot.docs.map((value) => ({
        Name: value.Name,
        ...value.data(),
      }));
      let key = req.params.keyword;
      const newData = data.filter((item) => {
        const itemData = item.Name ? item.Name.toLowerCase() : "".toLowerCase();
        const textData = key.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      res.status(200).json(newData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//create
app.post("/addPet", async (req, res) => {
  const { Name, Image, Price, Age, Origin, Gender, CateID, Condition } =
    req.body;
  try {
    const pet = db.collection("Shop").doc();
    const item = {
      Name: Name,
      Age: Age,
      Gender: Gender,
      CateID: CateID,
      Origin: Origin,
      Price: Price,
      Image: Image,
      Condition: Condition,
    };
    console.log("add pet", item);
    pet.set(item);

    res.status(200).send({
      status: "success",
      message: "Add pet successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//update category
app.put("/updatePet/:docId", async (req, res) => {
  const { Name, Image, Price, Age, Origin, Gender, CateID, Condition } =
    req.body;
  try {
    const docId = req.params.docId;
    const body = db.collection("Shop").doc(docId);
    const item = {
      Name: Name,
      Age: Age,
      Gender: Gender,
      CateID: CateID,
      Origin: Origin,
      Price: Price,
      Image: Image,
      Condition: Condition,
    };
    console.log("update", item);
    body.update(item);
    res.status(200).send({
      message: "update successful",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  
});
//delete category
app.delete("/deletePet/:docId", async (req, res) => {
  try {
    const docId = req.params.docId;
    db.collection("Shop").doc(docId).delete();
    res.status(200).send({
      message: "delete successful",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
///////////////////////////////////
// item
//get all
app.get("/Item", async (req, res) => {
  //res.status(201).json(items);
  const itemRef = db.collection("Item");
  try {
    itemRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(items);
      res.status(201).json(items);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
///search
app.get("/searchItem/:keyword", async (req, res) => {
  const itemRef = db.collection("Item");
  try {
    itemRef.get().then((snapshot) => {
      const data = snapshot.docs.map((value) => ({
        name: value.name,
        ...value.data(),
      }));
      let key = req.params.keyword;
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toLowerCase() : "".toLowerCase();
        const textData = key.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      res.status(200).json(newData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//create
app.post("/addItem", async (req, res) => {
  const { cateID, name, price, quantity, image } = req.body;
  try {
    const Item = db.collection("Item").doc();
    const item = {
      cateID: cateID,
      name: name,
      price: price,
      quantity: quantity,
      image: image,
    };
    console.log("add item", item);
    Item.set(item);

    res.status(200).send({
      message: "Add item successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
//update
app.put("/updateItem/:docId", async (req, res) => {
  const { cateID, name, price, quantity, image } = req.body;
  try {
    const docId = req.params.docId;
    const body = db.collection("Item").doc(docId);
    const item = {
      cateID: cateID,
      name: name,
      price: price,
      quantity: quantity,
      image: image,
    };
    console.log("update", item);
    body.update(item);
    res.status(200).send({
      message: "update successful",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
//delete
app.delete("/deleteItem/:docId", async (req, res) => {
  try {
    const docId = req.params.docId;
    db.collection("Item").doc(docId).delete();
    res.status(200).send({
      message: "delete successful",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});



// // get details
// app.get("/detailCate/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const CateRef = db.collection("Category").doc(id);
//     CateRef.get().then((snapshot) => {
//       const items = snapshot.data();
//       console.log(items);
//       res.status(201).json(items);
//     });
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// });