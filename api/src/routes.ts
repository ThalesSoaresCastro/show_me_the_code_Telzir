import { Router } from "express";
import PriceListController from "@controllers/PriceListController";
import CostEstimateController from "@controllers/CostEstimateController";

const router = Router();

router.post('/addelement', PriceListController.CreateNewElement);
router.put('/updateelement/:id', PriceListController.UpdateElement);
router.get('/allelements', PriceListController.FindAllElements);
router.delete('/deleteelement/:id', PriceListController.DeleteElement);
router.get('/oneelement/:id', PriceListController.FindOneElement);

router.post('/cost', CostEstimateController.costPrice);

export default router;