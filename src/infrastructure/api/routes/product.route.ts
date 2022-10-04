import express, { Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create-product-usecase'
import ListProductUseCase from '../../../usecase/product/list/list-product-usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'


export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
    try {
        const usecase = new CreateProductUseCase(new ProductRepository())
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
        }
        const output = await usecase.execute(productDto)
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRoute.get('/', async (req: Request, res: Response) => {
    try {
        const usecase = new ListProductUseCase(new ProductRepository())
        const output = await usecase.execute()
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})