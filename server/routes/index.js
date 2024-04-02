var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const UserModel=require("../modules/user");

router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
    console.log(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

module.exports = router;
