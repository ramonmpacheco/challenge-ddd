import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
    static createWithAddress(nome: string): Customer {
        let customer = this.create(nome)
        const address = new Address("r", 12, "123432234", "J")
        customer.Address = address
        return customer
    }

    public static create(nome: string): Customer {
        return new Customer(uuid(), nome)
    }
}