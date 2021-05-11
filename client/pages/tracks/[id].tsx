import React, { useState } from "react";
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tracks/comment",
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={`Music box: ${track.artist}: ${track.name}`}
      keywords={`музыка, песня, артисты, трек, слушать трек, слушать музыку, ${track.artist}, ${track.name}`}
    >
      <Button
        variant={"outlined"}
        style={{ fontSize: 32 }}
        onClick={() => router.push("/tracks")}
      >
        К списку
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img
          src={"http://localhost:5000/" + track.picture}
          width={200}
          height={200}
        />
        <div style={{ marginLeft: 30 }}>
          <h2>Название трека - {track.name}</h2>
          <h2>Исполнитель - {track.artist}</h2>
          <h3>Прослушиваний - {track.listens}</h3>
        </div>
      </Grid>
      <h3>Слова в треке</h3>
      <p>{track.text}</p>
      <h3>Комментарии</h3>
      <Grid container>
        <TextField label="Ваше имя" fullWidth {...username} />
        <TextField label="Комментарий" {...text} fullWidth multiline rows={4} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get("http://localhost:5000/tracks/" + params.id);
  return {
    props: {
      serverTrack: response.data,
    },
  };
};
