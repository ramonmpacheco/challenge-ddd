import productFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update-product-usecase"


const product = productFactory.create('a', 'Tv', 1)

const input = {
    id: product.id,
    name: 'Tv Updated',
    price: 1000,
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test update product use case', () => {
    it('should update a product', async () => {
        const productRepository = MockRepository()
        const updateProductUseCase = new UpdateProductUseCase(productRepository)

        const result = await updateProductUseCase.execute(input)

        expect(result).toStrictEqual(input)
    })
})