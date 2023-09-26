import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("quote")
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    todo: string;
}
