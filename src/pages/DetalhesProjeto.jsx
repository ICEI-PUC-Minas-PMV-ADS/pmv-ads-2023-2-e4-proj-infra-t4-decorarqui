import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { default as React, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Divider,
  Paragraph,
  Text,
} from "react-native-paper";
import defaultUser from "../images/defaultUser.png";
import detalhesImage from "../images/detalhesImage.jpg";
import { architectSeeds } from "../shared/utils";

const DetalhesProjeto = ({ projeto, setProjeto, user }) => {
  const [arquiteto, setArquiteto] = useState(architectSeeds[0]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.header}>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <Appbar.Content
            title={`Olá, ${user.nome}`}
            style={{ color: "white", fontWeight: "normal" }}
          />
          <Appbar.Action
            icon="magnify"
            color="white"
            onPress={() => {
              setIndex(1);
            }}
          />
        </View>
        <View style={styles.pageLabel}>
          <FontAwesome5 name="pencil-ruler" size={16} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "medium",
              marginLeft: 10,
            }}
          >
            Meus Projetos
          </Text>
        </View>
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={{ height: "100%", width: "90%", borderRadius: 5 }}>
          <ImageBackground
            source={detalhesImage}
            style={styles.backgroundImage}
          >
            <View
              style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", flex: 1 }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 24,
                  margin: "10%",
                }}
              >
                {projeto.nomeProjeto}
              </Text>
              <Divider style={{ backgroundColor: "white" }} />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: 16,
                  margin: "5%",
                  textDecorationLine: "underline",
                }}
              >
                Arquiteto Responsavel
              </Text>
              <Card mode="elevated" style={styles.architectCard}>
                <View style={[styles.cardContainer, styles.flexRow]}>
                  <Image
                    style={styles.profileImage}
                    source={arquiteto.Imagem ? arquiteto.Imagem : defaultUser}
                  />
                  <View style={{ width: "70%" }}>
                    <Card.Title
                      style={styles.cardTitle}
                      title={arquiteto.Nome}
                      titleStyle={{ fontWeight: "bold", textAlign: "center" }}
                      titleVariant="bodyMedium"
                    />
                    <Card.Content style={{ marginBottom: 20 }}>
                      <Text style={styles.infoText}>
                        {" "}
                        Profissão: {arquiteto.Profissao}
                      </Text>
                      <Text style={styles.infoText}>
                        {" "}
                        Estado: {arquiteto.Estado}
                      </Text>
                      <Text style={styles.infoText}>
                        {" "}
                        Cidade: {arquiteto.Cidade}
                      </Text>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              <Card style={styles.formCard}>
                <Paragraph>
                  <Text style={{ fontWeight: "bold" }}>Local: </Text>
                  {projeto.local}
                </Paragraph>
                <Paragraph>
                  <Text style={{ fontWeight: "bold" }}>Forma: </Text>
                  {projeto.conhecimento}
                </Paragraph>
                <Paragraph>
                  <Text style={{ fontWeight: "bold" }}>
                    Cômodo do projeto:{" "}
                  </Text>
                  {projeto.comodo}
                </Paragraph>
                <Paragraph>
                  <Text style={{ fontWeight: "bold" }}>Detalhes: </Text>
                  {projeto.detalhes}
                </Paragraph>
                <Paragraph>
                  <Text style={{ fontWeight: "bold" }}>Status: </Text>
                  {projeto.status}
                </Paragraph>
              </Card>
              <Button
                mode="contained"
                color="#A8CF45"
                onPress={() => setProjeto(null)}
                style={styles.button}
                labelStyle={styles.buttonText}
              >
                Voltar aos Projetos
              </Button>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#413F3F",
    flexDirection: "column",
    height: "fit-content",
    marginBottom: 12,
  },
  pageLabel: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  formCard: {
    width: "100%",
    height: "40%",
    alignSelf: "center",
    padding: 10,
    elevation: 5,
  },
  flexRow: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
  },
  architectCard: {
    width: "100%",
    marginBottom: "10%",
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
    height: "60%",
    width: "100%",
    display: "flex",
    alignSelf: "center",
    overflow: "scroll",
  },
  profileImage: {
    aspectRatio: 1 / 1,
    height: "60%",
  },
  infoText: { fontWeight: "bold", fontSize: 12 },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    elevation: 5,
    height: "40px",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "20%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DetalhesProjeto;
