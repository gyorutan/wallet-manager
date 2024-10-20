import { Hono } from "hono";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../_services/apiAuthService";

const app = new Hono();

app.post("/login", (c) => userLogin(c));
app.post("/register", (c) => userRegister(c));
app.get("/logout", (c) => userLogout(c));

export default app;
