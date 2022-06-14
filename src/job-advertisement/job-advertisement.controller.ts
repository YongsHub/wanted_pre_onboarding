import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Board } from 'src/entities/board.entity';
import { ApplyDto } from './dto/apply.dto';
import { CreateBoardDto } from './dto/board.dto';
import { GlobalDto } from './dto/global.dto';
import { ResponseBadDto, ResponseDetailDto, ResponseDto, ResponseListDto, ResponseNotFoundDto, ResponseOkDto, ResponseSearchFailDto } from './dto/response.dto';
import { JobAdvertisementService } from './job-advertisement.service';

@Controller('job-advertisement')
export class JobAdvertisementController {
    constructor(private postingService:JobAdvertisementService){}
    
    @ApiOperation({ summary: "회사 id를 이용한 채용 공고 등록"})
    @ApiBody({ type: CreateBoardDto})
    @ApiCreatedResponse({status:201, description:"채용공고 등록 성공", type:ResponseDto})
    @ApiNotFoundResponse({status:404, description:"잘못된 회사 id", type:ResponseNotFoundDto})
    @Post('/advertisement') //회사에 채용공고 등록
    createAdvertisement(
        @Body() createBoardDto: CreateBoardDto // 회사id를 포함한 Dto
    ): Promise<any> {
        return this.postingService.createAdvertisement(createBoardDto);
    }


    @ApiOperation({ summary: "채용 공고 수정"})
    @ApiBody({ type: CreateBoardDto})
    @ApiOkResponse({status:200, description:"채용공고 수정 성공", type:ResponseDto})
    @ApiNotFoundResponse({status:404, description:"잘못된 채용 공고 id", type:ResponseNotFoundDto})
    @Patch('/advertisement') // 회사 id를 제외한 채용공고 수정
    updateAdvertisement(
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<any>{
        return this.postingService.updateAdvertisement(createBoardDto);
    }


    @ApiOperation({ summary: "채용 공고 삭제"})
    @ApiOkResponse({status:200, description:"채용공고 삭제 성공", type:ResponseDto})
    @ApiNotFoundResponse({status:404, description:"잘못된 채용 공고 id", type:ResponseNotFoundDto})
    @Delete('/:id') // 채용공고 삭제
    deleteAdvertisement(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any>{
        return this.postingService.delete(id);
    }


    @ApiOperation({ summary: "채용 공고 목록 가져오기"})
    @ApiCreatedResponse({status:200, description:"채용공고 목록 가져오기 성공", type:ResponseListDto})
    @ApiNotFoundResponse({status:404, description:"잘못된 채용 공고 id", type:ResponseNotFoundDto})
    @Get() // 채용공고 목록 가져오기
    getAllAdvertisement(
    ): Promise<any>{
        return this.postingService.getAllAdvertisement();
    }


    @ApiOperation({ summary: "검색 키워드로 채용 공고 목록 가져오기"})
    @ApiCreatedResponse({status:200, description:"채용공고 목록 가져오기 성공", type:ResponseListDto})
    @ApiNotFoundResponse({status:404, description:"검색 키워드에 관련된 채용공고가 없습니다.", type:ResponseSearchFailDto})
    @Get('/advertisement') // ?search=키워드 로 검색결과 가져오기
    searchAll(
        @Query('search') search: string,
    ): Promise<any>{
        return this.postingService.searchAll(search);
    }

    @ApiOperation({ summary: "채용 상세 페이지 가져오기"})
    @ApiCreatedResponse({status:200, description:"채용 공고 id 및 그 회사의 채용공고 가져오기 성공", type:ResponseDetailDto})
    @ApiNotFoundResponse({status:404, description:"채용 공고 id가 존재하지 않습니다.", type:ResponseNotFoundDto})
    @Get('/advertisement/:id') // 채용 상세 페이지 가져오기
    getDetailAdvertisement(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any>{
        return this.postingService.getDetailAdvertisement(id);
    }


    @ApiOperation({ summary: "사용자 채용 공고에 지원"})
    @ApiBody({type:ApplyDto})
    @ApiCreatedResponse({status:201, description:"사용자 채용 공고에 지원 성공", type: ResponseOkDto})
    @ApiNotFoundResponse({status:404, description:"잘못된 user_id or 잘못된 board_id입니다.", type:ResponseNotFoundDto})
    @ApiBadRequestResponse({status:400, description:"user는 이미 채용 공고에 지원하였습니다.", type: ResponseBadDto})
    @Post('/user/advertisement') // 사용자의 채용 공고에 지원
    userApplyAdvertisement(
        @Body() applyDto: ApplyDto
    ): Promise<any>{
        return this.postingService.userApplyAdvertisement(applyDto);
    }

}
