import { Router } from "express";
import PriceListController from "@controllers/PriceListController";
import CostEstimateController from "@controllers/CostEstimateController";
import UserController from "./controllers/UserController";
import AuthController from '@controllers/AuthController';

import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.post('/auth', AuthController.authenticate);

router.post('/addelement', authMiddleware, PriceListController.CreateNewElement);
router.put('/updateelement/:id', authMiddleware, PriceListController.UpdateElement);
router.get('/allelements', PriceListController.FindAllElements);
router.delete('/deleteelement/:id', authMiddleware, PriceListController.DeleteElement);
router.get('/oneelement/:id', PriceListController.FindOneElement);

router.post('/adduser', authMiddleware, UserController.CreateNewUser);
router.put('/updateuser/:id', authMiddleware, UserController.UpdateUser);
router.get('/oneuser/:id', UserController.FindOneUser);
router.get('/alluser', UserController.FindAllUsers);
router.delete('/deleteuser/:id', authMiddleware, UserController.DeleteUser);

router.post('/cost', CostEstimateController.costPrice);

export default router;