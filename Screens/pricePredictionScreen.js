import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { ListItem, SearchBar, Image } from 'react-native-elements';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Price prediction</Text>

      <View style={styles.vieww}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../assets/book-loading.jpg')}
        />

        <Text style={styles.text}>This feature is not ready yet.</Text>
        <Text style={styles.textSmaller}>
          Are you a developer and want to help? :)
        </Text>
        <Text style={styles.text}>Contact us!</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() =>
            Linking.openURL('mailto:alphachain.contact@gmail.com')
          }>
          <Image
            style={{ width: 60, height: 40 }}
            source={require('../assets/email.jpg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#171C30',
  },

  textTitle: {
    color: '#95C35D',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 150,
    padding: 10,
  },

  text: {
    color: '#95C35D',
    fontWeight: 'bold',
    fontSize: 20,

    padding: 10,
  },

  textSmaller: {
    color: '#95C35D',
    fontWeight: 'bold',
    fontSize: 18,

    padding: 10,
  },

  vieww: {
    marginBottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    alignItems: 'center',
    //backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
