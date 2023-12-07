import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';

import Body from '../components/Body';
import { useNavigation } from '@react-navigation/native';

const CadastroProfissional = () => {
  const navigation = useNavigation();
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirmSenha, setConfirmSenha] = React.useState('');
  const [infoProfi, setInfoProfi] = React.useState('');

  return (
    <Body>
      <View style={styles.container}>
        <View style={styles.header}> </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../images/Logo_decorArqui_modelo2.png')}
            style={{ width: 255, height: 100, justifyContent: 'center' }}
          />

          <Text
            style={{
              position: 'relative',
              fontSize: '16px',
              fontWeight: 'Bold',
              color: '#373435',
              marginTop: '5px',
              left: '-15%',
            }}>
            Arquitetura e Design
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: '15px',
              color: '#4F4D4E',
              fontWeight: 'Bold',
              textDecorationLine: 'underline',
            }}>
            PROFISSIONAL
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Nome"
              value={nome}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: 'green', underlineColor: 'transparent' },
              }}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: 'green', underlineColor: 'transparent' },
              }}
            />
            <TextInput
              label="Telefone"
              value={telefone}
              onChangeText={(text) => setTelefone(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: 'green', underlineColor: 'transparent' },
              }}
            />
            <TextInput
              label="Senha"
              value={senha}
              secureTextEntry={true}
              onChangeText={(text) => setSenha(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: 'green', underlineColor: 'transparent' },
              }}
            />
            <TextInput
              label="Confirmar Senha"
              value={confirmSenha}
              secureTextEntry={true}
              onChangeText={(text) => setConfirmSenha(text)}
              style={styles.input}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: 'green', underlineColor: 'transparent' },
              }}
            />
            <TextInput
              label="Informações Profissionais"
              value={infoProfi}
              onChangeText={(text) => setInfoProfi(text)}
              style={styles.inputInfo}
              labelStyle={styles.labelInput}
              theme={{
                colors: { primary: 'green', underlineColor: 'transparent' },
              }}
            />
            <View style={styles.buttonCadastro}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('piru')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  NOVO CADASTRO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  header: {
    position: 'absolute',
    height: '10%',
    width: '100%',
    backgroundColor: '#A8CF45',
  },
  imageContainer: {
    alignItems: 'center',
    top: '15%',
  },
  input: {
    width: '300px',
    backgroundColor: 'white',

  },
  inputInfo: {
    width: '300px',
    height: '300px',
    backgroundColor: 'white',
    textAlignVertical: 'top'
  },
  labelInput: {
    textAlign: 'center',
  },
  buttonCadastro: {
    width: '300px',
    height: 45,
    borderRadius: '5px',
    marginTop: '10px',
    right: '1px',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#373435',
    fontSize: '16px',
  },
  button: {
    textAlign: 'center',
  },
});

export default CadastroProfissional;
