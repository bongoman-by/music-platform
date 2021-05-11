import { Container } from "@material-ui/core";
import React from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Head from "next/Head";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Music box"}</title>
        <meta
          name="description"
          content={`Music box cumplirá el deseo de cualquier artista es hacer el famoso: ${
            description || "Pagina mayor"
          }`}
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={
            keywords ||
            "музыка, песня, артисты, трек, слушать трек, слушать музыку"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Navbar />
      <Container style={{ margin: "90px 0" }}>
        <div>{children}</div>
      </Container>
      <Player />
    </>
  );
};

export default MainLayout;
