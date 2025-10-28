import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TradeJournalService } from './trade-journal.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { FilterTradeDto } from './dto/filter-trade.dto';

@ApiTags('Trade Journal')
@Controller('plugins-api/:studioGuid/trades')
export class TradeJournalController {
    constructor(private readonly service: TradeJournalService) { }


    @Post()
    @ApiOperation({ summary: 'Создать запись сделки' })
    create(@Body() dto: CreateTradeDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все сделки (с фильтрацией)' })
    findAll(@Query() filter: FilterTradeDto) {
        return this.service.findAll(filter);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить сделку по ID' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить сделку' })
    update(@Param('id') id: string, @Body() dto: UpdateTradeDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить сделку' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
