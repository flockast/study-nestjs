import {Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./product.model";
const nanoid = require('nanoid');

@Injectable()
export class ProductsService {
    products: Product[] = [];
    insertProduct(title: string, description: string, price: number) {
        const newProduct = new Product(nanoid(10).toString(), title, description, price);
        this.products.push(newProduct);
        return newProduct;
    }

    getProducts() {
        return [ ...this.products ];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product }
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title
        }
        if (description) {
            updatedProduct.description = description
        }
        if (price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct;
        return {...updatedProduct};
    }

    deleteProduct(productId: string) {
        const [_, index] = this.findProduct(productId);
        this.products.splice(index, 1);
        return null;
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(product => product.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException(`Could not find product by ${id}`);
        }
        return [product, productIndex];
    }
}