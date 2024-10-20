import prisma from "@/lib/db";
import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";
import * as bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { setCookie, deleteCookie } from "hono/cookie";

export const userLogin = async (c: Context<BlankEnv, "/login", BlankInput>) => {
  const { email, password } = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return c.json({
      success: false,
      message: "이메일 또는 비밀번호가 일치하지 않습니다.",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password!);

  if (!comparePassword) {
    return c.json({
      success: false,
      message: "이메일 또는 비밀번호가 일치하지 않습니다.",
    });
  }

  const payload = {
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4, // Token expires in 4 hours
  };

  const token = await sign(payload, process.env.JWT_SECRET!);

  console.log({ token });

  setCookie(c, "token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
  });

  return c.json({
    success: true,
    message: `${user.username}님 환영합니다. 로그인되었습니다.`,
    user,
  });
};

export const userRegister = async (
  c: Context<BlankEnv, "/register", BlankInput>
) => {
  const { username, email, password } = await c.req.json();

  console.log({ username });
  console.log({ email });
  console.log({ password });

  const isThereSameUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (isThereSameUsername) {
    return c.json({
      success: false,
      errorCode: "username",
      message: "이미 사용중인 닉네임입니다.",
    });
  }

  const isThereSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isThereSameEmail) {
    return c.json({
      success: false,
      errorCode: "email",
      message: "이미 사용중인 이메일입니다.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return c.json({
    success: true,
    message: "Wallet Manager 가입을 축하드립니다!",
    createdUser,
  });
};

export const userLogout = async (
  c: Context<BlankEnv, "/logout", BlankInput>
) => {
  deleteCookie(c, "token");

  return c.json({
    success: true,
    message: "성공적으로 로그아웃되었습니다.",
  });
};
