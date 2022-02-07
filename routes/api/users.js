const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User.js');
const gravatar = require('gravatar/lib/gravatar');

// @route   POST api/users
// @desc    Register user
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'The password must have 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // req.body is the data that's going to be sent to this route.
    // in order for req.body to work we need to initialize the middleware for the body parser
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body); // data object

    const { name, email, password } = req.body;

    try {
      // 1. See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // 2. Get User gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // 3. Encrypt password
      user = new User({
        // «« this doesn't save the user, in order to save this we need to call the save() function.
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10); // bcrypt rounds

      user.password = await bcrypt.hash(password, salt); // this creates a hash password

      await user.save(); // new user being saved

      // 4. Return jsonwebtoken
      // * Create our payload
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
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
