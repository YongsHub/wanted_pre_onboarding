import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn() // 회사 id
    id: number; 

    @Column()// 회사 이름
    name: string;

    @Column()// 회사 나라
    country: string;

    @Column() // 회사 위치
    location: string;

    @OneToMany(()=> Board, (board) => board.company, {cascade: ['insert', 'update']})
    boards: Board[]
}