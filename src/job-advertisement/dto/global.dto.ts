import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GlobalDto {
    @IsNotEmpty()
    @IsString()
    id: number; // 채용 공고 id

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    country: string;
    
    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    position: string; // 포지션

    @IsNotEmpty()
    @IsNumber()
    reward: number; // 보상금

    @IsString()
    @IsNotEmpty()
    stack: string; // 사용기술
}