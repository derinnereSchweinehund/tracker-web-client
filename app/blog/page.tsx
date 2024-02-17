"use client"
import Axios from "axios"
import { useState, useEffect } from "react"
interface IPost {
    title: string,
    date: string,
    author: string,
    content: string,
}
//useEffect runs immediately when loaded

//CANNOT USE HTTPS FOR THESE, WHY
export default function blog() {
    const [posts, setPosts] = useState(Array<IPost>)
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    useEffect(() => {
        Axios.get("http://localhost:3001/getPosts").then((response) => {
            setPosts(response.data);
        });
    }, []);

    const createPost = async () => {
        const newPost = {
            title,
            date,
            author,
            content,
        }
        Axios.post("http://localhost:3001/createPost", newPost).then((response) => {
            setPosts([...posts, newPost]) //this syntax means for everything in list post + 
            //this is probably bad since youd rather just req from server again for changes
        });
    };

    return (
        <main>
            <p className="text-[red]">
                BLOG
            </p>
            <div>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}></input>
                <input type="text" placeholder="Date" onChange={(e) => setDate(e.target.value)}></input>
                <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)}></input>
                <input type="text" placeholder="Content" onChange={(e) => setContent(e.target.value)}></input>
            </div>
            <button onClick={createPost}> Post! </button>
            <div>
            {posts.map((post) => {
                return <h1>{post.title}</h1>
            })}
            </div>
        </main>
    )
}
