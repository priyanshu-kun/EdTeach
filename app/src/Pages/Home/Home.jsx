import { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import downloadContent from '../../downloadContent';
import {userSelector, useSelector} from "react-redux"
import showdown from "showdown"

function Home(props) {

  const {displayName,photoURL} = useSelector((state) => state.auth.user)
  const [editorTitle, setEditorTitle] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [setContent, setSetContent] = useState("Nothing to preview🧐")
  const [tooglePreview, setTooglePreview] = useState(true)
  const converter = new showdown.Converter()
  console.log(editorContent)
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
  }


  function handleToogle(e) {
    setTooglePreview(!tooglePreview)
  }

  function handleDownloadCode() {
    if (editorTitle === "") {
      return alert("must use title before download content")
    }
    const html = converter.makeHtml(editorContent);
    downloadContent(html, editorTitle)
  }


  return (
    <>
      <Navbar userData={{displayName,photoURL}}  handleToogle={handleToogle} handleDownloadCode={handleDownloadCode} />
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
  );
}

export default Home;