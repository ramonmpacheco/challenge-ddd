import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Customer 1")

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test update customer usecase", () => {

    it("should update a customer", async () => {
        // Arrange
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository)

        // Act
        const result = await usecase.execute(input);

        // Assert
        expect(result).toEqual(input)
    });
})