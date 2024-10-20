import { Hono } from "hono";
import { getUser } from "../_services/apiUsersService";

const app = new Hono();

app.get("/:id", (c) => getUser(c));

export default app;
