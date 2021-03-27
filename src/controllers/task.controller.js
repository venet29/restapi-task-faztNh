import Task from '../model/task'; // los dos puntos son para subir nivel
import {getPagination} from '../libs/getPagination'; //loq  esta entre corchetes es la funcion que se exporta

export const findAllTasks = async (req, res) => {
  
    try {
        console.log(req.query);
        //rescantando parametros extras del url
        const {size,page,title}=req.query;
        const condition  = title ? {
            title: {$regex: new RegExp(title), $options:"i"},
        } : {};    

        const {limit , offset} =getPagination(page,size);

       // const tasks = await Task.find()  // sin paginacion
       const data = await Task.paginate(condition,{ offset,limit})  // con paginacion , rspuesta de los documentos
       console.log(data)  ;
      
      
       //res.json(data); //revolviendo todos los datos
        res.json({
            totalItems: data.totalPages,
            tasks: data.docs,
            totalPages: data.totalPages

        }); // 1:54:20 respueta mas personalozada
    } catch (error) {
        res.status(500).json({
            mesagge: error.message || 'algo ocurrio mal al obtener all task'
        });
    }
};


export const findAllDoneTasks = async (req, res) => {

    try {
        const tasks = await Task.find({done: true})
        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            mesagge: error.message || 'algo ocurrio mal al obtener task done'
        });
    }
};

export const finOneTask = async (req, res) => {

    const {id} = req.params.id;
    
    try {

        console.log(req.params.id)
        const tasks1 = await Task.findById(req.params.id)

        if (!tasks1)
            return res
                .status(404)
                .json({
                    mesagge: `stask con este id no exist`
                });

        res.json(tasks1)
    } catch (error) {
        res.status(500).json({
            mesagge: error.message || `algo ocurrio mal al obtener task por id: ${id}`
        });
    }
};


export const createTask = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({
            mesagge: 'falta titulo'
        });
    }

    try {
        const newtask =
            new Task({
                title: req.body.title,
                description: req.body.description,
                done: req.body.done ? req.body.done : false
            })
        const tasksave = await newtask.save();
        res.json(tasksave)
    } catch (error) {
        res.status(500).json({
            mesagge: error.message || 'algo ocurrio mal al crear task'
        });
    }
};

export const deletetaks = async (req, res) => {

    const {id} = req.params.id;
    try {

        console.log(req.params.id)
        await Task.findByIdAndDelete(req.params.id)
        //tasks1.delete();
        res.json({
            mesagge: ` task fue borrada satifactoriamente`
        })
    
    } catch (error) {
        res.status(500).json({
            mesagge: error.message || `algo ocurrio mal al borrar task por id: ${id}`
        });
    }
};

export const Updatetask = async (req, res) => {


    const {id} = req.params.id;
    try {

        console.log(`id Update :${req.params.id}`)
        const tasks1 = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json(tasks1)

    } catch (error) {
        res.status(500).json({
            mesagge: error.message || `algo ocurrio mal al update task por id: ${id}`
        });
    }
};