import express from "express";
import routerCart from "../routes/api/carts.router.js";
import handlebars from "express-handlebars";
import routerRealTimeProducts from "../routes/api/realTimeProducts.router.js";
import mongoose from "mongoose";
import routerSessionsViews from "../routes/web/views.router.js";
import { passportInitialize } from "../middlewares/passport.js";
import { apiRouter } from "../routes/api/api.router.js";
import cookieParser from "cookie-parser";
import { responseMethods } from "../middlewares/responseMethods.js";
import { routerChat } from "../routes/api/chat.router.js";
import { mockingProductsRouter } from "../routes/api/mockingproducts.router.js";
import { winstonLogger } from "../utils/logger.js";
import { logger } from "../middlewares/logger.js";
import { loggerTestRouter } from "../routes/api/loggerTest.router.js";
import cors from "cors";
import { MONGODB_CNX_STR } from "../config/mongodbCnxStr.js";

export const app = express();

//Conecting with ATLASDB
await mongoose.connect(MONGODB_CNX_STR); //Temporary

winstonLogger.info(`connected to mongodb in ${MONGODB_CNX_STR}`)

app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(responseMethods);
app.use(logger);
app.use(cors());

//Here I tell to express that he uses passport
app.use(passportInitialize);

// Router for Cart
app.use("/api/carts", routerCart);

// Router for Sockets
app.use("/realtimeproducts", routerRealTimeProducts);

// Router for Apu
app.use("/api", apiRouter);

// Router for User Sessions Views
app.use("/", routerSessionsViews);

// Router for chat
app.use("/", routerChat);

//Router for Mocks
app.use("/", mockingProductsRouter);

//Router for loggerTest
app.use("/", loggerTestRouter);

// If the user put a unknow route
app.get("*", (req, res, next) => {
  res["sendClientError"]("Unknown Route: " + req.url);
});

