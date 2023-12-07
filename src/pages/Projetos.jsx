import { Feather, FontAwesome5 } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Appbar, Card, FAB } from "react-native-paper";

import Container from "../components/Container";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("decorarqui.db");

import { useIsFocused, useNavigation } from "@react-navigation/native";

import { deleteProjeto } from "../services/QueryDB";

const Projeto = (setIndex) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [projetos, setProjetos] = useState([]);
  const [user, setUser] = useState({
    Id: 1,
    Nome: "John Doe",
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM projetos", [], (_, { rows }) => {
        let projeto =
          rows?._array?.map((item) => ({
            id: item.id,
            nomeProjeto: item.nomeProjeto,
            descricaoProjeto: item.descricaoProjeto,
            preco: item.preco,
          })) ?? [];
        if (projeto.length === 0) {
          projeto = [
            {
              id: 50,
              nomeProjeto: "Suíte Presidencial",
              descricaoProjeto: "Suite de dois milhões de dólares à noite",
              preco: 2000000,
              status: "Concluído",
            },
            {
              id: 55,
              nomeProjeto: "Casa Toda",
              descricaoProjeto: "Reforma da casa toda, tudo que importa",
              preco: 400000,
              status: "Em andamento",
            },
            {
              id: 88,
              nomeProjeto: "Banheiro de casa",
              descricaoProjeto: "Reforma curta no banheiro",
              preco: "40000",
              status: "Em andamento",
            }
          ];
        }
        setProjetos(projeto);
      });
    });
  }, [isFocused]);

  const handleExcluir = (idProjeto) => {
    deleteProjeto(idProjeto).then();
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <Card mode="elevated" style={styles.projectCard}>
      <Card.Title
        style={styles.cardTitle}
        title={item.nomeProjeto}
        subtitle={`Status: ${item.status}`}
        titleStyle={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 24,
          marginBottom: 10,
        }}
        subtitleStyle={{
          fontWeight: "normal",
          textAlign: "center",
          fontSize: 20,
        }}
        titleVariant="bodyMedium"
      />
      <Card.Content>
        <Text style={styles.detailsText}>Detalhes</Text>
        <View style={styles.deleteContainer}>
          <Feather name="trash-2" size={15} color="red" />
          <Text style={{ color: "red" }}>Excluir</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Appbar.Header style={styles.header}>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <Appbar.Content
            title={`Olá, ${user.Nome}`}
            style={{ color: "white", fontWeight: "normal" }}
          />
          <Appbar.Action
            icon="magnify"
            color="white"
            onPress={() => {
              setIndex(0);
              navigation.navigate("Home");
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
      <View style={styles.centerSection}>
        <FlatList
          data={projetos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          color="#FFF"
          onPress={() => navigation.navigate("AdicionaProjeto")}
        />
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
  projectCard: {
    width: "100%",
    marginBottom: "4%",
    elevation: 5,
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#A8CF45",
    borderRadius: 5,
  },
  centerSection: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 15,
  },
  pageLabel: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  deleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  detailsText: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "normal",
    textAlign: "center",
    color: "black",
  },
});

export default Projeto;
