import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { default as React, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import defaultUser from "../images/defaultUser.png";

const CardArquiteto = ({ user, item, setArquitetos, setUser }) => {
  useEffect(() => {
    if (
      user.ListaFavoritos &&
      user.ListaFavoritos.length &&
      user.ListaFavoritos.includes(item.Id)
    ) {
      setArquitetos((prevArquitetos) =>
        prevArquitetos.map((arquiteto) =>
          arquiteto.Id === item.Id
            ? { ...arquiteto, favorito: true }
            : arquiteto
        )
      );
    } else {
      setArquitetos((prevArquitetos) =>
        prevArquitetos.map((arquiteto) =>
          arquiteto.Id === item.Id
            ? { ...arquiteto, favorito: false }
            : arquiteto
        )
      );
    }
  }, [user.ListaFavoritos]);

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

  return (
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
                item.favorito ? (
                  <MaterialCommunityIcons
                    name="cards-heart"
                    size={24}
                    color="red"
                    onPress={() => {
                      setUser({
                        ...user,
                        ListaFavoritos: user.ListaFavoritos.filter((id) => id !== item.Id),
                      });
                    }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="cards-heart-outline"
                    size={24}
                    color="black"
                    onPress={() => {
                      setUser({
                        ...user,
                        ListaFavoritos: [...user.ListaFavoritos, item.Id],
                      });
                    }}
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
  profileImage: {
    aspectRatio: 1 / 1,
    height: "60%",
  },
  detailsTextButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#676A60",
  },
  infoText: { fontWeight: "bold", fontSize: 12 },
});

export default CardArquiteto;
