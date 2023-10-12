    import { mongooseConnect } from "@/lib/mongoose";
    import { Project } from "@/models/Project";



    export default async function handle(req,res) {
    const {method} = req;
        await mongooseConnect();

    if (method === 'GET') {
        if(req.query?.id){
             res.json(await Project.findOne({_id:req.query?.id}))
        } else {
             res.json(await Project.find());
        }
    }

    if(method === 'POST') {
        const {title,description,web,images} = req.body;
        const projectDoc = await Project.create({
            title,description,web,images,
        })
        res.json(projectDoc)
    }
    if(method === 'PUT') {
        const {title,description,web,images,_id} = req.body;
        await Project.updateOne({_id}, {title,description,web,images});
        res.json(true)
    }
    if(method === 'DELETE') {
        if(req.query?.id) {
            await Project.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
    }