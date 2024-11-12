import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction = (password: string) => string;
type compareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    private readonly hashFunction: HashFunction = BcryptAdapter.hash,
    private readonly compareFunction: compareFunction = BcryptAdapter.compare
  ) { }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;
    try {
      const userExists = await UserModel.findOne({ email: email });
      if (!userExists) throw CustomError.badRequest('Email or password incorrect')

      const isValidPassword = this.compareFunction(password, userExists.password);

      if (!isValidPassword) throw CustomError.badRequest('Email or password incorrect')

      return UserMapper.userEntityFromObject(userExists)

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = registerUserDto;

    try {
      const emailExists = await UserModel.findOne({ email: email });
      if (emailExists) throw CustomError.badRequest('Email already exists');

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashFunction(password),
      });

      await user.save();
      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}