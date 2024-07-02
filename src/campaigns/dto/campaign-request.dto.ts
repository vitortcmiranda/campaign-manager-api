import { IsDateString, IsEnum, IsNotEmpty, IsString, MinDate, ValidateIf } from 'class-validator';

export class CampaignRequestDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsDateString()
    @MinDate(new Date())
    dataInicio: string;

    @IsDateString()
    @ValidateIf(o => o.dataFim > o.dataInicio)
    dataFim: string;

    @IsEnum(['ativa', 'pausada', 'expirada'])
    status: string;

    @IsNotEmpty()
    @IsString()
    categoria: string;
}