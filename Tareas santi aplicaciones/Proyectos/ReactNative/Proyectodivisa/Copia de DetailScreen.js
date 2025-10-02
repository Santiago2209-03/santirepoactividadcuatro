import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function DetailScreen({ route }) {
  const { coin } = route.params;

  const formatNumber = (num) => {
    return `$${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <Text style={styles.title}>{coin.name}</Text>
        <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Precio Actual:</Text>
        <Text style={styles.value}>${coin.current_price.toLocaleString()}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Capitalización de Mercado:</Text>
        <Text style={styles.value}>{formatNumber(coin.market_cap)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Volumen (24h):</Text>
        <Text style={styles.value}>{formatNumber(coin.total_volume)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Máximo (24h):</Text>
        <Text style={[styles.value, styles.highPrice]}>${coin.high_24h.toLocaleString()}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Mínimo (24h):</Text>
        <Text style={[styles.value, styles.lowPrice]}>${coin.low_24h.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  symbol: {
    fontSize: 18,
    color: '#888',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    fontSize: 16,
    color: '#aaa',
  },
  value: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  highPrice: {
    color: '#4CAF50', // Verde
  },
  lowPrice: {
    color: '#F44336', // Rojo
  },
});