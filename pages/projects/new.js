import Layout from "@/components/Layout";
import { useState } from "react";
import axios from 'axios'

export default function NewProject(){
    const[title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [web,setWeb] = useState('');

    async function createProject(ev) {
        ev.preventDefault()
        const data = {title,description,web}
        await axios.post('/api/projects', data)
    }
    return(
        <Layout>
            <form onSubmit={createProject}>
                <div className="grid grid-cols-1">
                    <h1>New Project</h1>
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
        </Layout>
    );
}