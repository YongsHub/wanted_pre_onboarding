import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/entities/board.entity";
import { Company } from "src/entities/company.entity";
import { User } from "src/entities/user.entity";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taeyong',
    entities: [Board, Company, User],
    synchronize: true
};