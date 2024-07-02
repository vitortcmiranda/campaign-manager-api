import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/model/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignRequestDto } from './dto/campaign-request.dto';
import { CampaignDateComparisonService } from './campaign-date-compare.service';


@Injectable()
export class CampaignsService {
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
        private readonly campaignDateComparisonService: CampaignDateComparisonService
    ) { }
    async create(campaignRequestDto: CampaignRequestDto): Promise<Campaign> {


        this.campaignDateComparisonService.validateDates(campaignRequestDto)

        const campaign = this.campaignRepository.create(campaignRequestDto);
        return this.campaignRepository.save(campaign);
    }


    findAll() {
        return this.campaignRepository.find();
    }

    async update(id: string, campaignRequestDto: CampaignRequestDto) {
        const campaign = await this.campaignRepository.findByIds([id]);
        if (!campaign) {
            throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);

        }

        try{
            this.campaignDateComparisonService.validateDates(campaignRequestDto)

        }catch(error){
            campaignRequestDto.status = 'expirada';
            return this.campaignRepository.update(id, campaignRequestDto);
        }

    }

    softDelete(id: string) {
        return this.campaignRepository.softDelete(id);
    }
}