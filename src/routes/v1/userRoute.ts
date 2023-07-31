import express from "express";
const userRoutes = express.Router();

//Controllers
import userController from "../../controllers/userController";

userRoutes.post("/create", (req, res) =>userController.addUser(req,res));
userRoutes.get("/get", (req, res) =>userController.get(req,res));
userRoutes.put("/edit", (req, res) =>userController.update(req,res));
userRoutes.post("/delete/:id", (req, res) =>userController.delete(req,res));



export default userRoutes;