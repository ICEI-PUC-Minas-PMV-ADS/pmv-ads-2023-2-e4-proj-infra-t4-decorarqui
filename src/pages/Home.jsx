import React, { useState } from "react";

import {
  ActivityIndicator,
  BottomNavigation,
  DefaultTheme,
} from "react-native-paper";

import { ImageBackground, StyleSheet } from "react-native";
import homeBackground from "../images/homeBackground.jpg";
import Arquitetos from "./Arquitetos";
import Avaliacao from "./Avaliacao";
import Projeto from "./Projetos";

const Home = ({ route }) => {
  const { initialIndex, user } = route.params;
  const [index, setIndex] = React.useState(initialIndex ?? 0);
  const [routes] = React.useState([
    { key: "home", title: "Início", icon: "home" },
    { key: "projetos", title: "Meus Projetos", icon: "pencil-ruler" },
    { key: "favoritos", title: "Favoritos", icon: "heart-outline" },
    { key: "notificacoes", title: "Notificações", icon: "bell-ring-outline" },
    { key: "mais", title: "Mais", icon: "cog-outline" },
  ]);

  const [loggedUser, setLoggedUser] = useState(user);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <Arquitetos loggedUser={loggedUser} setLoggedUser={setLoggedUser} />,
    projetos: () => <Projeto setIndex={setIndex} loggedUser={loggedUser} />,
    favoritos: Avaliacao,
    notificacoes: () => <></>,
    mais: () => <></>,
  });

  const getBackgroundImage = () => {
    switch (index) {
      case 0:
        return homeBackground;
      default:
        return null;
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  return user ? (
    !!getBackgroundImage() ? (
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
    ) : (
      <BottomNavigation
        screenOptions={{ activeColor: "#ffffff" }}
        shifting={false}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={styles.bottomNavigation}
        barStyle={{ backgroundColor: "#413F3F" }}
        theme={theme}
      />
    )
  ) : (
    <ActivityIndicator animating={true} color={"#90AB4A"} />
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
