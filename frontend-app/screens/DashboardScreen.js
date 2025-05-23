import { View, Text, Button, StyleSheet, Image } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        //source={require('C:\Users\Mahnoor\Downloads\karachi-trading-app\karachi-trading-app\frontend-app\assets\logo.png')}
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.heading}>Karachi Trading Co.</Text>
      <View style={styles.button}>
        <Button title="Go to Inventory" onPress={() => navigation.navigate('Inventory')} color="#1E90FF" />
      </View>
      <View style={styles.button}>
        <Button title="Go to Orders" onPress={() => navigation.navigate('Orders')} color="#32CD32" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default DashboardScreen;
