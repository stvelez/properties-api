import express from 'express';
import { login } from './auth.controller.js';

const router = express.Router();

router.route("/").post(login);

export default router;