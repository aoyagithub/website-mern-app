const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const { ArticleModel, UserModel } = require('./utils/schemaModels');
const connectDB = require('./utils/database');
const auth = require('./utils/auth');
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.qjq2rxt.mongodb.net/membership-mern-app?retryWrites=true&w=majority&appName=Cluster0`,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = 'Guest';
    res.locals.isLoggedIn = false;
  } else {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    req.session.userId = newUser._id;
    req.session.username = newUser.name;
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.username = user.name;
    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/', async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
});

app.get('/articles/:id', async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
});

app.use(auth);

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
