const mongoose = require("mongoose");
const { Schema } = mongoose;
​
const todoSchema = new Schema(
   {
      isCompleted: {
         default: false,
         type: Boolean,
      },
      text: {
         required: true,
         type: String,
      },
   },
   { timestamps: true }
);
​
const Todo = mongoose.model("Todo", todoSchema);

// database.js
​
const database = (mongoUri) => {
   mongoose.connect(mongoUri, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
​
   return {
      close: () => {
         mongoose.connection.close();
      },
​
      create: async (params) => {
         const todo = new Todo({
            text: params.text,
         });
​
         return todo.save();
      },
​
      get: async (params) => {
         let queryParams = {};
         let sortParams = {};
​
         if (params != null) {
            // get by id
            if ("id" in params && params.id != null) {
               return Todo.findById(params.id).then(
                  (response) => {
                     return response;
                  },
                  (error) => {
                     return null;
                  }
               );
            }
            // all others get
            for (var key in params) {
               switch (key) {
                  case "isCompleted": {
                     queryParams.isCompleted = params[key];
​
                     break;
                  }
                  case "sortBy": {
                     const paramsSortBy = params[key];
​
                     sortParams[
                        paramsSortBy.property
                     ] = paramsSortBy.isDescending ? -1 : 1;
​
                     break;
                  }
               }
            }
         }
​
         return Todo.find(queryParams).sort(sortParams);
      },
​
      remove: async (id) => {
         return Todo.findOneAndDelete({ _id: id });
      },
​
      update: async (todo) => {
         return Todo.findOneAndUpdate({ _id: todo._id }, todo, {
            new: true,
         });
      },
   };
};
​
module.exports = database;