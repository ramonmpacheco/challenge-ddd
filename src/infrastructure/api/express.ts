import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import ProductModel from "../product/repository/sequelize/product.model";
import { customerRoute } from "./routes/customer.route";
import { productRoute } from "./routes/product.route";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute)
app.use('/products', productRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    // sync: { force: true },
  });
  await sequelize.addModels([CustomerModel])
  await sequelize.addModels([ProductModel])
  await sequelize.sync()
}

setupDb()