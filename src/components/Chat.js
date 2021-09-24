import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth"
import {Container, Grid} from "@material-ui/core"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from 'firebase/compat/app'
import Avatar from "@material-ui/core/Avatar";

const Chat = () => {

    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () => {
        await firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    const messagesEnd = useRef(null)

    const scrollMessage = () => {
        messagesEnd.current?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        scrollMessage()
    }, [messages])


    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid container
                  justifyContent={"center"}
                  style={{height: window.innerHeight - 50}}>
                <div style={{width: '80%',
                    height: '70vh',
                    border: '1px solid gray',
                    padding: '5px',
                    marginTop: '30px',
                    overflowY: 'auto'}}>
                    {messages.map(message =>
                        <div style={{
                            margin: '10px',
                            border: user.uid === message.uid ? '2px solid green' : '2px solid red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: '5px'
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                    <div ref={messagesEnd}/>
                </div>
                <Grid container
                      direction={"column"}
                      alignItems={"flex-end"}
                      style={{width: '80%'}}
                >
                    <TextField
                        fullWidth
                        variant={'outlined'}
                        rowsMax={2}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button
                        style={{marginTop: '7px'}}
                        variant={'outlined'}
                        onClick={sendMessage}
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;