import mongoose from "mongoose";
import config from './config';

(async () => {
    try {
      const db = await mongoose.connect(config.mongodbURl, {      useNewUrlParser: true,      useUnifiedTopology: true,      useFindAndModify: false    });
      console.log('Database is conneted to:', db.connection.name);
    } catch (error)
     {    console.error(error);
  }
})();