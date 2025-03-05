const { User, Role } = require('./model');

async function getRoleByName(roleName) {
    try {
        const role = await Role.findOne({ type: roleName });
        if (!role) {
            throw new Error('Error finding role');
        }
        return role;
    } catch (error) {
        console.error('Error finding role:', error);
        throw error;
    }
};

const searchUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
            // .populate('companyId')
            .populate('role')
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
    getRoleByName,
    searchUserByEmail,
    create,
}