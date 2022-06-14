import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ApplyDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description:"유저 id", default:1})
    user_id: number; // 사용자_id

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description:"채용 공고 id", default:3})
    board_id: number; // 채용 공고 id
}