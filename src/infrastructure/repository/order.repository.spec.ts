import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel, OrderModel, OrderItemModel, ProductModel
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [ordemItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    price: ordemItem.price,
                    quantity: ordemItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [ordemItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: "123" }, include: ["items"] })

        expect(orderModel.toJSON()).toHaveProperty("id", "123")

        ordemItem.alterarQuantidade = 3

        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findOne({ where: { id: "123" }, include: ["items"] })

        expect(updatedOrderModel.toJSON().items).toHaveLength(1)
        expect(updatedOrderModel.toJSON()).toHaveProperty("items[0].quantity", 3)
    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [ordemItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: "123" }, include: ["items"] })
        const storedOrder = await orderRepository.find("123")

        expect(orderModel.toJSON()).toHaveProperty("id", storedOrder.id)
        expect(orderModel.toJSON()).toHaveProperty("customer_id", storedOrder.customerId)
        expect(orderModel.toJSON()).toHaveProperty("total", storedOrder.total())

        expect(storedOrder.items).toHaveLength(1)
        expect(orderModel.toJSON()).toHaveProperty("items[0].id", storedOrder.items[0].id)
        expect(orderModel.toJSON()).toHaveProperty("items[0].name", storedOrder.items[0].name)
        expect(orderModel.toJSON()).toHaveProperty("items[0].price", storedOrder.items[0].price)
        expect(orderModel.toJSON()).toHaveProperty("items[0].product_id", storedOrder.items[0].productId)
        expect(orderModel.toJSON()).toHaveProperty("items[0].quantity", storedOrder.items[0].quantity)
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        const product2 = new Product("124", "Product 2", 20);
        await productRepository.create(product);
        await productRepository.create(product2);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        const ordemItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            1
        );

        const order = new Order("123", "123", [ordemItem]);
        const order2 = new Order("124", "123", [ordemItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = [order, order2]
        const storedOrders = await orderRepository.findAll()

        expect(storedOrders).toHaveLength(2)
        
        expect(orders).toEqual(storedOrders);
    });
});