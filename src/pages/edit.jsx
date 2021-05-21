import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { db } from '../firebase';
import ReactMde from 'react-mde'
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export default function SubmitPostComponent(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState("write");

  useEffect(() => {
    ;(async () => {
      const postId = props.match.params.id
      if (postId) {
        const ref = db.collection('posts').doc(postId);
        const doc = await ref.get();
        const { title, content } = doc.data()
        setTitle(title)
        setContent(content)
      } else {
        setTitle('')
        setContent('')
      }
      const tab = !postId ? 'write' : 'preview'
      setSelectedTab(tab)
    })()
  }, [props.match.params.id])

  const onSubmit = (e) => {
    e.preventDefault();
    const docId = db.collection("posts").doc(props.match.params.id).id;
    db.collection('posts')
      .doc(docId)
      .set({
        id: docId,
        title: title,
        content: content,
        objectID: docId
      })
    setTitle('')
    setContent('')
    props.history.push('/')
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  return (
    <Wrapper>
      <form onSubmit={(e) => { e.preventDefault()}}
        style={{
          width: '100%',
          padding: '10px'
        }}
      >
        <StyldedTextField
          name="title"
          label="タイトル"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <div>
          <ReactMde
            value={content}
            onChange={setContent}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) => {
              return Promise.resolve(converter.makeHtml(markdown))
            }}
            childProps={{
              writeButton: {
                tabIndex: -1
              }
            }}
          />
        </div>
        <StyledButton
          variant="contained"
          color="primary"
          type="button"
          name="submit"
          onClick={onSubmit}
        >
          送信
        </StyledButton>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
`

const StyldedTextField = styled(TextField)`
  display: flex;
  width: 100%;
`;


const StyledButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  width: 100%;
`
