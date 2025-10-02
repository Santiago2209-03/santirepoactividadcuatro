import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const MiComponente = () =>{
  const [texto, setTexto] = useState('Valor original')
const actualizarTexto = () => {
    setTexto('Haz presionado el texto');
  }
  return (
    <Text onPress={actualizarTexto}>{texto}</Text>
  )
}



  export default function App() {
  return (
    <View style={styles.container}>
      <MiComponente />
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cac0c0ff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row-reverse',


},
});
