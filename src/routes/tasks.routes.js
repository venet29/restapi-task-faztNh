import {Router} from 'express';

import * as taskCtrl from '../controllers/task.controller'; // ' *as ' para importar todo en TaskCtrl

const router = Router();

router.get("/", taskCtrl.findAllTasks);

router.get("/done", taskCtrl.findAllDoneTasks); //esta con get id se pude confundir, pimero 'done' para que no considre done como un 'id' 

router.get("/:id", taskCtrl.finOneTask);

router.post('/', taskCtrl.createTask);

router.delete("/:id", taskCtrl.deletetaks);

router.put("/:id", taskCtrl.Updatetask);

export default router;