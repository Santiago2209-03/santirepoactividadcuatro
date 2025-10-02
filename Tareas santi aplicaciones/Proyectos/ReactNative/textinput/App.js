import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions } from 'react-native';
import React, {useState} from 'react';

export default function App() {

  const [text, setText]=useState()
  const [enviar, setEnviar]=useState()
  const [usuario, setUsuario]=useState()
  const [password, setPassword]=useState()
  const [logueado, setLogueado]=useState()
  
  return (
    
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <Text>Hola {enviar}</Text>
      <TextInput 
        style={styles.input}
        placeholder='Escribe aqui'
        defaultValue={text}
        onChangeText={t=>setText(t)}/>
      <Button title='Enviar'
        onPress={()=>{
          setEnviar(text)
          alert('Texto enviado con exito')
        }}/>

      <Text>Login</Text>
      <TextInput 
        style={styles.input}
        placeholder='Usuario'
        defaultValue={usuario}
        onChangeText={u=>setUsuario(u)}/>
        
      <TextInput 
        style={styles.input}
        placeholder='Contraseña'
        defaultValue={password}
        secureTextEntry={true}
        onChangeText={p=>setPassword(p)}/>
        
      <Button title='Ingresar'
        onPress={()=>{
          if(usuario === 'admin' && password === '1234') {
            setLogueado(usuario)
            alert('Acceso permitido')
          } else {
            alert('Usuario o contraseña incorrectos')
          }
        }}/>
      <Text>Bienvenido {logueado}</Text>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:'100%',
    height:40,
    backgroundColor:'#eee',
  },
  scrollview:{
    width:Dimensions.get('window').width
  },
});