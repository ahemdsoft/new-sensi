'use client';

import { useParams } from "next/navigation";
export default function LocalPage() {
    const params = useParams();
    const {id} = params;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>this is {id} page</h1>
            
        </div>
    )
}

