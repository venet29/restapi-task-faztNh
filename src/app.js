import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import TasksRouter from './routes/tasks.routes';
// Initializations
const app = express();
//setting
app.set("port", process.env.PORT || 3000);

//middlewares
const corsOption = {};
app.use(cors(corsOption)); //cualqueri server se puede hacer peticiones
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({    extended: false})); //para entender las peticiones que llegan desde formularios html

//routes
app.get('/', (req, res) => { 
       res.json({        message: 'welcome a mi aplicacion'    });
});

app.use("/api/tasks", TasksRouter);

export default app;