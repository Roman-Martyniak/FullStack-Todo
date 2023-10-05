import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./User";

@Entity("Tokens")
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    refreshToken: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "userId" })
    user: UserEntity;
}

export default TokenEntity;
