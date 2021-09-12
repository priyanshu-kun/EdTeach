import axios from "axios"

export async function createARepo({name,description,token}) {
    const headers = {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
    }
    const {data: {svn_url}} = await axios(
        {
            method: "POST",
            url: "https://api.github.com/user/repos",
            data: {name,description},
            headers
        }
    )
    return svn_url
    // console.log(res)
}