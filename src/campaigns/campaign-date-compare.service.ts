import { HttpException, HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { isBefore, parseISO, isAfter, isEqual } from 'date-fns';
import { CampaignRequestDto } from './dto/campaign-request.dto';

@Injectable()
export class CampaignDateComparisonService {
  validateDates(data: CampaignRequestDto): boolean {
    const startDate = parseISO(data.dataInicio);
    const endDate = parseISO(data.dataFim);
    const currentDate =  new Date()

    const isNotAValidEndDate = isBefore(endDate, startDate);
    const isNotAValidStartDate = isAfter(startDate, currentDate) || isEqual(startDate, currentDate)

    if (isNotAValidEndDate) {
        throw new HttpException('The end date cannot be in the past', HttpStatus.PRECONDITION_FAILED);
    }

    if (isNotAValidStartDate) {
        throw new HttpException('Start date must be today or later', HttpStatus.PRECONDITION_FAILED);
    }

    if (isBefore(endDate, currentDate)) {
      throw new Error("Campaign expired")
    }
    return    
  }
}