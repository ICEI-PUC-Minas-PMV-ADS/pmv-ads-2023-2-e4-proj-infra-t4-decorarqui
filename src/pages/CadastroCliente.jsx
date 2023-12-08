import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { TextInput } from "react-native-paper";
import { Database } from "../services/DbServices";
import ModalConfirmacao from "../components/ModalConfirmacao";

const CadastroCliente = () => {
  const navigation = useNavigation();

  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmSenha, setConfirmSenha] = React.useState("");

  const [modalConfirmacao, setModalConfirmacao] = React.useState(false);

  const [registroErro, setRegistroErro] = React.useState(null);

  const handleCadastro = () => {
    console.log("Valores capturados:", nome, email, senha);
    const executeQuery = Database.getConnection();

    if (nome && email && senha) {
      console.log("Deu bom");
      executeQuery(
        "INSERT INTO Cliente (nome, email, telefone, senha) VALUES (?, ?, ?, ?)",
        [nome, email, telefone, senha]
      );
      navigation.navigate("Login");
    } else {
      console.log("Deu ruim");
      setRegistroErro("Preencha todos os campos!");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}> </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/Logo_decorArqui_modelo2.png")}
            style={{ width: 255, height: 100, justifyContent: "center" }}
          />

          <Text
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: "Bold",
              color: "#373435",
              marginTop: "5px",
              left: "-15%",
            }}
          >
            Arquitetura e Design
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#4F4D4E",
              fontWeight: "Bold",
              textDecorationLine: "underline",
            }}
          >
            CLIENTE
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Nome"
              value={nome}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: "green", underlineColor: "transparent" },
              }}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: "green", underlineColor: "transparent" },
              }}
            />
            <TextInput
              label="Telefone"
              value={telefone}
              onChangeText={(text) => setTelefone(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: "green", underlineColor: "transparent" },
              }}
            />
            <TextInput
              label="Senha"
              value={senha}
              secureTextEntry={true}
              onChangeText={(text) => setSenha(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: "green", underlineColor: "transparent" },
              }}
            />
            <TextInput
              label="Confirmar Senha"
              value={confirmSenha}
              secureTextEntry={true}
              onChangeText={(text) => setConfirmSenha(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: "green", underlineColor: "transparent" },
              }}
            />

            {registroErro ? (
              <Text style={styles.errorText}>{registroErro}</Text>
            ) : null}

            <View style={styles.buttonCadastro}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalConfirmacao(!modalConfirmacao)}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  NOVO CADASTRO
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{...styles.buttonCadastro, marginTop: 20}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Login")}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  VOLTAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ModalConfirmacao
        openModal={modalConfirmacao}
        setOpenModal={setModalConfirmacao}
        title="Confirmar cadastro"
        bodyText="Você confirma as informações fornecidas? Ao clicar em 'Confirmar', iremos lhe registrar como Cliente do DecorArqui."
        leftButtonText="Voltar"
        leftButtonAction={null}
        rightButtonText="Confirmar"
        rightButtonAction={handleCadastro}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    position: "absolute",
    height: "15%",
    width: "100%",
    backgroundColor: "#A8CF45",
  },
  imageContainer: {
    alignItems: "center",
    top: "25%",
  },
  input: {
    width: "300px",
    backgroundColor: "white",
    textAlign: "center",
  },
  labelInput: {
    textAlign: "center",
  },
  buttonCadastro: {
    width: "300px",
    height: 45,
    borderRadius: "5px",
    marginTop: "55px",
    right: "1px",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#373435",
    fontSize: "16px",
  },
  button: {
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default CadastroCliente;
