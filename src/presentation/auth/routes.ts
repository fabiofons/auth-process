import { RequestHandler, Router } from "express";
import { AuthController } from "./controllers";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth/auth.middleware";


export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);
    // Definir las rutas principales
    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    router.get('/', AuthMiddleware.validateJWT as RequestHandler, controller.getUsers);

    return router;
  }
}