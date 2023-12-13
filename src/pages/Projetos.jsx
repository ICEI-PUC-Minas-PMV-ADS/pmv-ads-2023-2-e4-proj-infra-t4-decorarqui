import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import CardProjeto from "../components/CardProjeto";
import DetalhesProjeto from "./DetalhesProjeto";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("decorarqui.db");

const Projeto = ({setIndex, loggedUser}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [projetos, setProjetos] = useState([]);
  const [user, setUser] = useState(loggedUser);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

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
              local: "Casa",
              gasto: "Entre  R$30.000,00 e  R$50.000,00",
              comodo: "Quarto",
              conhecimento: "Tenho ideias do projeto",
              detalhes: "Preciso de uma reforma bem completa da minha sala, com bastante cudado nas decorações e nos lustres, preciso das paredes exatamente conforme anexo.",
              status: "Concluído",
            },
            {
              id: 55,
              nomeProjeto: "Casa Toda",
              descricaoProjeto: "Reforma da casa toda, tudo que importa",
              preco: 400000,
              status: "Em andamento",
              local: "Casa",
              gasto: "Acima de R$50.000,00",
              comodo: "Outros",
              conhecimento: "Quero assessoria total do profissional",
              detalhes: "Quero reformar a casa toda! Quartos, sala, banheiros, preciso também de uma repaginada na fachada.",
            },
            {
              id: 88,
              nomeProjeto: "Banheiro de casa",
              descricaoProjeto: "Reforma curta no banheiro",
              preco: "40000",
              status: "Em andamento",
              local: "Casa",
              gasto: "Menos de R$1.000,00",
              comodo: "Banheiro",
              conhecimento: "Não tenho certeza",
              detalhes: "Preciso de uma reforma bem completa da minha sala, com bastante cudado nas decorações e nos lustres, preciso das paredes exatamente conforme anexo.",
            },
          ];
        }
        setProjetos(projeto);
      });
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <CardProjeto
      key={item.id}
      item={item}
      setProjetoSelecionado={setProjetoSelecionado}
    />
  );

  return (
    <>
      {projetoSelecionado ? (
        <DetalhesProjeto
          projeto={projetoSelecionado}
          setProjeto={setProjetoSelecionado}
          user={user}
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
          <Appbar.Header style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Appbar.Content
                title={`Olá, ${user.nome}`}
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
      )}
    </>
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
