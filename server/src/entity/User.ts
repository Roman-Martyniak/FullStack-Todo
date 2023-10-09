import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { IsEmail, MinLength } from "class-validator";
@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: true })
    @IsEmail()
    email: string;

    @Column({ length: 100 })
    @MinLength(2)
    password: string;

    @Column({ default: false })
    isActivated: boolean;

    @Column()
    activationLink: string;
}

export default UserEntity;
