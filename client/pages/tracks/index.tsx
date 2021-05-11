import {
  Box,
  Button,
  Card,
  Grid,
  Pagination,
  TextField,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TrackList from "../../components/TrackList";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import MainLayout from "../../layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions-creators/tracks";

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypeSelector((state) => state.track);
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        dispatch(await searchTracks(e.target.value));
      }, 1000)
    );
  };

  if (error) {
    return;
    <MainLayout>
      <h1>{error}</h1>
    </MainLayout>;
  }
  return (
    <MainLayout title={"Music box - список треков"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
          <Pagination count={tracks.length} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
  }
);
