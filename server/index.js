import express from "express";
import cors from "cors";
import multer from "multer";
import db from "./config/Database.js";
import Bevs from "./models/BevModel.js";
import MoodBevs from "./models/MoodBevModel.js";
import Foods from "./models/FoodModel.js";
import FoodPairings from "./models/FoodPairingModel.js";
import Moods from "./models/MoodModel.js";
import User from "./models/UserModel.js";
import fs from "fs";
import path from "path";

import bcrypt from "bcrypt";
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//login user
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong Password" });
    }
    const { id, uuid, name, email: userEmail, role } = user;
    res.status(200).json({ id, uuid, name, email: userEmail, role });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get all users
app.get('/users', async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['id', 'uuid', 'name', 'email', 'password', 'role', 'createdAt', 'updatedAt']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'name', 'email', 'password', 'role'],
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//create user
app.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ msg: "Email sudah digunakan" });
  }
  const existingName = await User.findOne({ where: { name: name } });
  if (existingName) {
    return res.status(400).json({ msg: "Nama sudah digunakan" });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10); // Specify the number of salt rounds
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//update user
app.put('/users/:id', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json({ msg: "User updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


//delete user
app.delete('/users/:id', async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//get all foods
app.get('/foods', async (req, res) => {
  try {
    const response = await Foods.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'desc', 'createdAt', 'updatedAt'],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/foodss', async (req, res) => {
  try {
    const response = await FoodPairings.findAll({
      // attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'desc', 'createdAt', 'updatedAt'],
      include: [{
        model: Foods,
        as: 'food',
      }]
    });

    const result = response.map(item => {
      return {
        id: item.food.id,
        bevId: item.bevId,
        name: item.food.name,
        price: item.food.price,
        ings: item.food.ings,
        img1: item.food.img1,
        img2: item.food.img2,
        img3: item.food.img3,
        desc: item.food.desc
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get food by ID
app.get('/foods/:id', async (req, res) => {
  try {
    const food = await Foods.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id' ,'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'desc'],
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/img/'); // Set the destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // Set the file name
  }
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

// Create food
app.post('/foods', upload.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]), async (req, res) => {
  const { name, price, ings, desc, userId } = req.body;
  const images = req.files;

  try {
    if (!images.img1 || !images.img2 || !images.img3) {
      throw new Error('Please upload 3 images');
    }

    const img1 = images.img1[0].filename;
    const img2 = images.img2[0].filename;
    const img3 = images.img3[0].filename;
    await Foods.create({
      name: name,
      price: price,
      ings: ings,
      img1: img1,
      img2: img2,
      img3: img3,
      desc: desc,
      userId: userId,
    });

    res.status(201).json({ msg: "Food Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
});

// Update food
app.put('/foods/:id', upload.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]), async (req, res) => {
  try {
    const food = await Foods.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { name, price, ings, desc, userId } = req.body;
    const images = req.files;

    if (images.img1) {
      // Menghapus gambar lama
      if (food.img1) {
        const oldImagePath = path.join('../client/public/img/', food.img1);
        fs.unlinkSync(oldImagePath);
      }
      food.img1 = images.img1[0].filename;
    }
    if (images.img2) {
      // Menghapus gambar lama
      if (food.img2) {
        const oldImagePath = path.join('../client/public/img/', food.img2);
        fs.unlinkSync(oldImagePath);
      }
      food.img2 = images.img2[0].filename;
    }
    if (images.img3) {
      // Menghapus gambar lama
      if (food.img3) {
        const oldImagePath = path.join('../client/public/img/', food.img3);
        fs.unlinkSync(oldImagePath);
      }
      food.img3 = images.img3[0].filename;
    }

    // Lakukan pembaruan data makanan
    await Foods.update(
      { name, price, ings, img1: food.img1, img2: food.img2, img3: food.img3, desc, userId },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json({ msg: "Food updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete food
app.delete('/foods/:id', async (req, res) => {
  try {
    const food = await Foods.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!food) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    // Menghapus gambar jika ada
    if (food.img1) {
      const imagePath = path.join('../client/public/img/', food.img1);
      fs.unlinkSync(imagePath);
    }
    if (food.img2) {
      const imagePath = path.join('../client/public/img/', food.img2);
      fs.unlinkSync(imagePath);
    }
    if (food.img3) {
      const imagePath = path.join('../client/public/img/', food.img3);
      fs.unlinkSync(imagePath);
    }

    // Menghapus data makanan
    await Foods.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ msg: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});



// BEVERAGE
//Get all beverage
app.get('/bevs', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get bevs by ID
app.get('/bevs/:id', async (req, res) => {
  try {
    const bev = await Bevs.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type'],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });

    if (!bev) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    res.status(200).json(bev);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/moodbevs/angry', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: MoodBevs,
        where: { moodId: 1 }, // Filter MoodBevs based on moodId
        attributes: []
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/moodbevs/disgust', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: MoodBevs,
        where: { moodId: 2 }, // Filter MoodBevs based on moodId
        attributes: []
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/moodbevs/fear', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: MoodBevs,
        where: { moodId: 3 }, // Filter MoodBevs based on moodId
        attributes: []
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/moodbevs/happy', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: MoodBevs,
        where: { moodId: 4 }, // Filter MoodBevs based on moodId
        attributes: []
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/moodbevs/neutral', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: MoodBevs,
        where: { moodId: 5 }, // Filter MoodBevs based on moodId
        attributes: []
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/moodbevs/sad', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: MoodBevs,
        where: { moodId: 6 }, // Filter MoodBevs based on moodId
        attributes: []
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/moodbevs/surprise', async (req, res) => {
  try {
    const response = await Bevs.findAll({
      attributes: ['id', 'uuid', 'name', 'price', 'ings', 'img1', 'img2', 'img3', 'highlight', 'tsp', 'tspg', 'water', 'temp', 'time', 'desc', 'type', 'createdAt', 'updatedAt'],
      include: [{
        model: MoodBevs,
        where: { moodId: 7 }, // Filter MoodBevs based on moodId
        attributes: []
      }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Multer storage configuration
const BevStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/bev-img/'); // Set the destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // Set the file name
  }
});

// Create the Multer upload instance
const uploadBev = multer({ storage: BevStorage });

// Create Bev
app.post('/bevs', uploadBev.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]), async (req, res) => {
  const { name, price, ings, highlight, tsp, tspg, water, temp, time, desc, type, userId } = req.body;
  const images = req.files;

  try {
    if (!images.img1 || !images.img2 || !images.img3) {
      throw new Error('Please upload 3 images');
    }

    const img1 = images.img1[0].filename;
    const img2 = images.img2[0].filename;
    const img3 = images.img3[0].filename;
    await Bevs.create({
      name: name,
      price: price,
      ings: ings,
      img1: img1,
      img2: img2,
      img3: img3,
      highlight: highlight,
      tsp: tsp,
      tspg: tspg,
      water: water,
      temp: temp,
      time: time,
      desc: desc,
      type: type,
      userId: userId,
    });

    res.status(201).json({ msg: "Beverage Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
});

// Update bev
app.put('/bevs/:id', uploadBev.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 }
]), async (req, res) => {
  try {
    const bev = await Bevs.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!bev) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { name, price, ings, highlight, tsp, tspg, water, temp, time, desc, type, userId } = req.body;
    const images = req.files;

    if (images.img1) {
      // Menghapus gambar lama
      if (bev.img1) {
        const oldImagePath = path.join('../client/public/bev-img/', bev.img1);
        fs.unlinkSync(oldImagePath);
      }
      bev.img1 = images.img1[0].filename;
    }
    if (images.img2) {
      // Menghapus gambar lama
      if (bev.img2) {
        const oldImagePath = path.join('../client/public/bev-img/', bev.img2);
        fs.unlinkSync(oldImagePath);
      }
      bev.img2 = images.img2[0].filename;
    }
    if (images.img3) {
      // Menghapus gambar lama
      if (bev.img3) {
        const oldImagePath = path.join('../client/public/bev-img/', bev.img3);
        fs.unlinkSync(oldImagePath);
      }
      bev.img3 = images.img3[0].filename;
    }

    // Lakukan pembaruan data makanan
    await Bevs.update(
      { name, price, ings, img1: bev.img1, img2: bev.img2, img3: bev.img3, highlight, tsp, tspg, water, temp, time, desc, type, userId },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json({ msg: "Beverage updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete bev
app.delete('/bevs/:id', async (req, res) => {
  try {
    const bev = await Bevs.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!bev) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    // Menghapus gambar jika ada
    if (bev.img1) {
      const imagePath = path.join('../client/public/bev-img/', bev.img1);
      fs.unlinkSync(imagePath);
    }
    if (bev.img2) {
      const imagePath = path.join('../client/public/bev-img/', bev.img2);
      fs.unlinkSync(imagePath);
    }
    if (bev.img3) {
      const imagePath = path.join('../client/public/bev-img/', bev.img3);
      fs.unlinkSync(imagePath);
    }

    // Menghapus data makanan
    await Bevs.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ msg: "Beverage deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Get all foodpairings
app.get('/foodpairings', async (req, res) => {
  try {
    const response = await FoodPairings.findAll({
      include: [
        {
          model: Foods,
          attributes: ['name'],
          as: 'food',
        },
        {
          model: User,
          attributes: ['name'],
          as: 'user',
        },
        {
          model: Bevs,
          attributes: ['name'],
          as: 'bev',
        },
      ],
    });

    const result = response.map(item => {
      return {
        id: item.id,
        foodName: item.food.name,
        bevName: item.bev.name,
        userName: item.user.name,
        updatedAt: item.updatedAt
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


//create foodpairings
app.post("/foodpairings", async (req, res) => {
  try {
    const { bevId, foodId, userId } = req.body;

    // Periksa apakah sudah ada entri FoodPairings dengan bevId dan foodId yang sama
    const existingPairing = await FoodPairings.findOne({
      where: { bevId, foodId },
    });

    if (existingPairing) {
      return res.status(400).json({ message: "Food pairing already exists!" });
    }

    await FoodPairings.create({
      bevId: bevId,
      foodId: foodId,
      userId: userId,
    });

    res.status(200).json({ message: "Food pairing saved successfully!" });
  } catch (error) {
    // Tangani error jika diperlukan
  }
});


// Edit food pairing
app.put('/foodpairings/:id', async (req, res) => {
  try {
    const { bevId, foodId, userId } = req.body;
    const foodPairingId = req.params.id;

    const foodPairing = await FoodPairings.findByPk(foodPairingId);

    if (!foodPairing) {
      return res.status(404).json({ message: 'Food pairing not found' });
    }

    await foodPairing.update({
      bevId: bevId,
      foodId: foodId,
      userId: userId,
    });

    res.status(200).json({ message: 'Food pairing updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete food pairing
app.delete('/foodpairings/:id', async (req, res) => {
  try {
    const foodPairingId = req.params.id;

    const foodPairing = await FoodPairings.findByPk(foodPairingId);

    if (!foodPairing) {
      return res.status(404).json({ message: 'Food pairing not found' });
    }

    await foodPairing.destroy();

    res.status(200).json({ message: 'Food pairing deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get All moods
app.get('/moods', async (req, res) => {
  try {
    const moods = await Moods.findAll();
    res.status(200).json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// Get All moodbev
app.get('/moodbevs', async (req, res) => {
  try {
    const response = await MoodBevs.findAll({
      include: [
        {
          model: Moods,
          attributes: ['type'],
          as: 'mood',
        },
        {
          model: Bevs,
          attributes: ['id', 'name'],
          as: 'bev',
        },
      ],
    });

    const result = response.map(item => {
      return {
        id: item.id,
        moodType: item.mood.type,
        bevId: item.bev.id,
        bevName: item.bev.name,
        updatedAt: item.updatedAt
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


// Create moodbevs
app.post("/moodbevs", async (req, res) => {
  try {
    const { bevId, moodIds } = req.body;

    // Retrieve existing MoodBev entries for the given bevId
    const existingMoodBevs = await MoodBevs.findAll({ where: { bevId } });
    const existingMoodIds = existingMoodBevs.map((moodBev) => moodBev.moodId);

    // Filter out duplicate moodIds
    const uniqueMoodIds = moodIds.filter((moodId) => !existingMoodIds.includes(moodId));

    // Create new MoodBev entries for the unique moodIds
    for (const moodId of uniqueMoodIds) {
      await MoodBevs.create({
        bevId: bevId,
        moodId: moodId,
      });
    }

    res.status(200).json({ message: "moodbev saved successfully!" });
  } catch (error) {
    // Handle the error if needed
  }
});

// Delete food pairing
app.delete('/moodbevs/:id', async (req, res) => {
  try {
    const moodBevId = req.params.id;

    const moodBev = await MoodBevs.findByPk(moodBevId);

    if (!moodBev) {
      return res.status(404).json({ message: 'Food pairing not found' });
    }

    await moodBev.destroy();

    res.status(200).json({ message: 'Food pairing deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(5000, () => {
  console.log("running server");
});