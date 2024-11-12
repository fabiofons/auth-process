import { NextFunction, Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(401).json({ error })
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => res.json({
        user: req.body.user
      }))
      .catch((err) => this.handleError(err, res));
  }
}