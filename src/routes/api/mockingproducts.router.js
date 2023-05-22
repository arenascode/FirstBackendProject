import { Router } from "express";
import { poblarDB } from "../../scripts/poblarDB.js";

export const mockingProductsRouter = Router()

mockingProductsRouter.get('/mockingproducts', async (req, res, next) => {
  const fakeProducts = await poblarDB()
  res.json(fakeProducts)
})