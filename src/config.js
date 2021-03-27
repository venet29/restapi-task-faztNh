import {config} from 'dotenv';

config();
export default {    mongodbURl: process.env.MONGODB_URI || 'mongodb://localhost/taskdb'};