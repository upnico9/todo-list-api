import jwt from "jsonwebtoken"; 

export function authenticate(req, res, next) {
  // check if the user is authenticated
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Authorization header is required'});
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      return res.status(403).json({message: 'Invalid token'});
    }
 
    req.user = user;
    next();
  });

}