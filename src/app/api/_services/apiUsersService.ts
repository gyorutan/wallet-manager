import prisma from "@/lib/db";
import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";

export const getUser = async (c: Context<BlankEnv, "/:id", BlankInput>) => {
  const userId = Number(c.req.param("id"));

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return c.json({
      success: false,
    });
  }

  return c.json({
    success: true,
  });
};
