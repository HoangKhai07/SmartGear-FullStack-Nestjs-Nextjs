import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateProductRequest } from 'src/products/dto/create-product.request';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { ProductsService } from 'src/products/products.service';


@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createProduct(
        @Body() body: CreateProductRequest,
        @CurrentUser() user: TokenPayload
    ){
       return this.productService.createProduct(body, user.userId)
    }
}
