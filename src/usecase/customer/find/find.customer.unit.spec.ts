import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
customer.Address = address;

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test find customer usecase", () => {

    it("should find a customer", async () => {
        // Arrange
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository)

        // Act
        const input = { id: "123" }
        const result = await usecase.execute(input);

        // Assert
        const output = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 1,
                zip: "Zipcode 1",
            }
        }

        expect(result).toEqual(output)
    });

    it("should not find a customer", () => {
        // Arrange
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        })
        const usecase = new FindCustomerUseCase(customerRepository)

        // Act and Assert
        const input = { id: "123" }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    })
})