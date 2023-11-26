import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import Home from '../pages/Home';
import AdicionaAvaliacao from '../pages/AdicionaAvaliacao';
import AdicionaProjeto from '../pages/AdicionaProjeto';
import Cadastro from '../pages/Cadastro';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AdicionaAvaliacao"
        component={AdicionaAvaliacao}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AdicionaProjeto"
        component={AdicionaProjeto}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;