import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const createSub = async (req: Request, res: Response, next) => {
  const { name, title, description } = req.body;

  // 먼저 Sub을 생성할 수 있는 유저인지 체크를 위해 유저 정보 가져오기 (요청에서 보내주는 토큰을 이용)
  const token = req.cookies.token;
  if (!token) return next();

  const { username }: any = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOneBy({ username });

  // 유저 정보가 없다면 throw error!
  if (!user) throw new Error("Unauthenticated");
};

const router = Router();

router.post("/", createSub);

export default router;
