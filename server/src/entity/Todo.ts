import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("quote")
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    todo: string;

    @Column()
    completed: boolean;
}
