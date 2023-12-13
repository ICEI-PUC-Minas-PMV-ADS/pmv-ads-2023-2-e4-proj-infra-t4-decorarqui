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
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../images/backgroundCadastro.jpeg")}
      >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/Logo_decorArqui_modelo2.png")}
            style={{ width: 255, height: 100 }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#373435",
              marginTop: 5,
              left: "-15%",
            }}
          >
            Arquitetura e Design
          </Text>
        </View>
        <View style={styles.contentBody}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              textAlign: "center",
              marginBottom: 35,
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
              fontWeight: "bold",
              fontSize: 14,
              textAlign: "center",
              marginTop: 55,
              marginBottom: 35,
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
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    opacity: 0.7,
  },
  contentContainer: {
    justifyContent: "center",
    top: "10%",
    width: "100%",
    height: "80%",
    backgroundColor: "#a8a17e",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  contentBody: {
    flex: 1,
    top: "-15%",
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 45,
    borderRadius: 5,
    right: 1,
    justifyContent: "center",
    backgroundColor: "#A8CF45",
    fontSize: 16,
  },
});
export default Cadastro;
