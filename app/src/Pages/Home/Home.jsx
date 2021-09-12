import { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import downloadContent from '../../downloadContent';
import { userSelector, useSelector } from "react-redux"
import showdown from "showdown"
import firebase from "../../config/firebase.config"
import {Switch,Route} from "react-router-dom"
import Host from "../Host/Host"

function Home(props) {

  const {uid,displayName,photoURL} = useSelector((state) => state.auth.user)
  const [editorTitle, setEditorTitle] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [setContent, setSetContent] = useState("Nothing to preview🧐")
  const [tooglePreview, setTooglePreview] = useState(true)
  const [saveState, setSaveState] = useState(true)
  const converter = new showdown.Converter()

  // console.log("Github User: ",user)

  function handleEditorTitle(e) {
    setEditorTitle(e.target.value)
  }


  useEffect(() => {
    if (setContent === "") {
      setSetContent("Nothing to preview🧐")
    }
  }, [setContent])

  function handleEditorContent(e) {
    setEditorContent(e.target.value)
    setSetContent(e.target.value)

    
    const contentRef = firebase.database().ref("Content")
    contentRef.on('value', snapshot => {
      console.log(snapshot.val())
      // const content = snapshot.val()
      // if(content === null) {
      //   return
      // }
      // const userDoc = content[Object.keys(content)[0]];
      // if()
    })
  }


  function handleToogle(e) {
    setTooglePreview(!tooglePreview)
  }

  function handleDownloadCode() {
    if (editorTitle === "") {
      return alert("Must use title before download content")
    }
    const html = converter.makeHtml(editorContent);
    downloadContent(html, editorTitle)
  }

  function saveStuff() {
    return alert("This feature isn't avaliable yet 😩, please stay tuned")
    // if (!editorTitle || !editorContent) {
    //   return;
    // }
    // const contentRef = firebase.database().ref("Content")
    // contentRef.on('value', snapshot => {
    //   const docs = snapshot.val()
    //   // console.log(docs)
    //   if (docs === null) {
    //     const content = {
    //       uid,
    //       editorTitle,
    //       editorContent
    //     }
    //     contentRef.push(content)
    //   }
    //   else {
    //     // console.log("kaboom: ",docs)
    //     let Docs = []
    //     for(let id in docs) {
    //       Docs.push(docs[id])
    //     }
    //     const isDocAlreadyThere = Docs.find(doc => doc.uid === uid)
    //     // console.log(isDocAlreadyThere)
    //     if(isDocAlreadyThere) {
          
    //     }
    //     else {
    //       const content = {
    //         uid,
    //         editorTitle,
    //         editorContent
    //       }
    //       contentRef.push(content)
    //     }

        
    //   }

    // })

  }

  useEffect(() => {
    const contentRef = firebase.database().ref("Content")
    contentRef.on('value', snapshot => {
      console.log(snapshot.val())
    })
  }, [])


  return (
    <>
      <Switch>
        <Route exact path="/">
          <>
          <Navbar saveStuff={saveStuff} userData={{ displayName, photoURL }} handleToogle={handleToogle} handleDownloadCode={handleDownloadCode} />
      <div className="content-area">
        <div className={`editor ${!tooglePreview && "editor-width"}`}>
          <textarea cols="30" rows="10" placeholder="TITLE" value={editorTitle} onChange={handleEditorTitle}></textarea>
          <textarea cols="30" rows="10" placeholder="CONTENT" value={editorContent} onChange={handleEditorContent}></textarea>
        </div>
        {
          tooglePreview && (
            <div className="preview">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={docco}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]} className="markdown">{setContent}</ReactMarkdown>
            </div>
          )
        }
      </div>
          </>
        </Route>
        <Route path="/Host">
          <Host />
        </Route>
      </Switch>
    </>
  );
}

export default Home;