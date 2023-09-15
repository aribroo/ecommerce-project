import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) res.status(401).json({ errors: 'Unauthorize' });

  const token = auth.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) res.status(403).json({ errors: 'Forbidden' });

    const user = {
      id: decoded.userId
    };

    req.user = user;
    next();
  });
};

export default authMiddleware;
