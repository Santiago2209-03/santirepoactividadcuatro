import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View } from 'react-native';

export default function App() {
  const[loading, setLoading]=useState(true)
  const [users, setUsers]= useState([])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      setUsers(data)
      setLoading(false)
    })
  },[])

if(loading){
  return(<View style={styles.center}> <Text >Cargando...</Text> 
 <ActivityIndicator size ='large' color= '#00f'/>
  </View> )
}

  return (
    <View style={styles.container}>
      <Text>Consumiendo una API</Text>
      <FlatList
        data={users}
        renderItem={({ item }) =><View style={styles.item}>
            <Text> {item.title}</Text>
            <Text>{item.completed ? "✅" : "❌" }</Text>
          </View>}
        keyExtractor={item =>String (item.id)}
      />
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
  center:{
    flex:1,
    backgroundColor: '#ffffffff',
    alignItems:'center',
    justifyContent:'center',

  },
  item: {
    flexDirection: 'row', //Pone los elementos en fila
    justifyContent: 'space-between', //Deja espacio entre los elementos
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});