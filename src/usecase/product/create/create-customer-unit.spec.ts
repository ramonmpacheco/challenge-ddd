import CreateProductUseCase from "./create-product-usecase"

const input = {
  type: 'a',
  name: 'Tv',
  price: 1000,
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const result = await createProductUseCase.execute(input)

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    }

    expect(result).toStrictEqual(output)
  })
})