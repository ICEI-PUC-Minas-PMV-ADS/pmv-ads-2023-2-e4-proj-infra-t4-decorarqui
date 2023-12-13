import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import InputSearchBar from "../components/InputSearchBar";
import defaultUser from "../images/defaultUser.png";
import { architectSeeds, normalizarTexto } from "../shared/utils";

const Arquitetos = () => {
  const [arquitetos, setArquitetos] = useState(architectSeeds);

  const [search, setSearch] = useState("");
  const [user, setUser] = useState({
    Id: 1,
    ListaFavoritos: [10, 12],
  });

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

  const getStarsAmount = (amount) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (amount - i >= 1) {
        stars.push(<FontAwesome name="star" size={20} color="greenyellow" />);
      } else if (amount - i < 1 && amount - i > 0) {
        stars.push(
          <FontAwesome name="star-half-empty" size={20} color="greenyellow" />
        );
      } else if (amount - i <= 0) {
        stars.push(<FontAwesome name="star-o" size={20} color="black" />);
      }
    }
    return <View style={styles.flexRow}>{stars}</View>;
  };

  const renderItem = ({ item }) => (
    <Card mode="elevated" style={styles.architectCard}>
      <View style={[styles.cardContainer, styles.flexRow]}>
        <Image
          style={styles.profileImage}
          source={item.Imagem ? item.Imagem : defaultUser}
        />
        <View style={{ width: "70%" }}>
          <Card.Title
            style={styles.cardTitle}
            title={item.Nome}
            titleStyle={{ fontWeight: "bold", textAlign: "center" }}
            titleVariant="bodyMedium"
            right={() =>
              user.ListaFavoritos.includes(item.Id) ? (
                <MaterialCommunityIcons
                  name="cards-heart"
                  size={24}
                  color="red"
                />
              ) : (
                <MaterialCommunityIcons
                  name="cards-heart-outline"
                  size={24}
                  color="black"
                />
              )
            }
          />
          <Card.Content>
            <Text style={styles.infoText}> Profissão: {item.Profissao}</Text>
            <Text style={styles.infoText}> Estado: {item.Estado}</Text>
            <Text style={styles.infoText}> Cidade: {item.Cidade}</Text>
            <View style={[styles.flexRow, styles.spaceBetween]}>
              <Text style={styles.detailsTextButton}>Projetos Concluídos</Text>
              <Text style={styles.detailsTextButton}>Portifólios</Text>
            </View>
            <View
              style={{
                ...styles.flexRow,
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text>{item.Avaliacao}/5</Text>
                {getStarsAmount(item.Avaliacao)}
              </View>
              <MaterialCommunityIcons
                name="whatsapp"
                size={30}
                color="yellowgreen"
              />
            </View>
          </Card.Content>
        </View>
      </View>
    </Card>
  );

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
