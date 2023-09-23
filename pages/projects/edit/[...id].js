import Layout from "@/components/Layout";
import ProjectForm from "@/components/ProjectForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProject() {
    const [projectInfo,setProjectInfo] = useState(null);
    const router = useRouter();
    console.log('mio', router);
    const {id} = router.query;
    console.log('papa',{id});
    useEffect(()=> {
        if(!id) {
            return;
        }
        axios.get('/api/projects?id='+id).then(response =>{
            setProjectInfo(response.data);
        })
    },[id])
    return(
        <Layout>
               <h1>Edit Project</h1>
               {projectInfo && (
                    <ProjectForm {...projectInfo}/>
               )}
        </Layout>
    );
}