import express from 'express';
import clientaRoutes from  "./routes/clientaRoutes.js"
import coordinadorRoutes from  "./routes/coordinadorRoutes.js"
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

const clientasRouter = clientaRoutes;
const coordinadorRouter = coordinadorRoutes;

app.use("/api/clientas", clientasRouter);
app.use("/api/coordinadores", coordinadorRouter);

const port = 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
    }
) 