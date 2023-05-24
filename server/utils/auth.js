const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  
  authMiddleware: async (resolve, root, args, context, info) => {
    
    const token = context.token;

    if (!token) {
      throw new Error('You have no token!');
    }

    
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data;
    } catch (error) {
      console.log('Invalid token');
      throw new Error('Invalid token!');
    }

    
    const result = await resolve(root, args, context, info);
    return result;
  },

  
  signToken: ({ username, email, _id }) => {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};