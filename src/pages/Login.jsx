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
          navigation.navigate("Home");
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
      >
        <View style={{ flex: 1 }}>
          <View style={styles.image}>
            <Image
              source={require("../images/Logo_decorArqui_modelo2.png")}
              style={{ width: "100%", resizeMode: "contain" }}
            />
            <Text style={styles.arquiteturaDesignTexto}>
              Arquitetura e Design
            </Text>
            <View style={styles.bemvindoContainer}>
              <Text style={styles.bemVindoTexto}>Bem Vindo</Text>
            </View>
          </View>

          <View style={styles.interactContainer}>
            
            {loginErro ? (
              <Text style={styles.errorText}>{loginErro}</Text>
            ) : null}

            <TextInput
              placeholder="Usuário"
              animationDuration={0}
              value={user}
              mode="outlined"
              onChangeText={(text) => setUser(text)}
              style={{
                width: 250,
                height: 45,
                borderRadius: 5,
                textAlign: "center",
                marginBottom: 10,
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
                width: 250,
                height: 45,
                borderRadius: 5,
                textAlign: "center",
              }}
              theme={{
                colors: { primary: "green", underlineColor: "transparent" },
              }}
            />

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
                  fontSize: 15,
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  textDecorationLine: "underline",
                  marginTop: 4,
                  marginBottom: 10
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
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "relative",
    top: "3%",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1,
  },
  arquiteturaDesignTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#373435",
    alignSelf: "flex-start",
  },
  bemVindoTexto: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#373435",
    textAlign: "center",
  },
  bemvindoContainer: {
    marginTop: 10,
    textAlign: "center",
  },
  interactContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  buttonEntrar: {
    width: 300,
    height: 45,
    borderRadius: 5,
    right: 1,
    justifyContent: "center",
    backgroundColor: "#A8CF45",
    fontSize: 16,
    marginTop: "4%"
  },
  button: {
    textAlign: "center",
  },
  forgotContainer: {
    textAlign: "center",
  },
  buttonCadastro: {
    width: 300,
    height: 45,
    borderRadius: 5,
    right: 1,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#373435",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Login;
