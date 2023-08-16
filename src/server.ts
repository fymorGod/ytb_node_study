import express from "express";
import { router } from "./router";
import cors from "cors";
import path from "path"

const app = express()
const PORT = 3333
const IP = "192.168.4.36" 
app.use(cors())
app.use(express.json())
app.use(router)

// app.use("/documents", express.static(path.join(__dirname, "..", "uploads")));station

app.listen(3333, () => {
  console.log("Server is Running")
})