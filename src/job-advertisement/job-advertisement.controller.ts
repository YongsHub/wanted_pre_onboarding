import { Body, Controller, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateBoardDto } from './dto/board.dto';
import { JobAdvertisementService } from './job-advertisement.service';

@Controller('job-advertisement')
export class JobAdvertisementController {
    constructor(private postingService:JobAdvertisementService){}
    
    @Patch('/advertisement/:id') //회사에 채용공고 등록
    createAdvertisement(
        @Param('id', ParseIntPipe) id : number, // 회사 id
        @Body() createBoardDto : CreateBoardDto // 채용공고 DTO
    ): Promise<{company_id:number, position: string, reward: string, description: string, stack: string}> {
        return this.postingService.create(id, createBoardDto);
    }


}
