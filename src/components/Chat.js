import React, {useContext} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth"
import {Container, Grid} from "@material-ui/core"

const Chat = () => {

    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <Container>
            <Grid container
                  justifyContent={"center"}
                  style={{height: window.innerHeight - 50}}>
                <div style={{width: '80%', height: '70vh', border: '1px solid gray', marginTop: '30px'}}>
                    <Grid container
                          direction={"column"}
                          alignItems={"flex-end"}
                    >

                    </Grid>
                </div>
            </Grid>
        </Container>
    );
};

export default Chat;