const User = require('./model');

const searchUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email })
      .populate('companyId')
      .populate('roles')
    return user;
  } catch (error) {
    throw new Error('Error finding user by email: ' + error.message);
  }
};

async function create(data, options = {}) {
  try {
    const newUser = User.create(data);
    
    if (!newUser) {
      throw new Error('Error creating user: User creation failed');
    }

    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

module.exports = {
  create,
  searchUserByEmail,
}