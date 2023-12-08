import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text, FAB, Button } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('decorarqui.db');

import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const Avaliacao = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [projetos, setProjeto] = useState([]);

  useEffect(() => {
    // Consulta todos os tipos de gastos do banco de dados e atualiza o estado dos tipos
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM projeto', [], (_, { rows }) => {
        const projetos = rows._array.map((item) => ({
          id: item.id,
          nomeProjeto: item.nomeProjeto
        }));
        setProjeto(projetos);
      });
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <List.Accordion
      title={`${item.nomeProjeto}`}
      id={item.id}
      style={{ backgroundColor: '#fff' }}
      left={(props) => <List.Icon {...props} icon="food-outline" />}>
    </List.Accordion>
  );

  return (
    <Container>
      <Header title={'PROJETOS'} />
      <Body>
        <Button
          icon="plus"
          mode="contained"
          style={{ backgroundColor: '#311433' }}
          onPress={() => navigation.navigate('AdicionaAvaliacao')}>
          Avaliar
        </Button>
        <FlatList
          data={projetos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </Container>
  );
};

export default Avaliacao;
