import { ApiProperty } from '@nestjs/swagger';

export class CreateTradeDto {
    @ApiProperty() studioGuid: string;
    @ApiProperty() detectorKey: string;
    @ApiProperty() detectorInstance: string;
    @ApiProperty() date: string;
    @ApiProperty() ticker: string;
    @ApiProperty() direction: string;
    @ApiProperty() orderType: string;
    @ApiProperty() entryPrice: number;
    @ApiProperty() stopLossPercent: number;
    @ApiProperty() takeProfitPrice: number;
    @ApiProperty() riskReward: number;
    @ApiProperty() entryStyle: string;
    @ApiProperty() result: string;
    @ApiProperty({ required: false }) comment?: string;
    @ApiProperty({ required: false }) exitReason?: string;
    @ApiProperty({ required: false }) stopLossTriggered?: string;
    @ApiProperty({ required: false }) takeProfitType?: string;
    @ApiProperty({ required: false }) reachedPrice?: number;
}
