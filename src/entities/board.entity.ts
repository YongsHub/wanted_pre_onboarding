import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // 채용게시물 id
    id: number

    @Column() //채용 포지션
    position: string 

    @Column() // 채용보상금
    reward: number

    @Column() // 채용 내용
    description: string

    @Column() // 사용 기술
    stack: string

    @ManyToOne(()=> Company, (company) => company.boards)
    company: Company
}