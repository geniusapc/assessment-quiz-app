import { Router } from "express";

const router = Router();


router.use("/auth", (req, res) => { res.send("Auth route v1") });



export default router;
