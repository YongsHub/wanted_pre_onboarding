import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Board } from 'src/entities/board.entity';
import { ApplyDto } from './dto/apply.dto';
import { CreateBoardDto } from './dto/board.dto';
import { GlobalDto } from './dto/global.dto';
import { JobAdvertisementService } from './job-advertisement.service';

@Controller('job-advertisement')
export class JobAdvertisementController {
    constructor(private postingService:JobAdvertisementService){}
    
    @Post('/advertisement') //회사에 채용공고 등록
    createAdvertisement(
        @Body() createBoardDto: CreateBoardDto // 회사id를 포함한 Dto
    ): Promise<any> {
        return this.postingService.createAdvertisement(createBoardDto);
    }

    @Patch('/advertisement') // 회사 id를 제외한 채용공고 수정
    updateAdvertisement(
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<any>{
        return this.postingService.updateAdvertisement(createBoardDto);
    }

    @Delete('/:id') // 채용공고 삭제
    deleteAdvertisement(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any>{
        return this.postingService.delete(id);
    }

    @Get() // 채용공고 목록 가져오기
    getAllAdvertisement(
    ): Promise<any>{
        return this.postingService.getAllAdvertisement();
    }

    @Get('/advertisement') // ?search=키워드 로 검색결과 가져오기
    searchAll(
        @Query('search') search: string,
    ): Promise<any>{
        return this.postingService.searchAll(search);
    }

    @Get('/advertisement/:id') // 채용 상세 페이지 가져오기
    getDetailAdvertisement(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any>{
        return this.postingService.getDetailAdvertisement(id);
    }

    @Post('/user/advertisement') // 사용자의 채용 공고에 지원
    userApplyAdvertisement(
        @Body() applyDto: ApplyDto
    ): Promise<any>{
        return this.postingService.userApplyAdvertisement(applyDto);
    }

}
