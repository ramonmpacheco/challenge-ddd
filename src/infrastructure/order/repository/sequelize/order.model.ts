import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel, { onUpdate: "CASCADE", hooks: true })
    declare items: OrderItemModel[];

    @Column({ allowNull: false })
    declare total: number;

    toDomainOrder(): Order {
        return new Order(
            this.id,
            this.customer_id,
            this.items.map(it => it.toDomainOrderItem())
        )
    }
}