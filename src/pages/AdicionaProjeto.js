import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  RadioButton,
  Text,
  TextInput,
  Button,
  Appbar,
} from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import {
  insertProjeto
} from '../services/QueryDB';

import { useNavigation } from '@react-navigation/native';

const AdicionaProjeto = ({ route }) => {
  const navigation = useNavigation();
  const { item, sequencia } = route.params ? route.params : {};

  const [nomeProjeto, setNomeProjeto] = useState(null);
  const [descricaoProjeto, setDescricao] = useState(null);
  const [preco, setPreco] = useState(null);

  const handleSalvar = () => {
    insertProjeto({
      nomeProjeto: nomeProjeto,
      descricaoProjeto: descricaoProjeto,
      preco: preco
    }).then();

    navigation.goBack();
  };

  const handleExcluir = () => {
    deleteProjeto(item.id).then();
    navigation.goBack();
  };

  return (
    <Container>
      <Header title={'ADICIONA PROJETO'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {item && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>

      <Body>
        <Input
          label="Nome Projeto"
          value={nomeProjeto}
          onChangeText={(text) => setNomeProjeto(text)}
          left={<TextInput.Icon name="note" />}
        />
        <Input
          label="Descricao"
          value={descricaoProjeto}
          onChangeText={(text) => setDescricao(text)}
          left={<TextInput.Icon name="playlist-edit" />}
        />
        <Input
          label="Preco"
          value={preco}
          onChangeText={(text) => setPreco(text)}
          keyboardType="decimal-pad"
          left={<TextInput.Icon name="currency-brl" />}
        />

        <Button mode="contained" style={styles.button} onPress={handleSalvar}>
          Salvar
        </Button>

        {item && (
          <Button
            mode="contained"
            color={'red'}
            style={styles.button}
            onPress={handleExcluir}>
            Excluir
          </Button>
        )}
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
    backgroundColor:'#A8CF45'
  },
});

export default AdicionaProjeto;
