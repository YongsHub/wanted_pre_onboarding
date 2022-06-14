import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateBoardDto } from "./board.dto";
import { GlobalDto } from "./global.dto";

export class ResponseDto {
    @ApiProperty()
    data: CreateBoardDto;

    @ApiProperty({description:"상태코드", default:200})
    statusCode: number;

    @ApiProperty()
    message: string;
}

export class ResponseNotFoundDto {
    @ApiProperty({description:"상태 코드", default:404})
    statusCode: number;

    @ApiProperty({description:"메시지", default:"id를 찾을 수 없습니다."})
    message: string;
}

export class ResponseListDto{
    @ApiProperty()
    data: CreateBoardDto[];

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}


export class ResponseSearchFailDto {
    @ApiProperty({description:"상태 코드", default:404})
    statusCode: number;

    @ApiProperty({description:"메시지", default:"검색 키워드에 관련된 채용 공고가 없습니다."})
    message: string;
}

export class ResponseDetailDto{
    @ApiProperty()
    data: GlobalDto;

    @ApiProperty({description:"회사가 올린 다른 채용 공고 id", default:[1, 2, 3]})
    otherAd: []; // 사용기술
}

export class ResponseBadDto{
    @ApiProperty({description:"상태 코드", default:400})
    statusCode: number;

    @ApiProperty({description:"메시지", default:"user는 이미 채용 공고에 지원하였습니다."})
    message: string;
}

export class ResponseOkDto{
    @ApiProperty({description:"상태 코드", default:201})
    "statusCode": number;

    @ApiProperty({description:"메시지", default:"user는 이미 채용 공고에 지원하였습니다."})
    "message": string;
}
