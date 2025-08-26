import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '12h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
