import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, Image, ActivityIndicator,
  Platform, TextInput, TouchableOpacity, Switch 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './DetailScreen'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Ionicons } from '@expo/vector-icons'; 
const Stack = createNativeStackNavigator();

const CryptoListItem = ({ coin, onPress, isFavorite, onToggleFavorite }) => {
  const priceChangeStyle = coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown;

  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View style={styles.leftColumn}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <View>
          <Text style={styles.name}>{coin.name}</Text>
          <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.price}>${coin.current_price.toLocaleString('en-US')}</Text>
        <Text style={priceChangeStyle}>{coin.price_change_percentage_24h.toFixed(2)}%</Text>
      </View>
      {/* ✅ 4. Ícono de estrella para los favoritos */}
      <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteIcon}>
        <Ionicons 
          name={isFavorite ? "star" : "star-outline"} 
          size={24} 
          color={isFavorite ? "#FFD700" : "#555"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

function HomeScreen({ navigation }) {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); 
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); 

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('@favorites');
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (e) {
        console.error('Failed to load favorites.', e);
      }
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
    } catch (e) {
      console.error('Failed to save favorites.', e);
    }
  };

  const toggleFavorite = (coinId) => {
    let newFavorites;
    if (favorites.includes(coinId)) {
      newFavorites = favorites.filter(id => id !== coinId);
    } else {
      newFavorites = [...favorites, coinId];
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);
  
  useEffect(() => {
    let tempCoins = showFavoritesOnly ? coins.filter(c => favorites.includes(c.id)) : coins;

    if (searchQuery !== '') {
      tempCoins = tempCoins.filter(
        coin =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCoins(tempCoins);
  }, [searchQuery, coins, favorites, showFavoritesOnly]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Cryptos List</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar criptomoneda..."
        placeholderTextColor="#6f5353ff"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* ✅ 11. Interruptor para mostrar solo favoritos */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Mostrar solo Favoritos</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={showFavoritesOnly ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={() => setShowFavoritesOnly(previousState => !previousState)}
          value={showFavoritesOnly}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#fff" /></View>
      ) : (
        <FlatList
          data={filteredCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CryptoListItem 
              coin={item} 
              onPress={() => navigation.navigate('Details', { coin: item })}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailScreen} options={({ route }) => ({ title: route.params.coin.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#121212', paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  title: {
    fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginVertical: 20,
  },
  searchBar: {
    height: 40, marginHorizontal: 16, marginBottom: 10, paddingHorizontal: 10,
    backgroundColor: '#333', color: '#fff', borderRadius: 8,
  },
  toggleContainer: {
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    marginHorizontal: 16, marginBottom: 10,
  },
  toggleText: {
    color: '#fff', marginRight: 10, fontSize: 16,
  },
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#333',
  },
  leftColumn: { flexDirection: 'row', alignItems: 'center', flex: 1 }, 
  image: { width: 40, height: 40, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  symbol: { fontSize: 14, color: '#888' },
  rightColumn: { alignItems: 'flex-end', flex: 1 }, 
  price: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  priceUp: { color: '#4CAF50' },
  priceDown: { color: '#F44336' },
  favoriteIcon: { 
    paddingLeft: 16,
  },
});