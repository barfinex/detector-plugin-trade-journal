import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('trade_journal')
export class TradeJournalEntity {
    @ObjectIdColumn()
    @ApiProperty({ description: 'Mongo ObjectId' })
    _id: string;

    @Column()
    @ApiProperty({ description: 'GUID плагина (studioGuid)' })
    studioGuid: string;

    @Column()
    @ApiProperty({ description: 'Ключ детектора (уникальный sysname/key)' })
    detectorKey: string;

    @Column()
    @ApiProperty({ description: 'Название инстанса детектора' })
    detectorInstance: string;

    @Column()
    @ApiProperty({ description: 'Дата события (ISO)' })
    date: string;

    @Column()
    @ApiProperty({ description: 'Тикер инструмента (например, BTC/USDT)' })
    ticker: string;

    @Column()
    @ApiProperty({ description: 'long/short (направление позиции или сделки)' })
    direction: string;

    @Column()
    @ApiProperty({ description: 'market/limit/position (тип события)' })
    orderType: string;

    @Column('float')
    @ApiProperty({ description: 'Цена входа' })
    entryPrice: number;

    @Column('float', { nullable: true })
    @ApiProperty({ description: 'Объем позиции/сделки', required: false })
    volume?: number;

    @Column('float')
    @ApiProperty({ description: 'StopLoss %' })
    stopLossPercent: number;

    @Column('float')
    @ApiProperty({ description: 'Цена TakeProfit' })
    takeProfitPrice: number;

    @Column('float')
    @ApiProperty({ description: 'Отношение SL:TP' })
    riskReward: number;

    @Column()
    @ApiProperty({ description: 'Стиль входа' })
    entryStyle: string;

    @Column()
    @ApiProperty({ description: 'Результат (open/closed/win/loss)' })
    result: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Комментарий по итогу торговли', required: false })
    comment?: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Причина выхода', required: false })
    exitReason?: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Сработал ли SL (+/-)', required: false })
    stopLossTriggered?: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Тип тейка', required: false })
    takeProfitType?: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Максимум/минимум, куда дошла цена', required: false })
    reachedPrice?: number;

    @Column({ default: false })
    @ApiProperty({ description: 'Флаг: запись о позиции (true) или о сделке (false)' })
    isPosition: boolean;
}
