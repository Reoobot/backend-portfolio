import Layout from "@/components/Layout";
import Link from "next/link";

export default function Projects(){
    return(
        <Layout>
            <Link className="bg-blue-900  rounded-md text-white py-1 px-2" href={'/projects/new'}>
                Add new project
            </Link>
        </Layout>
    );
}