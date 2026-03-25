import * as path from 'path';
import * as fs from 'fs';
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

/** Локальная SQLite — один файл рядом с приложением, без отдельного сервера */
const sqliteForRoot = TypeOrmModule.forRootAsync({
  useFactory: () => {
    const dbPath =
      process.env.TRADE_JOURNAL_DB_PATH ||
      path.join(process.cwd(), 'data', 'trade-journal.db');
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return {
      type: 'sqlite',
      database: dbPath,
      autoLoadEntities: true,
      synchronize: true,
    };
  },
});

@Module({
  imports: [sqliteForRoot, TypeOrmModule.forFeature([TradeJournalEntity])],
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
export class TradeJournalModule {}
