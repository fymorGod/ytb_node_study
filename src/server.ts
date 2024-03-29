import express from "express";
import { router } from "./router";
import cors from "cors";
import path from "path"

const app = express()
const PORT= 3333
// const IP = "192.168.6.2" 

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use(router)
app.use("/files", express.static(path.resolve(__dirname, '..','uploads')))
// app.use("/documents", express.static(path.join(__dirname, "..", "uploads")));station

app.listen(PORT,() => {
  console.log("Server is Running")
})