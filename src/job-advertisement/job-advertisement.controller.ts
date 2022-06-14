import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Board } from 'src/entities/board.entity';
import { ApplyDto } from './dto/apply.dto';
import { CreateBoardDto } from './dto/board.dto';
import { GlobalDto } from './dto/global.dto';
import { JobAdvertisementService } from './job-advertisement.service';

@Controller('job-advertisement')
export class JobAdvertisementController {
    constructor(private postingService:JobAdvertisementService){}
    
    @Patch('/advertisement/:id') //회사에 채용공고 등록
    createAdvertisement(
        @Param('id', ParseIntPipe) id: number, // 회사 id
        @Body() createBoardDto: CreateBoardDto // 채용공고 DTO
    ): Promise<{company_id:number, position: string, reward: string, description: string, stack: string}> {
        return this.postingService.create(id, createBoardDto);
    }

    @Patch('/:id') // 회사 id를 제외한 내용 수정
    updateAdvertisement(
        @Param('id', ParseIntPipe) id: number,
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<Board>{
        return this.postingService.update(id, createBoardDto);
    }

    @Delete('/:id') // 채용공고 삭제
    deleteAdvertisement(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{statusCode: number, message: string}>{
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
    ){
        return this.postingService.userApplyAdvertisement(applyDto);
    }

}
