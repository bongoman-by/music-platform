import { Box, Card, Grid, Pagination } from "@material-ui/core";
import React from "react";
import { ITrack } from "../types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
}
const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <Card style={{ justifyContent: "center" }}>
      <Grid container direction="column">
        <Box p={2}>
          {tracks.map((track) => (
            <TrackItem key={track._id} track={track} />
          ))}
        </Box>
      </Grid>
      <Pagination count={tracks.length} />
    </Card>
  );
};

export default TrackList;
