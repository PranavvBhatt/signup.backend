
const User = require('../models/userModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => { 
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: `User registered with username ${username}` });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async(req,res) => {
    try{
    const { username , password } = req.body;
     const user = await User.findOne({username})
     if(!user){
         return res.status(404).json({ message: 'User not found' });
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch){
         return res.status(401).json({ message: 'Invalid credentials' });
     }
     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,{expiresIn: '1h'});
     res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
}