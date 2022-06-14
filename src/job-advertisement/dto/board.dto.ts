import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; // 회사 id or 채용 공고 게시물 id

    @IsNotEmpty()
    @IsString()
    position: string; // 포지션

    @IsNotEmpty()
    @IsNumber()
    reward: number; // 보상금

    @IsNotEmpty()
    @IsString()
    description: string; // 내용

    @IsString()
    @IsNotEmpty()
    stack: string; // 사용기술
}