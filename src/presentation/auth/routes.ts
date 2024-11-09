import { Router } from "express";


export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas principales
    router.use('/login', (req, res) => { res.json('Login') });
    router.use('/register', (req, res) => { res.json('Register') });

    return router;
  }
}