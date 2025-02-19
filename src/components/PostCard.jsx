import React from "react";
import {Link} from "react-router-dom"
import appWriteService from "../appwrite/config.js"

export default function PostCard({
    $id,title,featuredImage
}){
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 border">
                <div className="w-full justify-center mb-4">
                    <img src={appWriteService.getFilePreview(featuredImage)}
                     alt={title}
                     className="rounded-xl" />
                     {console.log("Image URL:", appWriteService.getFilePreview(featuredImage))}

                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}