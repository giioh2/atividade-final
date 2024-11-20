import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

// Tela Principal
const HomeScreen = ({ navigation }) => {
  const [waterIntake, setWaterIntake] = useState(0);

  // Carregar progresso salvo ao abrir o app
  useEffect(() => {
    const loadData = async () => {
      const savedWater = await AsyncStorage.getItem('waterIntake');
      if (savedWater) setWaterIntake(parseInt(savedWater));
    };
    loadData();
  }, []);

  // Salvar progresso sempre que atualizado
  useEffect(() => {
    AsyncStorage.setItem('waterIntake', waterIntake.toString());
  }, [waterIntake]);

  const addCup = () => {
    setWaterIntake(waterIntake + 250); // 250ml por copo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rastreador de Água</Text>
      <Text style={styles.waterText}>{waterIntake} ml</Text>
      <TouchableOpacity style={styles.button} onPress={addCup}>
        <Text style={styles.buttonText}>Adicionar 1 Copo (250ml)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('Histórico')}
      >
        <Text style={styles.buttonText}>Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tela de Histórico
const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico (em desenvolvimento)</Text>
    </View>
  );
};

// Navegação
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Histórico" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  waterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyButton: {
    backgroundColor: '#4682b4',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});