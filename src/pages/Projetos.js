import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { Avatar, Card, Button, FAB } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('decorarqui.db');

import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

import {
  deleteProjeto
} from '../services/QueryDB';

const Mesas = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM projetos', [], (_, { rows }) => {
        const projetos = rows._array.map((item) => ({
          id: item.id,
          nomeProjeto: item.nomeProjeto,
          descricaoProjeto: item.descricaoProjeto,
          preco: item.preco
        }));
        setProjetos(projetos);
      });
    });
  }, [isFocused]);

  const handleExcluir = (idProjeto) => {
    deleteProjeto(idProjeto).then();
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <Card.Title
      title={`${item.nomeProjeto}`}
      left={(props) => <Avatar.Icon {...props} icon="table-furniture" style={{backgroundColor:'#311433'}}/>}
      right={(props) => (
          <Button
            {...props}
            mode="contained"
            style={{backgroundColor:'#311433'}}
            onPress={() => {
              Alert.alert(
                'Fechar Projeto',
                `O valor total do projeto ${item.nomeProjeto} é R$ ${item.preco.toFixed(2)}. Deseja confirmar o fechamento do projeto?`,
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'Confirmar',
                    onPress: () => {handleExcluir(item.id)}
                  },
                ]
              );
            }}>
            Fechar Projeto
          </Button>
        )
      }
    />
  );

  return (
    <Container>
      <Header title={'DECORARQUI'} />
      <Body>
        <FlatList
          data={projetos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          color="#FFF"
          onPress={() => navigation.navigate('AdicionaProjeto')}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#A8CF45',
  },
});

export default Mesas;
