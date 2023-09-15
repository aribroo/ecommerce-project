import db from '../models/bundle-model.js';
import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) res.status(401).json({ errors: 'Unauthorize' });

    const user = await db.user.findOne({ where: { refresh_token: refreshToken } });

    if (!user) res.status(404).json({ errors: 'User not found' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) res.status(403).json({ errors: 'Forbidden' });

      console.log(decoded);
      const accessToken = jwt.sign(
        {
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1h'
        }
      );

      res.json({ access_token: accessToken });
    });
  } catch (e) {
    next(e);
  }
};
