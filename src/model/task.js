import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: { type: String, required: true,trim:true, max: 150 },
    description: { type: String,trim:true },
    done:{ type: Boolean,default:false},
  

},
{versionKey:false,   //pqra q no aprezca __v
timestamps:true  //paragergar createAt y updateat
} 
);
//module.exports = mongoose.model('Task', TaskSchema);


TaskSchema.plugin(mongoosePaginate);
export default model('Task', TaskSchema)