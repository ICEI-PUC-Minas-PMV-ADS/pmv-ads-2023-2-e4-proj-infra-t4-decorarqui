import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { deleteProjeto } from "../services/QueryDB";
import ModalConfirmacao from "./ModalConfirmacao";

const CardProjeto = ({ _key, item, setProjetoSelecionado }) => {
  const [modalExclusao, setModalExclusao] = React.useState(false);

  const handleExcluir = (idProjeto) => {
    deleteProjeto(idProjeto).then();
    navigation.goBack();
  };

  return (
    <>
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
          <Pressable
            onPress={() => setProjetoSelecionado(item)}
          >
            <Text style={styles.detailsText}>Detalhes</Text>
          </Pressable>
          <Pressable
            style={styles.deleteContainer}
            onPress={() => setModalExclusao(true)}
          >
            <Feather name="trash-2" size={15} color="red" />
            <Text style={{ color: "red" }}>Excluir</Text>
          </Pressable>
        </Card.Content>
      </Card>
      <ModalConfirmacao
        openModal={modalExclusao}
        setOpenModal={setModalExclusao}
        title="Confirmar exclusão"
        bodyText={`Você confirma a remoção do projeto: "${item.nomeProjeto}"? Ao clicar em 'Confirmar', o projeto será removido permanentemente.`}
        leftButtonText="Voltar"
        leftButtonAction={null}
        rightButtonText="Confirmar"
        rightButtonAction={() => handleExcluir(item.idProjeto)}
      />
    </>
  );
};

const styles = StyleSheet.create({
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

export default CardProjeto;
