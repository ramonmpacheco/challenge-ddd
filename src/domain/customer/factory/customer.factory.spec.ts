import CustomerFactory from "./customer.factory";

describe("customer factory unit test", () => {
    it("", () => {
        let customer = CustomerFactory.create("John")

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John")
        expect(customer.Address).toBeUndefined()
    });

    it("should create a customer with an address", () => {
        const customer = CustomerFactory.createWithAddress("John")

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John")
        expect(customer.Address).toBeDefined()
        expect(customer.Address.street).toBe("r")
    })
});