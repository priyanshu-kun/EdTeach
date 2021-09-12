import React,{useState} from 'react';
import {useSelector} from "react-redux"
import {createARepo} from "../../api/index"
import "./Host.css"

const inititalState = {
    name: "",
    token: "",
    description: ""
}

function Host(props) {
    
    const [formField,setFormField] = useState(inititalState)
    const {displayName,photoURL} = useSelector((state) => state.auth.user)
    const [url,setUrl] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formField)
        if(!formField.name || !formField.token) {
            return alert("name and token cannot be empty")
        }
        const data = await createARepo(formField)
        setUrl(data)
        setFormField(inititalState)
    }

    function handleFormChange(e) {
        setFormField({...formField,[e.target.name]: e.target.value})
    }

    return (
        <div className="cover">
            <div className="user-profile">
                <div>
                <img src={photoURL} alt="profile img" />
                </div>
                <h1>{displayName}</h1>
                <hr />
            </div>
            <div className="project-section">
                <h3>Your existing Github Projects</h3>
                <div style={{fontSize: "0.8rem", opacity: "0.3"}}>
                  work in progress😅
                </div>
            </div>
            <div className="create-repo">
                <h3>Create a new site on Github</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="token">
                        <p>your personal access token</p>
                        <input name="token" value={formField.token} onChange={handleFormChange} type="text" placeholder="eg: 23j2dksajalskjiwou..." />
                        <span style={{fontSize: "0.6rem",marginLeft: "1.6rem"}}>what is personal access token <a style={{color: "#5927E9",textDecoration: "none"}} href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token">find more.</a></span>
                    </label>
                    <label htmlFor="name">
                        <p>your project name</p>
                        <input name="name" value={formField.name} onChange={handleFormChange} type="text" placeholder="eg: my cool book" />
                    </label>
                    <label htmlFor="description">
                        <p>your project description (optional)</p>
                        <input name="description" value={formField.description} onChange={handleFormChange} type="text" placeholder="eg: do some work..." />
                    </label>
                   <div>
                   <button>Create</button>
                   </div>
                </form>
            </div>
            {
                url && (
                    <p style={{margin: "0 auto",width: "600px",color: "#fff", fontSize: "0.8rem",textAlign: "center"}}>Now simply go to this <a target="_blank"  style={{color: "#5927E9",textDecoration: "none"}} href={`${url}/upload`}>{`${url}/upload`}</a> url and drag and drop you downloaded file and then press commit.</p>
                )
            }
        </div>
    );
}

export default Host;