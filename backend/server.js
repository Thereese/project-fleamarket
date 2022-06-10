import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/project-fleamarket";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const MarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
const Market = mongoose.model("Market", MarketSchema);

//REGISTER NEW USER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({
        response: "Username already exists",
        success: false,
      });
    }
    if (password.length < 8) {
      res.status(406).json({
        response: "Password must be at least 8 characters long",
        success: false,
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id,
        },
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

//LOGIN USER
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        username: user.username,
        accessToken: user.accessToken,
        userId: user._id,
      });
    } else {
      res.status(400).json({
        response: "username and password don´t match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

//AUTHENTICATES USER
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};

//POST A NEW FLEAMARKET//USER NEEDS TO BE LOGGED IN
app.post("/markets", authenticateUser);
app.post("/markets", async (req, res) => {
  const { name, date, starttime, endtime, location, description } = req.body;

  try {
    if (description.length < 6) {
      res.status(400).json({
        response: "Description must be at least 6 characters long",
        success: false,
      });
    } else {
      const newMarket = await new Market({
        name: name,
        date: date,
        starttime: starttime,
        endtime: endtime,
        location: location,
        description: description,
      }).save();
      res.status(201).json({
        response: {
          name: newMarket.name,
          date: newMarket.date,
          starttime: newMarket.starttime,
          endtime: newMarket.endtime,
          location: newMarket.location,
          description: newMarket.description,
        },
        success: true,
      });
    }
  } catch (error) {
    res.status(401).json({
      response: error,
      success: false,
    });
  }
});

//RETURN ALL FLEAMARKETS, SORTED IN ASCENDING ORDER, NOT LOGGED IN MODE//CHECK
//TRY TO REMOVED PASSED DATES FROM LIST//NOT SOLVED
app.get("/markets", async (req, res) => {
  const markets = await Market.find().sort({ date: 1 });
  res.json(markets);
});

//SETUP WHEN LOGIN IS REQUIRED FOR PAGE
app.get("/add", authenticateUser);
app.get("/add", (req, res) => {
  res.send("here is the addpage");
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
