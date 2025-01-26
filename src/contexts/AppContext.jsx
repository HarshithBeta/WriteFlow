import { createContext,useContext } from "react";

export const AppContext = createContext({
    blogs:[
        {
            id:1,
            author:"",
            title:"",
            message:"",
            image:"",
        },
    ],
    addBlog:(blog)=>{},
    editBlog:(id,blog)=>{},
    deleteBlog:(id)=>{}

});

export const useBlog = () =>{
    return useContext(AppContext);
}

export const BlogProvider = AppContext.Provider;