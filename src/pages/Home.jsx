import React from "react";

import { BottomNavigation, DefaultTheme } from "react-native-paper";

import Arquitetos from "./Arquitetos";
import Projeto from "./Projetos";
import Avaliacao from "./Avaliacao";
import StatusProjeto from "./StatusProjeto";
import homeBackground from "../images/homeBackground.jpg";
import backgroundCadastro from "../images/backgroundCadastro.jpeg";
import { ImageBackground, StyleSheet, Text } from "react-native";

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Início", icon: "home" },
    { key: "projetos", title: "Meus Projetos", icon: "pencil-ruler" },
    { key: "favoritos", title: "Favoritos", icon: "heart-outline" },
    { key: "notificacoes", title: "Notificações", icon: "bell-ring-outline" },
    { key: "mais", title: "Mais", icon: "cog-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Arquitetos,
    projetos: Projeto,
    favoritos: Avaliacao,
    notificacoes: Avaliacao,
    mais: StatusProjeto,
  });

  const getBackgroundImage = () => {
    switch (index) {
      case 0:
        return homeBackground;
      default:
        return backgroundCadastro;
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  return (
      <ImageBackground
        source={getBackgroundImage()}
        style={styles.backgroundImage}
      >
        <BottomNavigation
          screenOptions={{ activeColor: "#ffffff" }}
          shifting={false}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          style={styles.bottomNavigation}
          barStyle={{ backgroundColor: "transparent" }}
          theme={theme}
        />
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: "transparent",
    flex: 5,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Home;
