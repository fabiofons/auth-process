import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";


type HashFunction = (password: string) => string;
type compareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    private readonly hashFunction: HashFunction = BcryptAdapter.hash,
    private readonly compareFunction: compareFunction = BcryptAdapter.compare
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = registerUserDto;

    try {
      //1. Verificar si el correo existe
      const emailExists = await UserModel.findOne({ email: email });
      if (emailExists) throw CustomError.badRequest('Email already exists');

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashFunction(password),
      });

      await user.save();

      //2. Hashear la constraseña

      //3. Mapear la data con nuestra entidad
      //Todo: el mapper


      return new UserEntity(
        user.id,
        name,
        email,
        user.password,
        user.roles,
      );


    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}