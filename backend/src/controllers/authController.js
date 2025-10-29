import { loginUser } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    console.log("token", token);
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Unable to Login User", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
  } catch (err) {
    console.error("Unable to logout User", err.message);
    res.status(400).json({ error: err.message });
  }
  return;
};
