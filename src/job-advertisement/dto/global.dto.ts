import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GlobalDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"채용공고id", default:1})
    id: number; // 채용 공고 id

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"회사이름", default:"네이버"})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"회사 나라", default:"한국"})
    country: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"회사 위치", default:"판교"})
    location: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"채용 포지션", default:"Backend 개발자"})
    position: string; // 포지션

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description:"채용 보상금", default:1000000})
    reward: number; // 보상금

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"채용 내용", default:"원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은.."})
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"사용 기술", default:"Django"})
    stack: string; // 사용기술
}