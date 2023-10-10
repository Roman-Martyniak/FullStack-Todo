import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Repository } from "typeorm";
import { TokenEntity } from "../entity/Token";

dotenv.config();
const ACCESS_TOKEN = process.env.JWT_ACCESS_SECRET_KEY || "";
const REFRESH_TOKEN = process.env.JWT_REFRESH_SECRET_KEY || "";

export class TokenService {
    constructor(private tokenRepository: Repository<TokenEntity>) {}

    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "30m" });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "30d" });
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(id: number, refreshToken: string) {
        let tokenData = await this.tokenRepository.findOne({ where: { id: id } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
        } else {
            tokenData = this.tokenRepository.create({ id: id, refreshToken });
        }

        await this.tokenRepository.save(tokenData);

        return tokenData;
    }

    async removeToken(refreshToken) {
        const tokenData = await this.tokenRepository.delete({ refreshToken });
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, ACCESS_TOKEN);
            return userData;
        } catch (e) {
            console.log(e);
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, REFRESH_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await this.tokenRepository.findOne({ where: { refreshToken } });
        return tokenData;
    }
}

export default TokenService;
