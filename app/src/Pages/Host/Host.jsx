import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import {createARepo, createRepoContent} from "../../api/index"
import { getFirestore, getDoc, addDoc, collection, doc, setDoc } from "firebase/firestore"
import showdown from "showdown"
import JSZip from 'jszip';
import "./Host.css"

const inititalState = {
    name: "",
    token: "",
    description: ""
}
const db = getFirestore();

function Host() {
    
    const [formField,setFormField] = useState(inititalState)
    const {email,displayName,photoURL,uid} = useSelector((state) => state.auth.user)
    const [url,setUrl] = useState("")
    const [Content,setContent] = useState("")
  const converter = new showdown.Converter()


    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formField)
        if(!formField.name || !formField.token) {
            return alert("name and token cannot be empty")
        }
        const data = await createARepo(formField)
        const userLogin = data.owner.login
        console.log("repo create data: ",data)
        // const updatedData = await createRepoContent({userLogin,token: formField.token,displayName,email,Content,name: formField.name})
        // console.log("push data: ",updatedData)
        setUrl(data.svn_url)
        setFormField(inititalState)
    }

    function handleFormChange(e) {
        setFormField({...formField,[e.target.name]: e.target.value})
    }

    useEffect(() => {
        (async () => {
         const docRef = doc(db, "Documents", uid);
         const docSnap = await getDoc(docRef);
     
         if (docSnap.exists()) {
           console.log("Document data:", docSnap.data());
           const html = converter.makeHtml(docSnap.data().editorContent);
            const title = docSnap.data().editorTitle

           const finalMarkup = `
           <!DOCTYPE html>
           <html lang="en">
             <head>
               <meta charset="UTF-8" />
               <meta http-equiv="X-UA-Compatible" content="IE=edge" />
               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               <style>
               @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;900&display=swap');
               body {
                   padding: 0 10%;
                   margin: 0;
                   font-family: 'Montserrat', sans-serif;
                   font-weight: 500;
                   min-height: calc(100vh - 100px);
               }
                 blockquote {
                   background: rgb(89, 39, 233, 0.1);
                   padding: 10px 30px;
                   border-radius: 6px;
                   font-size: 0.8rem;
                   line-height: 1.2rem;
                 }
           
                 code {
                   background: rgb(107, 107, 107, 0.5);
                   padding: 3px;
                   border-radius: 3px;
                 }
                 .hr {
                   border: none;
                   border-top: 1px solid rgba(0,0,0,0.16);
                 }
                 .main-title {
                     text-align: center;
                     font-size: 3rem;
                     font-weight: 900;
                 }
                 
               img {
                   width: 100%;
                   display: inline-block;
                   height: auto;
                 }
                 footer {
                   width: 100%;
                   min-height: 50px;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                 }
                 footer small {
                   color: #000;
                 }
               </style>
               <title>${title}</title>
             </head>
             <body>
                 <h1 class="main-title">${title}</h1>
                 <hr class="hr" />
                 ${html}
                 <hr class="hr" />
                 <footer>
                 <small>&copy; Copyright ${new Date().getFullYear()}, ${displayName}</small>
                 </footer>
             </body>
           </html>
           `;
           setContent(finalMarkup)

         } else {
           // doc.data() will be undefined in this case
            console.log("No such document!");
         }
        })()
     
       }, [])

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