import express from "express";
import { authMiddleware } from "./auth/jwt.middleware";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

// import routes
import authRouter from "./auth/auth.routes";
import customerRouter from "./modules/customers/user.routes";
import serviceProviderRouter from "./modules/providers/provider.routes";
import serviceRequestRouter from "./modules/requests/request.routes";
import feedbackRouter from "./modules/feedback/feedback.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", authMiddleware, customerRouter);
app.use("/api/providers", authMiddleware, serviceProviderRouter);
app.use("/api/requests", authMiddleware, serviceRequestRouter);
app.use("/api/feedback", authMiddleware, feedbackRouter);

// error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
