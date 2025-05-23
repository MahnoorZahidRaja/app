import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const InventoryScreen = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addInventoryItem = () => {
    if (!name || !quantity) {
      Alert.alert('Please fill both fields');
      return;
    }

    fetch('http://192.168.18.51:5000/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, quantity: parseInt(quantity) }),
    })
      .then(res => res.json())
      .then(() => {
        setName('');
        setQuantity('');
        Alert.alert('Inventory item submitted successfully!');
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Failed to submit inventory item');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Inventory Item</Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit Inventory" onPress={addInventoryItem} color="#1E90FF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default InventoryScreen;
