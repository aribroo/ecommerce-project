import db from '../models/bundle-model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { getUserValidation, loginValidation, registerValidation } from '../validation/user-schema.js';
import { validate } from '../validation/validation.js';
import { ResponseError } from '../error/response-error.js';
import { Op } from 'sequelize';

const register = async (request) => {
  request = validate(registerValidation, request);

  const checkUsername = await db.user.findAll({ where: { username: request.username } });

  if (checkUsername.length > 0) throw new ResponseError(400, 'Username already registered');

  request.password = await bcrypt.hash(request.password, 10);

  await db.user.create(request);
  return {
    username: request.username,
    email: request.email,
    phone_number: request.phone_number,
    address: request.address
  };
};

const login = async (request) => {
  request = validate(loginValidation, request);
  const user = await db.user.findOne({
    where: { [Op.or]: [{ username: request.username }, { phone_number: request.username }] }
  });

  if (!user) throw new ResponseError(400, 'Username or password is wrong');

  const isPasswordValid = await bcrypt.compare(request.password, user.password);

  if (!isPasswordValid) throw new ResponseError(400, 'Username or password is wrong');

  const userId = user.id;
  const username = user.username;
  const email = user.email;

  const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m'
  });

  const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d'
  });

  await db.user.update({ refresh_token: refreshToken }, { where: { id: userId } });

  return {
    accessToken,
    refreshToken
  };
};

const get = async (userId) => {
  userId = validate(getUserValidation, userId);

  const user = await db.user.findOne({
    attributes: ['id', 'username', 'email', 'phone_number', 'address'],
    where: { id: userId }
  });

  if (!user) throw new ResponseError(404, 'User not found');

  return user;
};

const logout = async (refreshToken) => {
  if (!refreshToken) throw new ResponseError(400, 'No refresh token provided');

  const user = await db.user.findOne({ where: { refresh_token: refreshToken } });

  if (!user) throw new ResponseError(404, 'User not found');

  await db.user.update({ refresh_token: null }, { where: { id: user.id } });
};

export default { register, login, get, logout };
