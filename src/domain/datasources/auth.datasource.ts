import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/User.entity";

export abstract class AuthDatasource {
  //todo login
  //abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}
