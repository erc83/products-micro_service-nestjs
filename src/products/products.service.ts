import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductService')
  
  onModuleInit() {
    //throw new Error('Method not implemented.');
    this.$connect
    this.logger.log('Database connected with Prisma')
  }

  create(createProductDto: CreateProductDto) {
    
    return this.product.create({                                   // product del prisma client model Product
      data: createProductDto
      //data: {
      //  name: "telefono",
      //  price: 100
      //}

    })
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
