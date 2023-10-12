import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProjetPage(){
    const router = useRouter();
    const [projectInfo,setProjectInfo] = useState();
    const {id} = router.query;
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/projects?id='+id).then(response =>{
            setProjectInfo(response.data);
        })
    },[id])
    function goBack(){
        router.push('/projects')
    }
    async function deleteProject(){
        await axios.delete('/api/projects?id='+id);
        goBack();
    }
    return(
        <Layout>
           <h1 className="text-center">Do you really want to delete project &nbsp;&ldquo;{projectInfo?.title}&rdquo;?</h1>

            <div className="flex gap-2 justify-center">
                <button onClick={deleteProject} className="btn-red">Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </Layout>
    );
}