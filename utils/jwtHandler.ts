import jwt from 'jsonwebtoken';
const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
}

export default generateToken;

