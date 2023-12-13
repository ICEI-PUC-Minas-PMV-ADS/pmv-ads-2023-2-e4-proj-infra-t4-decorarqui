import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import InputSearchBar from "../components/inputSearchBar";
import defaultUser from "../images/defaultUser.png";
import { architectSeeds, normalizarTexto } from "../shared/utils";
import CardArquiteto from "../components/CardArquiteto";

const Arquitetos = ({ loggedUser, setLoggedUser }) => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(loggedUser);
  const [arquitetos, setArquitetos] = useState(
    architectSeeds.map((arquiteto) =>
      user && user.ListaFavoritos.includes(arquiteto.Id)
        ? { ...arquiteto, favorito: true }
        : arquiteto
    )
  );

  const [filtroArquitetos, setFiltroArquitetos] = useState([...arquitetos]);

  useEffect(() => {
    if (search.length && search.length > 0) {
      setFiltroArquitetos(
        arquitetos.filter(
          (Arquiteto) =>
            normalizarTexto(Arquiteto.Nome).indexOf(normalizarTexto(search)) !==
            -1
        )
      );
    } else {
      setFiltroArquitetos(arquitetos);
    }
  }, [arquitetos, search]);

  useEffect(() => {
    setLoggedUser({...loggedUser, ListaFavoritos: user.ListaFavoritos})
  }, [user.ListaFavoritos])

  const renderItem = ({ item }) => {
    return (
      <CardArquiteto
        user={user}
        item={item}
        arquitetos={arquitetos}
        setArquitetos={setArquitetos}
        setUser={setUser}
      />
    );
  };

  return (
    <View style={styles.body}>
      <View style={[styles.flexRow, styles.upperSection]}>
        <InputSearchBar
          placeholder={"Buscar no decorArqui"}
          search={search}
          setSearch={setSearch}
        />
        <MaterialCommunityIcons
          name="filter-check-outline"
          size={30}
          color="rgba(255,255,255, 0.4)"
        />
      </View>
      <FlatList
        style={styles.listContainer}
        data={filtroArquitetos}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  body: {
    backgroundColor: "transparent",
    height: "100%",
  },
  architectCard: {
    width: "90%",
    marginBottom: "4%",
    elevation: 5,
    alignSelf: "center",
  },
  cardContainer: {
    paddingLeft: "5%",
    width: "100%",
  },
  cardTitle: {
    padding: 10,
    alignItems: "flex-start",
    minHeight: "auto",
    paddingLeft: 0,
    paddingBottom: 0,
    marginLeft: 16,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  listContainer: {
    height: "70%",
    width: "100%",
    display: "flex",
    alignSelf: "center",
    overflow: "scroll",
  },
  profileImage: {
    aspectRatio: 1 / 1,
    height: "60%",
  },
  detailsTextButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#676A60",
  },
  textInputContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "85%",
    paddingLeft: 10,
    paddingRight: 12,
    paddingVertical: 2,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    placeholderTextColor: "gray",
    height: 30,
    fontSize: 14,
    width: "100%",
  },
  upperSection: {
    width: "100%",
    justifyContent: "space-evenly",
    flex: 1,
  },
  infoText: { fontWeight: "bold", fontSize: 12 },
});

export default Arquitetos;
