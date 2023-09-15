import userService from '../services/user-service.js';

export const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.register(request);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.login(request);

    res
      .status(200)
      .cookie('refresh_token', result.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      .json({ data: { access_token: result.accessToken } });
  } catch (e) {
    next(e);
  }
};

export const get = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await userService.get(userId);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    await userService.logout(refreshToken);

    res.clearCookie('refresh_token');
    res.status(200).json({ data: 'OK' });
  } catch (e) {
    next(e);
  }
};
