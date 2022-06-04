import { Button, Container, Grid, TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, "messages"), orderBy("createdAt", "asc"))

    const unsub = onSnapshot(q, (doc) => {
      const array = [];
      doc.forEach((d) => {
        array.push(d.data());
      });
      setMessages(array);
    });

    return () => {
      unsub();
    };
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(firestore, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: serverTimestamp(),
    });
    setValue("");
  };

  return (
    <Container>
      <Grid container justifyContent={"center"}>
        <div
          style={{
            width: "80%",
            height: "70vh",
            border: "1px solid gray",
            overflowY: "auto",
          }}
        >
          {messages.map((message) => (
            <div
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            variant={"outlined"}
            fullWidth
            label="Начните набирать сообщение"
            maxRows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="outlined" onClick={sendMessage}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
