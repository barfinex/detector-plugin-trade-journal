import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    PluginMeta,
    PluginHook,
    PluginContext,
    Account,
    Position,
} from '@barfinex/types';
import { DetectorPluginService } from '@barfinex/detector/detector-plugin.service';

import { TradeJournalEntity } from './entities/trade-journal.entity';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { FilterTradeDto } from './dto/filter-trade.dto';

@Injectable()
export class TradeJournalService extends DetectorPluginService {
    readonly name = 'TradeJournal';

    readonly meta: PluginMeta = {
        studioGuid: 'trade-journal-dev',
        title: 'Trade Journal',
        description: 'Журнал сделок для ручного и автоматического логирования',
        version: '0.1.0',
        author: 'Barfinex',
        visibility: 'public',
        pluginApi: '/plugins-api/trade-journal-dev',
    };

    // 🔹 Публичный API
    api = {
        create: (dto: CreateTradeDto) => this.create(dto),
        findAll: (filter: FilterTradeDto) => this.findAll(filter),
        findOne: (id: string) => this.findOne(id),
        update: (id: string, dto: UpdateTradeDto) => this.update(id, dto),
        remove: (id: string) => this.remove(id),
    };

    constructor(
        @InjectRepository(TradeJournalEntity)
        private readonly repo: Repository<TradeJournalEntity>,
    ) {
        super();
    }

    // ================= Реализация хуков =================

    // async [PluginHook.onInit](ctx: PluginContext): Promise<void> {
    //     this.logger.log(`[onInit] ${this.name} for ${ctx.detectorContext.name}`);
    // }

    async [PluginHook.onInit](ctx: PluginContext): Promise<void> {
        // console.log("test!!!!");
        this.logger.log(`[onInit] ${this.name} for ${ctx.detectorContext.name}`);
    }


    async [PluginHook.onStart](ctx: PluginContext): Promise<void> {
        this.logger.log(`[onStart] ${this.name} → проверка и синхронизация позиций`);

        const account = ctx.detectorContext.account;
        if (!account) {
            this.logger.warn(`[onStart] ${this.name} → account отсутствует`);
            return;
        }

        // Активные позиции
        const activePositions = account.positions ?? [];

        // Сохраняем/обновляем активные позиции
        for (const pos of activePositions) {
            await this.upsertPosition(ctx, pos, account);
        }

        // Загружаем все записи позиций из журнала
        const existingPositions = await this.repo.find({
            where: {
                // studioGuid: ctx.studioGuid,
                detectorKey: ctx.detectorContext.key,
                isPosition: true,
            },
        });

        // Определяем закрытые
        const activeTickers = new Set(activePositions.map((p) => p.symbol.name));

        for (const journalPos of existingPositions) {
            if (!activeTickers.has(journalPos.ticker)) {
                this.logger.log(
                    `[onStart] Закрытие позиции ${journalPos.ticker}`,
                );
                journalPos.result = 'closed';
                journalPos.exitReason = 'position_closed';
                journalPos.date = new Date().toISOString();
                await this.repo.save(journalPos);
            }
        }

        this.logger.log(`[onStart] ${this.name} → синхронизация завершена`);
    }



    async [PluginHook.onAccountUpdate](
        ctx: PluginContext,
        account: Account,
    ): Promise<void> {
        this.logger.log(
            `[onAccountUpdate] ${this.name} → ${account.connectorType}/${account.marketType}`,
        );

        // 1. Активные позиции из аккаунта
        const activePositions = account.positions ?? [];

        // 2. Сохраняем/обновляем активные позиции
        for (const pos of activePositions) {
            await this.upsertPosition(ctx, pos, account);
        }

        // 3. Загружаем все позиции из журнала по данному детектору
        const existingPositions = await this.repo.find({
            where: {
                // studioGuid: ctx.studioGuid,
                detectorKey: ctx.detectorContext.key,
                isPosition: true,
            },
        });

        // 4. Определяем закрытые (которых больше нет в account.positions)
        const activeTickers = new Set(activePositions.map((p) => p.symbol.name));

        for (const journalPos of existingPositions) {
            if (!activeTickers.has(journalPos.ticker)) {
                this.logger.log(
                    `[onAccountUpdate] Закрытие позиции ${journalPos.ticker}`,
                );
                journalPos.result = 'closed';
                journalPos.exitReason = 'position_closed';
                journalPos.date = new Date().toISOString();
                await this.repo.save(journalPos);
            }
        }
    }


    // ================= CRUD =================

    async create(dto: CreateTradeDto): Promise<TradeJournalEntity> {
        const trade = this.repo.create(dto);
        return this.repo.save(trade);
    }

    async findAll(filter: FilterTradeDto): Promise<TradeJournalEntity[]> {
        const qb = this.repo.createQueryBuilder('trade');
        if (filter.studioGuid)
            qb.andWhere('trade.studioGuid = :studioGuid', { studioGuid: filter.studioGuid });
        if (filter.detectorKey)
            qb.andWhere('trade.detectorKey = :detectorKey', { detectorKey: filter.detectorKey });
        if (filter.ticker)
            qb.andWhere('trade.ticker = :ticker', { ticker: filter.ticker });
        if (filter.direction)
            qb.andWhere('trade.direction = :direction', { direction: filter.direction });
        if (filter.fromDate)
            qb.andWhere('trade.date >= :fromDate', { fromDate: filter.fromDate });
        if (filter.toDate)
            qb.andWhere('trade.date <= :toDate', { toDate: filter.toDate });
        return qb.getMany();
    }

    async findOne(id: string): Promise<TradeJournalEntity> {
        const trade = await this.repo.findOne({ where: { _id: id } });
        if (!trade) throw new NotFoundException(`Trade ${id} not found`);
        return trade;
    }

    async update(id: string, dto: UpdateTradeDto): Promise<TradeJournalEntity> {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    // ================= Внутренняя логика =================

    private async upsertPosition(
        ctx: PluginContext,
        pos: Position,
        account: Account,
    ): Promise<void> {
        const existing = await this.repo.findOne({
            where: {
                // studioGuid: ctx.studioGuid,
                detectorKey: ctx.detectorContext.key,
                ticker: pos.symbol.name,
                isPosition: true,
            },
        });

        if (existing) {
            existing.direction = pos.side;
            existing.entryPrice = pos.entryPrice ?? existing.entryPrice;
            existing.volume = pos.quantity ?? existing.volume;
            existing.date = new Date().toISOString();
            existing.result = 'open';
            await this.repo.save(existing);
        } else {
            const trade = this.repo.create({
                // studioGuid: ctx.studioGuid,
                detectorKey: ctx.detectorContext.key,
                detectorInstance: ctx.detectorContext.name,
                date: new Date().toISOString(),
                ticker: pos.symbol.name,
                direction: pos.side,
                orderType: 'position',
                entryPrice: pos.entryPrice ?? 0,
                volume: pos.quantity ?? 0,
                stopLossPercent: 0,
                takeProfitPrice: 0,
                riskReward: 0,
                entryStyle: 'account-sync',
                result: 'open',
                isPosition: true,
                comment: `Synced from account ${account.connectorType}/${account.marketType}`,
            });
            await this.repo.save(trade);
        }
    }

}
