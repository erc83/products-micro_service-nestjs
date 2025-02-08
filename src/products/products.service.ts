import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BadRequestException } from '@nestjs/common';

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

  async findAll( paginationDto: PaginationDto ) {
    
    const { page, limit } = paginationDto
    
    const totalProducts = await this.product.count()

    const lastPage = Math.ceil( totalProducts / limit )

    if( page > lastPage && totalProducts > 0 ) {
      throw new BadRequestException(`La página solicitada (${ page }) excede el número total de páginas (${ lastPage })`)
    }

    return {
      data: await this.product.findMany({
        skip: ( page - 1 ) * limit,          
        take: limit       // take    ->   cantidad de registro en Prisma
      }),
      meta: {
        page: page,
        totalProducts: totalProducts,
        lastPage: lastPage,
      }
    }
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
