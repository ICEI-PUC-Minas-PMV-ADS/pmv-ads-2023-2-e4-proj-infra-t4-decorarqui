import React from "react";
import { Modal, Pressable, Text, View, StyleSheet } from "react-native";

const ModalConfirmacao = ({
  openModal,
  setOpenModal,
  title,
  bodyText,
  leftButtonText,
  leftButtonAction,
  rightButtonText,
  rightButtonAction,
}) => {
  console.log(openModal);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(!openModal);
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{title}</Text>
            <Text style={styles.modalText}>{bodyText}</Text>
            <View style={styles.buttonGroup}>
              <Pressable
                onPress={() => {
                  setOpenModal(!openModal);
                  leftButtonAction();
                }}
              >
                <Text style={styles.modalButtonText}>{leftButtonText}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setOpenModal(!openModal);
                  rightButtonAction();
                }}
              >
                <Text style={styles.modalButtonText}>{rightButtonText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    textAlign: "center",
  },
  modalText: {
    textAlign: "justify",
    fontSize: 14,
    marginVertical: 10,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default ModalConfirmacao;
