import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { ApplyDto } from './dto/apply.dto';
import { CreateBoardDto } from './dto/board.dto';
import { GlobalDto } from './dto/global.dto';

@Injectable()
export class JobAdvertisementService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,

        @InjectRepository(Company)
        private companyRepository: Repository<Company>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    setGlobalDto(board: Board): GlobalDto{
        const result: GlobalDto = {
            "id": board.id,
            "name": board.company.name,
            "country": board.company.country,
            "location": board.company.location,
            "position": board.position, 
            "reward": board.reward,
            "description": board.description,
            "stack": board.stack,
        };
        return result;
    }

    async createAdvertisement(createBoardDto: CreateBoardDto): Promise<any> {
        const id = createBoardDto.id; // 회사 id
        delete createBoardDto['id'];
        const board = this.boardRepository.create(createBoardDto);
        try{
            const company: Company = await this.companyRepository.findOne({where:{id}, relations:["boards"]});
            if(company === null){ // 존재하지 않는 회사의 id라면
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    message: "회사 id를 찾을 수 없습니다."
                }));
            }
            company.boards.push(board); // 회사와 채용 공고 1:N
            await this.companyRepository.save(company);
            
            return Object.assign({
                data: createBoardDto,
                statusCode: 201,
                message: "채용공고 등록 성공",
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async updateAdvertisement(createBoardDto: CreateBoardDto): Promise<any>{
        try{
            const id = createBoardDto.id; // 채용 공고 게시물 id
            const board = await this.boardRepository.findOne({where:{id}});
            
            if(board === null){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    message: "채용 공고 id를 찾을 수 없습니다."
                }));
            }

            board.position = createBoardDto.position ? createBoardDto.position : board.position;
            board.reward = createBoardDto.reward ? createBoardDto.reward : board.reward;
            board.description = createBoardDto.description ? createBoardDto.description : board.description;
            board.stack = createBoardDto.stack ? createBoardDto.stack : board.stack;

            await this.boardRepository.save(board);
            return Object.assign({
                data: board,
                statusCode: 200,
                message: "업데이트 성공"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async delete(id: number): Promise<any>{
        const board = await this.boardRepository.findOne({where: {id}});
        const result = await this.boardRepository
        .createQueryBuilder()
        .delete()
        .from(Board)
        .where("id = :id", {id: id})
        .execute()
        if(!result.affected){
            throw new NotFoundException({
                statusCode: 404,
                message: "id를 찾을 수 없습니다."
            })
        }else{
            return Object.assign({
                data: board,
                statusCode: 200,
                message: "채용공고가 정상적으로 삭제되었습니다."
            })
        }
    }


    async getAllAdvertisement(): Promise<any>{
        try{
            const boards = await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.company", "company")
            .getMany()
        
            if(boards === null){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    message: "채용 공고 목록이 없습니다."
                }));
            }
            const result = [];
            boards.forEach((board) => { // 형식대로 맞추기
                const globalDto = this.setGlobalDto(board);
                delete globalDto.description;
                result.push(globalDto);
            })
            result
            return Object.assign({
                data: result,
                statusCode: 200,
                message: "채용 공고 리스트 가져오기 성공"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async searchAll(search: string): Promise<any>{
        try{
            const boards = await this.getAllAdvertisement(); // 전체 공고 목록 가져오기
            const result = boards.data.filter((board: any) => {
                if(board.name.indexOf(search) > -1){
                    return board;
                }else if(board.country.indexOf(search) > -1){
                    return board;
                }else if(board.location.indexOf(search) > -1){
                    return board;
                }else if(board.position.indexOf(search) > -1){
                    return board;
                }else if(board.stack.indexOf(search) > -1){
                    return board;
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
                return Object.assign({
                    data: result,
                    statusCode: 200,
                    message: "검색 키워드로 관련 채용 공고 리스트 가져오기 성공"
                });
            }
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async getDetailAdvertisement(id: number): Promise<any>{
        try{
            const board = await this.boardRepository.findOne({where: {id}, relations: ["company"]});
            if(board === null) throw new NotFoundException({
                "statusCode": 404,
                "message": "존재하지 않는 채용공고 id입니다."
            })
            const result = this.setGlobalDto(board);
            const companyId: number = board.company.id;
            const otherAd = []
            const boards = await this.boardRepository.createQueryBuilder("board")
            .select("id")
            .where("board.company.id = :id", {id: companyId})
            .getRawMany()
            
            boards.forEach((board) => { // Parameter로 들어온 id를 제외한 회사의 다른 채용 공고 id
                if(board.id !== id) otherAd.push(board.id);
            })
            result['otherAd'] = otherAd;
            return Object.assign({
                data: result,
                statusCode: 200,
                message: "채용 상세 페이지 가져오기 성공"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async userApplyAdvertisement(applyDto: ApplyDto) {
        let id: number;
        try{
            id = applyDto.board_id;
            const board = await this.boardRepository.findOne({where: {id}});
            id = applyDto.user_id;
            const user = await this.userRepository.findOne({where: {id}, relations: ["board"]});
            if(user === null || board === null){
                throw new NotFoundException(Object.assign({
                    "statusCode":404,
                    "message": "잘못된 user_id or 잘못된 board_id입니다."
                }))
            }else if(user.board !== null){
                throw new BadRequestException(Object.assign({
                    "statusCode": 400,
                    "message": "user는 이미 채용 공고에 지원하였습니다."
                }))
            }else{
                user.board = board;
                await this.userRepository.save(user);
                return Object.assign({
                    "statusCode": 200,
                    "message": "사용자가 성공적으로 채용 공고에 지원하였습니다."
                })
            }
        }catch(error){
            console.log(error);
            throw error.response;
        }
    }
}
