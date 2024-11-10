import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infraestructure";


export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);
    // Definir las rutas principales
    router.use('/login', controller.loginUser);
    router.use('/register', controller.registerUser);

    return router;
  }
}