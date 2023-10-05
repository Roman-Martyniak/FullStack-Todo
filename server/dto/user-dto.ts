import UserEntity from "entity/User";

export class UserDto {
    email: string;
    password: string;
    id: number;
    isActivated: boolean;

    constructor(userEntity: UserEntity) {
        this.email = userEntity.email;
        this.password = userEntity.password;
        this.id = userEntity.id;
        this.isActivated = userEntity.isActivated;
    }
}
