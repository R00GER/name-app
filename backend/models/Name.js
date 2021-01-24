import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

nameSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model("Name", nameSchema);