import { Router } from "express";
import auth from "@/routes/auth.routes";
import question from "@/routes/questions.routes";

const router = Router();


router.use("/auth", auth);
router.use("/questions", question);



export default router;
