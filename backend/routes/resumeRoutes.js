import express from "express";
import path from "path";
const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.join(process.cwd(), "data", "Md_Tousif_Alam_Resume.pdf");
  res.download(filePath, "Md_Tousif_Alam_Resume.pdf");
});

export default router; 