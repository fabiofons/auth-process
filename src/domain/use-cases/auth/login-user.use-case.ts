import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { UserEntity } from "../../entities/User.entity";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserLoginUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserInfo>
}

interface UserInfo {
  token: string;
  user: {
    id: string,
    name: string,
    email: string
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class LoginUser implements UserLoginUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) { }

  async execute(loginUserDto: LoginUserDto): Promise<UserInfo> {

    //1. get user
    const user = await this.authRepository.login(loginUserDto);
    //2. generate token
    const token = await this.signToken({ id: user.id }, '3h');

    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}