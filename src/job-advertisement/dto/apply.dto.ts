import { IsNotEmpty, IsNumber } from "class-validator";

export class ApplyDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number; // 사용자_id

    @IsNotEmpty()
    @IsNumber()
    board_id: number; // 채용 공고 id
}