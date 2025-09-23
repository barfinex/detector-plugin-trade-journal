import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterTradeDto {
    @ApiPropertyOptional() studioGuid?: string;
    @ApiPropertyOptional() detectorKey?: string;
    @ApiPropertyOptional() ticker?: string;
    @ApiPropertyOptional() direction?: string;
    @ApiPropertyOptional() fromDate?: string;
    @ApiPropertyOptional() toDate?: string;
}
