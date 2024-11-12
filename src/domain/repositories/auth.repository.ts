
import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/User.entity";

export abstract class AuthRepository {

  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

}
