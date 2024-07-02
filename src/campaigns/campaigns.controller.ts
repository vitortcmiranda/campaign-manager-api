import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignRequestDto } from './dto/campaign-request.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(@Body() CampaignRequestDto: CampaignRequestDto) {
    return this.campaignsService.create(CampaignRequestDto);
  }

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() CampaignRequestDto: CampaignRequestDto) {
    return this.campaignsService.update(id, CampaignRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.softDelete(id);
  }
}
