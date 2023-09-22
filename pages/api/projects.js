    import { mongooseConnect } from "@/lib/mongoose";
    import { Project } from "@/models/Project";



    export default async function handle(req,res) {
    const {method} = req;
        await mongooseConnect();
    if(method === 'POST') {
        const {title,decription,web} = req.body;
        const projectDoc = await Project.create({
            title,decription,web,
        })
        res.json(projectDoc)
    }
    }