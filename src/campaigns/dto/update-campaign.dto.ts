import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCampaignDto {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsDateString()
    dataInicio?: string;

    @IsOptional()
    @IsDateString()
    dataFim?: string;

    @IsOptional()
    @IsEnum(['ativa', 'pausada', 'expirada'])
    status?: string;

    @IsOptional()
    @IsString()
    categoria?: string;
}
