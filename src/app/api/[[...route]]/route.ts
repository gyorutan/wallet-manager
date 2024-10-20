import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "./auth";
import users from "./users";

const app = new Hono().basePath("/api");

app.route("/auth", auth);
app.route("/users" , users);

export const GET = handle(app);
export const POST = handle(app);
