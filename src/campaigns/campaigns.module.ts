import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { Campaign } from 'src/model/campaign.entity';
import { CampaignDateComparisonService } from './campaign-date-compare.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignDateComparisonService],
})
export class CampaignsModule {}