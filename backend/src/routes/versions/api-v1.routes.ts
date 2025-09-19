import { Router } from "express";
import auth from "@/routes/auth.routes";
import question from "@/routes/questions.routes";
import quiz from "@/routes/quiz.routes";

const router = Router();


router.use("/auth", auth);
router.use("/questions", question);
router.use('/quiz', quiz);



export default router;
