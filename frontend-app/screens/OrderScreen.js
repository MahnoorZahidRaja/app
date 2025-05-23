import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const OrderScreen = () => {
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState('');

  const addOrder = () => {
    if (!productName || !status) {
      Alert.alert('Please select both product and status');
      return;
    }

    fetch('http://192.168.18.51:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name: productName, status }),
    })
      .then(res => res.json())
      .then(() => {
        setProductName('');
        setStatus('');
        Alert.alert('Order submitted successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Could not submit order.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Order</Text>

      <Text style={styles.label}>Select Product</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={productName}
          onValueChange={(itemValue) => setProductName(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Select Product --" value="" />
          <Picker.Item label="Product A" value="Product A" />
          <Picker.Item label="Product B" value="Product B" />
          <Picker.Item label="Product C" value="Product C" />
        </Picker>
      </View>

      <Text style={styles.label}>Select Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Select Status --" value="" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Processing" value="Processing" />
          <Picker.Item label="Shipped" value="Shipped" />
          <Picker.Item label="Delivered" value="Delivered" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit Order" onPress={addOrder} color="#32CD32" />
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default OrderScreen;
