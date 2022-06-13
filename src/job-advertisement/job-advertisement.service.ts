import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';
import { Company } from 'src/entities/company.entity';
import { Not, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/board.dto';
import { GlobalDto } from './dto/global.dto';

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
            if(company === null){
                throw new NotFoundException(Object.assign({
                    "statusCode": 404,
                    "message": "회사 id를 찾을 수 없습니다."
                }));
            }
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
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async update(id: number, createBoardDto: CreateBoardDto): Promise<Board>{
        try{
            const board = await this.boardRepository.findOne({where:{id}});
            
            if(board === null){
                throw new NotFoundException(Object.assign({
                    "statusCode": 404,
                    "message": "채용 id를 찾을 수 없습니다."
                }));
            }
            
            board.position = createBoardDto.position;
            board.reward = createBoardDto.reward;
            board.description = createBoardDto.description;
            board.stack = createBoardDto.stack;

            await this.boardRepository.save(board);
            return board;
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async delete(id: number): Promise<{statusCode: number, message: string}>{
        const result = await this.boardRepository
                                    .createQueryBuilder()
                                    .delete()
                                    .from(Board)
                                    .where("id = :id", {id: id})
                                    .execute()
        if(!result.affected){
            throw new NotFoundException({
                "statusCode": 404,
                "message": "id를 찾을 수 없습니다."
            })
        }else{
            return Object.assign({
                "statusCode": 200,
                "message": "채용공고가 정상적으로 삭제되었습니다."
            })
        }
    }

    async getAllAdvertisement(): Promise<GlobalDto[]>{
        try{
            const boards = await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.company", "company")
            .getMany()
        
            if(boards === null){
                throw new NotFoundException(Object.assign({
                    "statusCode": 404,
                    "message": "채용 공고 목록이 없습니다."
                }));
            }
            const result: GlobalDto[] = [];
            boards.forEach((board) => { // 형식대로 맞추기
                result.push({
                    "id": board.id,
                    "name": board.company.name,
                    "country": board.company.country,
                    "location": board.company.location,
                    "position": board.position, 
                    "reward": board.reward,
                    "stack": board.stack,
                })
            })
            return result;
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }

    async searchAll(search: string): Promise<GlobalDto[]>{
        try{
            const boards = await this.getAllAdvertisement(); // 전체 공고 목록 가져오기
            const result = boards.filter((board) => {
                if(board.name.indexOf(search) > -1){
                    return board;
                }else if(board.country.indexOf(search) > -1){
                    return board;
                }else if(board.location.indexOf(search) > -1){
                    return board;
                }else if(board.position.indexOf(search) > -1){
                    return board;
                }else if(board.stack.indexOf(search) > -1){
                    return board;   //태용 바보
                }else{
                    return null;
                }
            })
            if(result.length === 0){
                throw new NotFoundException(Object.assign({
                    "statusCode": 404,
                    "message": "검색 키워드에 관한 채용목록이 없습니다."
                }));
            }else{
                return result;
            }
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }
}
