const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const { db } = require('./db');
db();


app.use(cors());
app.use(express.json());

const UserModel = require("./modules/user");

app.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
});

app.get("/users", async (req, res) => {
  try {
    const { name, domain, gender, available } = req.query;
    let filters = {};
    if (name) {
      filters.$or = [
        { first_name: { $regex: new RegExp(name, 'i') } },
        { last_name: { $regex: new RegExp(name, 'i') } }
      ];
    }
    if (domain) {
      filters.domain = domain;
    }
    if (gender) {
      filters.gender = gender;
    }
    if (available !== undefined && available !== '') {
      filters.available = available;
    }
    const users = await UserModel.find(filters);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
