import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityListenerMetadata } from "typeorm/metadata/EntityListenerMetadata";
import { Board } from "./board.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number // user Id

    @Column()
    name: string // 사용자 id

    @Column()
    age: number // 나이

    @ManyToOne(()=> Board, (board) => board.users)
    board: Board
}