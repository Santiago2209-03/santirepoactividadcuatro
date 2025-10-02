import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.fondo}
        source={{uri: 'https://httpcats.com/102.jpg'}}
        >
      <image
          style={styles.foto}
          source={require('./assets/splash-icon.png')}
        />
        <Image
        style={styles.foto}
        source={{uri: 'https://httpcats.com/101.jpg'}}
      />
      </ImageBackground>
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
  foto: {
    width: 200,
    height: 200,
  },
  fondo: {
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
  },
});
