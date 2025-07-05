import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./lib/socket.js"
import path from "path"

dotenv.config() // access env variables

const port = process.env.PORT
const __dirname = path.resolve()

app.use(express.json()) // allow us to extract jaon data from body
app.use(cookieParser()) // allow us to parse/interact with cookie
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("/*any", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

server.listen(port, () => {
  console.log(`server is listening on port ${port}`)
  connectDB()
})