import { useNavigation } from "@react-navigation/native";
import { default as React, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as SQLite from "expo-sqlite";

import { Database } from "../services/DbServices";

const db = SQLite.openDatabase("decorarqui.db");

const Cadastro = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.body}> </View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../images/backgroundCadastro.jpeg")}
      ></ImageBackground>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/Logo_decorArqui_modelo2.png")}
            style={{ width: 255, height: 100 }}
          />

          <Text
            style={{
              fontSize: "16px",
              fontWeight: "Bold",
              color: "#373435",
              marginTop: "5px",
              left: "-15%",
            }}
          >
            Arquitetura e Design
          </Text>
        </View>
        <View style={styles.contentBody}>
          <Text
            style={{
              fontWeight: "Bold",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            Encontre com facilidade profissionais altamente qualificados em
            decoração e design, solicite orçamentos e consulte avaliações
            confiáveis.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CadastroCliente")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              QUERO REFORMAR
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: "Bold",
              fontSize: "14px",
              textAlign: "center",
              marginTop: "55px",
              marginBottom: "35px",
            }}
          >
            Amplie sua clientela, promova seus serviços, envie orçamentos e
            propostas de maneira eficaz e conquiste avaliações positivas.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CadastroProfissional")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              SOU ARQUITETO/DESIGNER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    position: "fixed",
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    opacity: 0.7,
  },
  contentContainer: {
    position: "absolute",
    top: "10%",
    width: "100%",
    height: "80%",
    backgroundColor: "#a8a17e",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: "15px",
  },
  contentBody: {
    flex: 1,
    top: "-15%",
    alignItems: "center",
  },
  button: {
    width: "300px",
    height: 45,
    borderRadius: "5px",
    right: "1px",
    justifyContent: "center",
    backgroundColor: "#A8CF45",
    fontSize: "16px",
  },
});
export default Cadastro;
