
import { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";


export default function ProjectForm({
    _id,
    title:existingTitle,
    description:existingDescripton,
    web:existingWeb,
    images:existingImages,
}){
    const[title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescripton || '');
    const [web,setWeb] = useState(existingWeb || '');
    const [images,setImages] = useState(existingImages || []);
    const [goToprojects,setGoToProjects] = useState(false)
    const router = useRouter();

    async function saveProject(ev) {
        ev.preventDefault()
        const data = {title,description,web,images}
        if(_id) {
            await axios.put('/api/projects', {...data,_id});
        } else{
            await axios.post('/api/projects', data)
        }
        setGoToProjects(true);
    }
    if (goToprojects){
        router.push('/projects')
    }
    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0) {
          const data = new FormData();
          for(const file of files) {
            data.append('file',file)
          }
        const res = await axios.post('/api/upload', data)     
          setImages(oldImages => {
            return [...oldImages, ...res.data.links];
          });
        }
    }
    return(
        
            <form onSubmit={saveProject}>
                <div className="grid grid-cols-1">
                    <label>Project Name</label>
                    <input 
                        type="text" 
                        placeholder="project name"
                        value={title}
                        onChange={ev =>setTitle(ev.target.value)}/>
                    <label>
                        photo
                    </label>
                    <div className="mb-2 flex flex-wrap gap-2">
                        {!!images?.length && images.map(link =>(
                            <div key={link} className="h-24">
                               <img src={link} alt="" className="rounded-lg"/>
                            </div>
                        ))}
                        <label className="cursor-pointer w-24 h-24 border text-center flex items-center justify-center text-sm gap-1 text-gray-500 roudend-lg bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <div>
                            Upload
                            </div>
                            <input
                                className="hidden"
                                onChange={uploadImages} 
                                type="file"/>
                        </label>
                        {!images?.length && (
                            <div>No photos in this project</div>
                        )}
                    </div>
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