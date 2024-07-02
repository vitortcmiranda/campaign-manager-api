import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/model/campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
    ) { }
    async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        
        const currentDate = new Date();

        const isEndDateValid =new Date(createCampaignDto.dataFim) > new Date(createCampaignDto.dataInicio)
        const isStartDateValid =new Date(createCampaignDto.dataInicio) > currentDate

        if (isEndDateValid) {
            throw new HttpException('The end date cannot be in the past', HttpStatus.PRECONDITION_FAILED);
        }

        if (isStartDateValid) {
            throw new HttpException('The start date cannot be in the past', HttpStatus.PRECONDITION_FAILED);
        }

        if (new Date(createCampaignDto.dataFim) < currentDate) {
            createCampaignDto.status = 'expirada';
        }

        const campaign = this.campaignRepository.create(createCampaignDto);
        return this.campaignRepository.save(campaign);
    }

    findAll() {
        return this.campaignRepository.find();
    }

    async update(id: string, updateCampaignDto: UpdateCampaignDto) {
        const campaign = await this.campaignRepository.findByIds([id]);
        if (!campaign) {
            throw new Error('Campaign not found');
        }

        const currentDate = new Date();
        if (updateCampaignDto.dataFim && new Date(updateCampaignDto.dataFim) < currentDate) {
            updateCampaignDto.status = 'expirada';
        } else if (updateCampaignDto.dataInicio && new Date(updateCampaignDto.dataInicio) < currentDate) {
            throw new Error('Start date must be today or later');
        }

        return this.campaignRepository.update(id, updateCampaignDto);
    }

    softDelete(id: string) {
        return this.campaignRepository.softDelete(id);
    }
}