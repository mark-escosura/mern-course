/**
 * Create a profile model
 * 1. const mongoose = require('mongoose');
 *
 * 2. const ProfileSchema = new mongoose.Schema({
 *  user: { we wanna make a reference to the user model because every profile should be associated with the user
 *    type: mongoose.Schema.Types.ObjectId «« this is a special field type === ObjectId
 * }
 * })
 */

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    // For Example: Developer, Senior Developer, Junior, etc. // dropdown
    type: String,
    required: true,
  },
  skills: {
    type: [String], // «« an array of strings thats why there are brackets around this
    required: true, // «« this is also required because it has to show on the profile
    // the way they enter skills in the UI in react, is a comma separated value list
  },
  bio: {
    type: String,
  },
  githubusername: {
    // gonna be working with GitHub api
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean, // «« this is going to be a checkbox for those who currently work there
        default: false, // «« set default to false \\ unchecked
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

/**
 * We should be able to bring this profile in to our profile routes
 * We should be able to query the database, and perform CRUD operations.
 */
