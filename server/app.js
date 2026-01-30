import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import ideaRoutes from "./routes/idea.route.js";
import voteRoutes from "./routes/vote.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
      res.status(200).json({ msg: "API calls working fine" });
});

app.use("/api/auth", authRoutes);
app.use("/api/idea", ideaRoutes);
app.use("/api/vote", voteRoutes);

export default app;