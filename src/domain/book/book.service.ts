import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BookGetListRequest } from './request/book-get-list.request';

@Injectable()
export class BookService {
    constructor(private prismaService: PrismaService) {}

    async getList(query: BookGetListRequest) {}
}
