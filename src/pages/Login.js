import React, { useState } from 'react'
import {View, Text, Image, StyleSheet, TextInput, Button, Pressab} from 'react-native'

import {useNavigation} from '@react-navigation/native';
import { Database } from '../services/DbServices'

const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    const executeQuery = Database.getConnection();

    executeQuery('SELECT * FROM usuario WHERE nome = ? AND senha = ?', [
      username,
      password,
    ])
      .then((result) => {
        if (result.rows.length > 0) {
          // Login bem-sucedido, redirecionar para a tela inicial
          navigation.navigate('Home');
        } else {
          // Login inválido, exibir mensagem de erro
          setLoginError('Nome de usuário ou senha inválidos');
        }
      })
      .catch((error) => {
        console.log('Erro ao fazer login:', error);
        setLoginError('Ocorreu um erro ao fazer login');
      });
  }

  
  return(

    <View style={{ flexDirection: 'column'}}>
      <View style={styles.css}>
        <Text>Seja Bem-Vindo ao</Text>
      </View>
      
      <View style={styles.image}> 
        <Image source={require('../images/Logo_decorArqui_modelo2.png')} 
        style={{width: 255, height: 100}}
        />
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.input_login}
          placeholder="Login"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input_password}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

      <View style={styles.buttonlogin}>
      <Button
        title="ENTRAR"
        color="#A8CF45"
        onPress= {handleLogin}
      />
      </View>
      <View style={styles.forgotpassword}>
        <Button
        title="Novo Cadastro"
        style={{color: '#373435'}}
        onPress={() => navigation.navigate('Cadastro')}
        />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  css: {
    alignItems:'center',
    padding: 100,
  },
  image:{
    alignItems:'center',
    paddingBottom: 20,
  },
  input_login:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input_password:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonlogin:{
    padding: 30,
  },
  forgotpassword:{
    backgroundColor: '#373435'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
