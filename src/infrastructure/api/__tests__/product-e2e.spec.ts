import { app, sequelize } from "../express"
import request from "supertest"

describe('E2E test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const response = await request(app).post('/products').send({
            type: 'a',
            name: 'Tv',
            price: 100,
        })

        expect(response.status).toBe(200)
        expect(response.body.id).toEqual(expect.any(String))
        expect(response.body.name).toBe('Tv')
        expect(response.body.price).toBe(100)
    })

    it('should not create a product', async () => {
        const response = await request(app).post('/products').send({
            type: 'a',
            price: 100,
        })

        expect(response.status).toBe(500)
    })

    it('should list all product', async () => {
        const response = await request(app).post('/products').send({
            type: 'a',
            name: 'Tv',
            price: 100,
        })
        expect(response.status).toBe(200)

        const response2 = await request(app).post('/products').send({
            type: 'b',
            name: 'Pen drive',
            price: 200,
        })
        expect(response2.status).toBe(200)

        const listResponse = await request(app).get('/products').send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.products.length).toBe(2)
        
        const product = listResponse.body.products[0]
        expect(product.id).toEqual(expect.any(String))
        expect(product.name).toBe('Tv')
        expect(product.price).toBe(100)

        const product2 = listResponse.body.products[1]
        expect(product2.id).toEqual(expect.any(String))
        expect(product2.name).toBe('Pen drive')
        expect(product2.price).toBe(400)
    })
})