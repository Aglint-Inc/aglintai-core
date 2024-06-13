import { Router } from "express";
import { createExample, getExample } from "../../../controllers/exampleController";

const router: Router = Router();

router.route("/").get(getExample).post(createExample);

export default router;
