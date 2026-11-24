const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/api/health", (req,res)=>res.json({message:"FlowDesk API is running"}));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.get("/{*splat}", (req, res) => {
    if (req.path.startsWith("/api/")) {
        return res.status(404).json({
            message: "API route not found"
        });
    }

    res.sendFile(
        path.join(__dirname, "../Frontend/index.html")
    );
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/flowdesk")
  .then(()=> {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, ()=>console.log(`FlowDesk running at http://localhost:${PORT}`));
  })
  .catch(err=>{ console.error("MongoDB connection failed:",err.message); process.exit(1); });
