import axios from "axios";
import generate from "../roast"



export async function getRoast(username) {
    const response = await axios.get(`https://api.github.com/users/${username}`,{
        headers:{
            Authorization:`token ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
    })
    console.log(response)

    
    return generate(response.data.name,response.data.location,response.data.bio,response.data.public_repos,response.data.followers,response.data.following);
    

}