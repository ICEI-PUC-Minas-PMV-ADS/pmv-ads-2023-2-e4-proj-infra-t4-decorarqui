import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

import { Database } from "../services/DbServices";

import Body from "../components/Body.js";

const Login = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const [loginErro, setLoginErro] = useState("");

  const handleLogin = () => {
    const executeQuery = Database.getConnection();

    executeQuery("SELECT * FROM Cliente WHERE nome = ? AND senha = ?", [
      user,
      senha,
    ])
      .then((result) => {
        if (result.rows.length > 0) {
          navigation.navigate("Home", {
            initialIndex: 0,
            user: { ...result.rows[0], ListaFavoritos: [] },
          });
        } else {
          setLoginErro("Nome de usuário ou senha inválidos");
        }
      })
      .catch((error) => {
        console.log("Erro ao fazer login:", error);
        setLoginErro("Ocorreu um erro ao fazer login");
      });
  };

  return (
    <>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../images/backgroundLogin.jpeg")}
      ></ImageBackground>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            source={require("../images/Logo_decorArqui_modelo2.png")}
            style={{ width: "100%", aspectRatio: 641 / 259 }}
          />
          <Text style={styles.arquiteturaDesignTexto}>
            Arquitetura e Design
          </Text>
          <View style={styles.bemvindoContainer}>
            <Text style={styles.bemVindoTexto}>Bem Vindo</Text>
          </View>
        </View>

        <View style={styles.interactContainer}>
          <TextInput
            placeholder="Usuário"
            animationDuration={0}
            value={user}
            mode="outlined"
            onChangeText={(text) => setUser(text)}
            style={{
              width: "250px",
              height: 45,
              top: "55%",
              borderRadius: "5px",
              textAlign: "center",
              marginBottom: "10px",
            }}
            theme={{
              colors: { primary: "green", underlineColor: "transparent" },
            }}
          />

          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            animationDuration={0}
            value={senha}
            mode="outlined"
            onChangeText={(text) => setSenha(text)}
            style={{
              width: "250px",
              height: 45,
              top: "55%",
              borderRadius: "5px",
              textAlign: "center",
            }}
            theme={{
              colors: { primary: "green", underlineColor: "transparent" },
            }}
          />

          {loginErro ? <Text style={styles.errorText}>{loginErro}</Text> : null}

          <View style={styles.buttonEntrar}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                ENTRAR
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.forgotContainer}>
            <Text
              style={{
                color: "white",
                fontSize: "15px",
                fontFamily: "Roboto",
                fontWeight: "500",
                textDecoration: "underline",
              }}
            >
              Esqueci minha senha
            </Text>
          </View>

          <View style={styles.buttonCadastro}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Cadastro")}
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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "relative",
    top: "15%",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  backgroundImage: {
    flex: 1,
    position: "fixed",
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    opacity: 1,
  },
  arquiteturaDesignTexto: {
    fontSize: "16px",
    fontWeight: "Bold",
    color: "#373435",
    marginTop: "5px",
    alignSelf: "flex-start",
  },
  bemVindoTexto: {
    fontSize: "30px",
    fontWeight: "Bold",
    color: "#373435",
    textAlign: "center",
  },
  bemvindoContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  interactContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: "48%",
  },
  buttonEntrar: {
    width: "300px",
    height: 45,
    borderRadius: "5px",
    top: "65%",
    right: "1px",
    justifyContent: "center",
    backgroundColor: "#A8CF45",
    fontSize: "16px",
  },
  button: {
    textAlign: "center",
  },
  forgotContainer: {
    top: "68%",
    textAlign: "center",
  },
  buttonCadastro: {
    width: "300px",
    height: 45,
    borderRadius: "5px",
    top: "80%",
    right: "1px",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#373435",
    fontSize: "16px",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Login;
