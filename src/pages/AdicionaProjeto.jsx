import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TextInput, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Checkbox,
  Divider,
  Text,
  TextInput as TextInputPaper,
} from "react-native-paper";
import RadioButtonGroup from "../components/RadioButtonGroup";
import InputSearchBar from "../components/inputSearchBar";
import defaultUser from "../images/defaultUser.png";
import { insertProjeto } from "../services/QueryDB";
import { architectSeeds, formOption, normalizarTexto } from "../shared/utils";

const AdicionaProjeto = ({ route }) => {
  const { loggedUser } = route.params;
  const navigation = useNavigation();
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [descricaoProjeto, setDescricaoProjeto] = useState("");
  const [ambienteServico, setAmbienteServico] = useState(null);
  const [conhecimentoPrevio, setConhecimentoPrevio] = useState(null);
  const [comodoServico, setComodoServico] = useState(null);
  const [tempoServico, setTempoServico] = useState(null);
  const [gastoServico, setGastoServico] = useState(null);
  const [idArquitetoSelecionado, setIdArquitetoSelecionado] = useState(null);

  const [arquitetos, setArquitetos] = useState(architectSeeds);
  const [filtroArquitetos, setFiltroArquitetos] = useState([...arquitetos]);
  const [search, setSearch] = useState("");

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

  const [user, setUser] = useState(loggedUser);

  const [stage, setStage] = useState(1);

  const handleNext = () => {
    setStage(stage + 1);
  };

  const handlePrevious = () => {
    setStage(Math.max(1, stage - 1));
  };

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

  const renderArchitect = ({ item }) => (
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
              <Checkbox
                status={
                  idArquitetoSelecionado === item.Id ? "checked" : "unchecked"
                }
                onPress={() => {
                  idArquitetoSelecionado === item.Id
                    ? setIdArquitetoSelecionado(null)
                    : setIdArquitetoSelecionado(item.Id);
                }}
              />
            </View>
          </Card.Content>
        </View>
      </View>
    </Card>
  );

  const renderArchitectList = () => {
    return (
      <View
        style={{
          height: "80%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <View style={{ height: "70%" }}>
          <FlatList
            style={styles.listContainer}
            data={filtroArquitetos}
            renderItem={renderArchitect}
            keyExtractor={(item) => item.Id}
          />
        </View>
        <View style={{ height: "10%", paddingLeft: "10%" }}>
          <InputSearchBar
            placeholder={"Buscar profissional"}
            search={search}
            setSearch={setSearch}
          />
        </View>
      </View>
    );
  };

  const renderForm = () => {
    switch (stage) {
      case 1:
        return (
          <View style={{ height: "80%" }}>
            <Text style={styles.sectionTitle}>
              Qual local você deseja decorar?
            </Text>
            <Divider style={styles.divider} />
            <Card style={styles.formCard}>
              <RadioButtonGroup
                options={formOption.local}
                value={ambienteServico}
                setValue={setAmbienteServico}
              />
            </Card>
          </View>
        );

      case 2:
        return (
          <View style={{ height: "80%" }}>
            <Text style={styles.sectionTitle}>Você já sabe como decorar?</Text>
            <Divider style={styles.divider} />
            <Card style={styles.formCard}>
              <RadioButtonGroup
                options={formOption.conhecimento}
                value={conhecimentoPrevio}
                setValue={setConhecimentoPrevio}
              />
            </Card>
          </View>
        );

      case 3:
        return (
          <View style={{ height: "80%" }}>
            <Text style={styles.sectionTitle}>Qual o cômodo do serviço?</Text>
            <Divider style={styles.divider} />
            <Card style={styles.formCard}>
              <RadioButtonGroup
                options={formOption.comodo}
                value={comodoServico}
                setValue={setComodoServico}
              />
            </Card>
          </View>
        );

      case 4:
        return (
          <View style={{ height: "80%" }}>
            <Text style={styles.sectionTitle}>
              Quando você pretende realizar o serviço?
            </Text>
            <Divider style={styles.divider} />
            <Card style={styles.formCard}>
              <RadioButtonGroup
                options={formOption.tempo}
                value={tempoServico}
                setValue={setTempoServico}
              />
            </Card>
          </View>
        );

      case 5:
        return (
          <View style={{ height: "80%" }}>
            <Text style={styles.sectionTitle}>
              Até quanto você pretende gastar com o seu proejeto?
            </Text>
            <Divider style={styles.divider} />
            <Card style={styles.formCard}>
              <RadioButtonGroup
                options={formOption.gasto}
                value={gastoServico}
                setValue={setGastoServico}
              />
            </Card>
          </View>
        );

      case 6:
        return (
          <View style={{ height: "80%" }}>
            <Text style={styles.sectionTitle}>
              Detalhes e resumo do seu pedido
            </Text>
            <Divider style={styles.divider} />
            <Card style={styles.formCard}>
              <TextInputPaper
                label="Nome do Projeto"
                mode="outlined"
                value={nomeProjeto}
                style={{ backgroundColor: "white" }}
                onChangeText={(e) => setNomeProjeto(e)}
              />
              <TextInputPaper
                label="Detalhes do Projeto"
                mode="outlined"
                value={descricaoProjeto}
                onChangeText={(e) => setDescricaoProjeto(e)}
                placeholder="Informe todos os detalhes do seu pedido. Tente “Preciso de...“"
                multiline
                style={{ marginTop: 20, backgroundColor: "white" }}
                render={(props) => (
                  <TextInput {...props} style={styles.textArea} />
                )}
              />
            </Card>
          </View>
        );

      case 7:
        return (
          <View style={{ height: "80%" }}>
            <Text style={styles.sectionTitle}>
              Selecione para qual profissional deseja enviar o seu projeto
            </Text>
            <Divider style={styles.divider} />
            {renderArchitectList()}
          </View>
        );
      default:
        return null;
    }
  };

  const handleSalvar = () => {
    insertProjeto({
      nomeProjeto: nomeProjeto,
      descricaoProjeto: descricaoProjeto,
      preco: preco,
    }).then();

    navigation.goBack();
  };

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
              setIndex(0);
              navigation.navigate("Home", { initialIndex: 1, user: user });
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
            Novo Projeto
          </Text>
        </View>
      </Appbar.Header>
      <View style={{ height: "100%" }}>
        {renderForm()}
        <View style={styles.buttonContainer}>
          {stage === 1 && (
            <Button
              mode="contained"
              color="#A8CF45"
              onPress={() =>
                navigation.navigate("Home", {
                  initialIndex: 1,
                  user: loggedUser,
                })
              }
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Cancelar
            </Button>
          )}

          {stage > 1 && (
            <Button
              mode="contained"
              color="#A8CF45"
              onPress={handlePrevious}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Voltar
            </Button>
          )}

          {stage < 7 && (
            <Button
              mode="contained"
              color="#A8CF45"
              onPress={handleNext}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Próximo
            </Button>
          )}

          {stage === 7 && (
            <Button
              mode="contained"
              color="#A8CF45"
              onPress={() =>
                navigation.navigate("Home", {
                  initialIndex: 1,
                  user: loggedUser,
                })
              }
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Concluir
            </Button>
          )}
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
  button: {
    elevation: 5,
    width: "35%",
    height: "40px",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  sectionTitle: {
    textAlign: "center",
    marginTop: "15%",
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    width: "80%",
    alignSelf: "center",
    margin: "24px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  formCard: {
    width: "85%",
    height: "70%",
    alignSelf: "center",
    padding: 10,
  },
  textArea: {
    placeholderTextColor: "rgba(0, 0, 0, 0.54)",
    fontSize: 16,
    color: "black",
    verticalAlign: "top",
    textAlign: "left",
    height: "30vh",
    margin: 14,
    paddingLeft: 14,
    outlineColor: "transparent",
    backgroundColor: "white",
  },
  flexRow: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
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
});

export default AdicionaProjeto;
