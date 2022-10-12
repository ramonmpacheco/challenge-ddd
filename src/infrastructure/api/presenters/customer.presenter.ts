import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static toXML(data: OutputListCustomerDto): string {
        const xmlOpt = {
            header: true,
            indent: " ",
            newline: "\n",
            allowEmpty: true,
        };
        return toXML({
            customers: {
                customer: data.customers.map(it => ({
                    id: it.id,
                    name: it.name,
                    address: {
                        street: it.address.street,
                        number: it.address.number,
                        zip: it.address.zip,
                        city: it.address.city
                    }
                }))
            }
        }, xmlOpt)
    }
}