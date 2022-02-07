const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User.js');

// @route   GET api/auth
// @desc    Validating a User
// @access  Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post(
  '/',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // req.body is the data that's going to be sent to this route.
    // in order for req.body to work we need to initialize the middleware for the body parser
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body); // data object

    const { email, password } = req.body;

    try {
      // 1. See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // 2. Check if there's a match in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // * sign: jwt.sign(payload, secret, options)
      jwt.sign(
        payload, // «« payload
        config.get('jwtSecret'), // «« requires the jwtSecret from our config/default.json file
        { expiresIn: 360000 }, // «« option: highly recommended || will change to 3600 when it comes to production
        (err, token) => {
          if (err) throw err; // «« if error, throw error,
          res.json({ token }); // «« if not, send token to client 🤩
        }
      );
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
