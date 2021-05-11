import React from "react";
import { ITrack } from "../types/track";
import styles from "../styles/TrackItem.module.scss";
import { Badge, Card, Grid, IconButton } from "@material-ui/core";
import { Delete, PlayArrow } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import axios from "axios";
import { useTypeSelector } from "../hooks/useTypeSelector";

interface TrackItemProps {
  track: ITrack;
}
const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const { active } = useTypeSelector((state) => state.player);

  const handleClick = (evt) => {
    evt.stopPropagation();
  };
  const makeActive = (evt) => {
    setActiveTrack(track);
    playTrack();
    handleClick(evt);
  };

  const removeTrack = async (evt) => {
    pauseTrack();
    handleClick(evt);
    try {
      const response = await axios.delete(
        "http://localhost:5000/tracks/" + track._id
      );
    } catch (evt) {
      console.log(evt);
    }
    router.push("/tracks");
  };

  const openTrack = (evt) => {
    handleClick(evt);
    router.push("tracks/" + track._id);
  };

  return (
    <Card className={styles.track} onClick={openTrack}>
      <IconButton onClick={makeActive}>
        {active !== track ? (
          <PlayArrow color="disabled" />
        ) : (
          <PlayArrow color="primary" />
        )}
      </IconButton>
      <img
        width={70}
        height={70}
        src={"http://localhost:5000/" + track.picture}
      />
      <Grid
        container
        direction="column"
        style={{ width: 500, margin: "0 20px" }}
      >
        <div>
          <Badge
            invisible={track.comments.length === 0}
            badgeContent={track.comments.length}
            color="primary"
          >
            {track.name}
          </Badge>
        </div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      <IconButton onClick={removeTrack} style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
