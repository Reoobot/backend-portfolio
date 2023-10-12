const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  web: { type: String },
  images: [{ type:String }],
});

export const Project = models.Project || model('Project', ProjectSchema);


