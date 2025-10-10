import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeJournalEntity } from './entities/trade-journal.entity';
import { TradeJournalService } from './trade-journal.service';
import { TradeJournalController } from './trade-journal.controller';
import { PluginMeta } from '@barfinex/types';

export const TRADE_JOURNAL_PLUGIN_META: PluginMeta = {
    studioGuid: 'builtin-trade-journal',
    title: 'Trade Journal',
    description: 'Журнал сделок для ведения статистики',
    version: '1.0.0',
    author: 'Barfinex',
    visibility: 'public',
    pluginApi: '/plugins-api/builtin-trade-journal',
};

@Module({
    imports: [TypeOrmModule.forFeature([TradeJournalEntity])],
    providers: [
        TradeJournalService,
        {
            provide: 'PLUGIN_METAS',
            useValue: [TRADE_JOURNAL_PLUGIN_META], // 👈 массив
        },
    ],
    controllers: [TradeJournalController],
    exports: [TradeJournalService, 'PLUGIN_METAS'],
})
export class TradeJournalModule { }
