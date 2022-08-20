import CustomerAddressUpdatedEvent from "../customer/customer-address-updated.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log2.handler";
import ProductCreatedThenSendEmailHandler from "../product/handler/product-created-then-send-email.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new ProductCreatedThenSendEmailHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new ProductCreatedThenSendEmailHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new ProductCreatedThenSendEmailHandler();
        const eventHandler2 = new ProductCreatedThenSendEmailHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("ProductCreatedEvent", eventHandler2)
        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined;
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new ProductCreatedThenSendEmailHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            id: "1",
            name: "tv",
            price: 1000.00
        });

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
    });

    // CUSTOMER

    it("should call all CustomerCreatedEvent handlers", () => {
        const eventDispatcher = new EventDispatcher()
        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
        const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(enviaConsoleLog1Handler, "handle")
        const spyEventHandler2 = jest.spyOn(enviaConsoleLog2Handler, "handle")

        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler)

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "John"
        });

        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should call CustomerAddressUpdatedEvent handler", () => {
        const eventDispatcher = new EventDispatcher()
        const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(enviaConsoleLogHandler, "handle")

        eventDispatcher.register("CustomerAddressUpdatedEvent", enviaConsoleLogHandler)

        const customerCreatedEvent = new CustomerAddressUpdatedEvent({
            id: "1",
            name: "John",
            address: {
                street: "Teste", 
                number: 12, 
                zip: "123456", 
                city: "Teste"
            }
        });

        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
    });
})