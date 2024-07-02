import { IsDateString, IsEnum, IsNotEmpty, IsString, MinDate, ValidateIf } from 'class-validator';

export class CreateCampaignDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsDateString()
    @MinDate(new Date())
    dataInicio: Date;

    @IsDateString()
    @ValidateIf(o => o.dataFim > o.dataInicio)
    dataFim: Date;

    @IsEnum(['ativa', 'pausada', 'expirada'])
    status: string;

    @IsNotEmpty()
    @IsString()
    categoria: string;
}