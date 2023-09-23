
import { useState } from "react";
import axios from 'axios'

import { useRouter } from "next/router";

export default function ProjectForm({
    title:existingTitle,
    description:existingDescripton,
    web:existingWeb,
}){
    const[title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescripton || '');
    const [web,setWeb] = useState(existingWeb || '');
    const [goToprojects,setGoToProjects] = useState(false)
    const router = useRouter();

    async function createProject(ev) {
        ev.preventDefault()
        const data = {title,description,web}
        await axios.post('/api/projects', data)
        setGoToProjects(true);
    }
    if (goToprojects){
        router.push('/projects')
    }
    return(
        
            <form onSubmit={createProject}>
                <div className="grid grid-cols-1">
                    <label>Project Name</label>
                    <input 
                        type="text" 
                        placeholder="project name"
                        value={title}
                        onChange={ev =>setTitle(ev.target.value)}/>
                    <label>Description</label>
                    <textarea 
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}/>
                    <label>Sitio Web</label>
                    <input 
                        type="text" 
                        placeholder="sitio web"
                        value={web}
                        onChange={ev =>setWeb(ev.target.value)}/>
                </div>
                    <button
                        type="submit" 
                        className="btn-primary">Save</button>
            </form>
    
    );
}