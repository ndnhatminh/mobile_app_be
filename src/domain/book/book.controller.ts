import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { BookGetListRequest } from './request/book-get-list.request';

@Controller('/book')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async getList(@Query() query: BookGetListRequest){
        return this.bookService.getList(query);
    }
}
