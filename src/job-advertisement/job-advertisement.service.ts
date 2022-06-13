import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/board.dto';

@Injectable()
export class JobAdvertisementService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,

        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ){}

    async create(id: number, createBoardDto: CreateBoardDto): Promise<{statusCode: number, company_id:number, position: string, reward: string, description: string, stack: string}> {
        const board = this.boardRepository.create(createBoardDto);
        try{
            const company: Company = await this.companyRepository.findOne({where:{id}, relations:["boards"]});
            company.boards.push(board);
            await this.companyRepository.save(company);
            return Object.assign({
                "statusCode": 201,
                "company_id": company.id,
                "position": board.position,
                "reward": board.reward,
                "description": board.description,
                "stack": board.stack,
            });
        }catch(error){
            throw new NotFoundException(Object.assign({
                "statusCode": 404,
                "message": "회사 id를 찾을 수 없습니다."
            }));
        }
    }


    async update(id: number, createBoardDto: CreateBoardDto): Promise<Board>{
        try{
            const board = await this.boardRepository.findOne({where:{id}});
            console.log(board);
            board.position = createBoardDto.position;
            board.reward = createBoardDto.reward;
            board.description = createBoardDto.description;
            board.stack = createBoardDto.stack;

            await this.boardRepository.save(board);
            return board;
        }catch(error){
            throw new NotFoundException(Object.assign({
                "statusCode": 404,
                "message": "채용 id를 찾을 수 없습니다."
            }));
        }
    }
}
