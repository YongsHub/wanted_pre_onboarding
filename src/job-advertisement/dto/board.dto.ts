import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description:"회사id or 채용공고id", default:1})
    id: number; // 회사 id or 채용 공고 게시물 id

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"채용 포지션", default:"Backend 개발자"})
    position: string; // 포지션

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description:"보상금", default:"1000000"})
    reward: number; // 보상금

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"채용 내용", default:"원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은.."})
    description: string; // 내용

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"기술", default:"Django"})
    stack: string; // 사용기술
}