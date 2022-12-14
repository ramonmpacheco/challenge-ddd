import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: ProductModel;

    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    toDomainOrderItem(): OrderItem {
        return new OrderItem(
            this.id,
            this.name,
            this.price,
            this.product_id,
            this.quantity
        )
    }
}