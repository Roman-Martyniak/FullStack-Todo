import { Repository } from "typeorm";

import UserEntity from "../src/entity/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "typeorm.config";
import { ApiError } from "helpers";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service";
import TokenService from "./token-service";
import { UserDto } from "../dto/user-dto";
import { TokenEntity } from "entity/Token";
import dotenv from "dotenv";

dotenv.config();

const { API_URL } = process.env;

export class UserService {
    constructor(
        private userRepository: Repository<UserEntity>,
        private tokenRepository: Repository<TokenEntity>
    ) {
        this.userRepository = AppDataSource.getRepository(UserEntity);
        this.tokenRepository = AppDataSource.getRepository(TokenEntity);
    }

    async registration(name: string, email: string, password: string, tokenService: TokenService) {
        const candidate = await this.userRepository.findOne({ where: { email: email } });
        if (candidate) {
            throw new ApiError(404, { message: `Користувач з таким ${email} вже існує` });
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        const user = this.userRepository.create({
            name,
            email,
            password: hashPassword,
            activationLink,
            isActivated: false,
        });

        await mailService.sendActivationMail(email, `${API_URL}/users/activate/:${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        await this.userRepository.save(user);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink: string) {
        const user = await this.userRepository.findOne({ where: { activationLink } });

        if (!user) {
            return new ApiError(400, { message: "Wrong link" });
        }
        user.isActivated = true;
        await this.userRepository.save(user);
    }

    async login(email: string, password: string, tokenService: TokenService) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return new ApiError(400, { message: "User dont found" });
        }
        const userPass = await bcrypt.compare(password, user.password);
        if (!userPass) {
            return new ApiError(400, { message: "Wrong password" });
        }
        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken, tokenService: TokenService) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken, tokenService: TokenService) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        if (typeof userData === "string") {
            throw new ApiError(401, { message: "Unauthorized" });
        }

        const userId = userData.id;
        const user = await this.userRepository.findOne({ where: { id: userData.id } });
        if (!user) {
            throw new ApiError(404, { message: "User not found" });
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async getUsers() {
        const user = this.userRepository.find();
        return user;
    }
}
