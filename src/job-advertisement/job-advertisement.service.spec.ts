import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Board } from "src/entities/board.entity";
import { Company } from "src/entities/company.entity";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/board.dto";
import { JobAdvertisementService } from "./job-advertisement.service"

describe('PostingService', () => {
    let postingServce: JobAdvertisementService;
    let boardRepository: Repository<Board>;
    let companyRepository: Repository<Company>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JobAdvertisementService, Repository<Board>, Repository<Company>],
        }).compile();

        postingServce = module.get<JobAdvertisementService>(JobAdvertisementService);
    });

    describe('createAdvertisement', () => {
        it('생성되지 않은 회사 id를 주어주면 찾을 수 없다는 예외를 던진다.', async () => {
            const requestDto: CreateBoardDto = {
                id: 1,
                position: "Backend 개발자",
                reward: 10000000,
                description: "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..",
                stack: "Django"
            };
            
            jest.spyOn(companyRepository, 'findOne').mockResolvedValue(undefined);

            const result = async () => {
                await postingServce.createAdvertisement(requestDto);
            };

            await expect(result).rejects.toThrowError(
                new NotFoundException(Object.assign({
                    statusCode: 404,
                    message: "회사 id를 찾을 수 없습니다."
                }))
            );
        });
    });
});

