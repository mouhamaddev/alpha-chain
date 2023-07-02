import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CryptoViewScreen from './cryptoViewScreen.js';
import { useNavigation } from '@react-navigation/native';

const App = ({ navigation }) => {
  const Item = ({
    id,
    image,
    symbol,
    price_change_percentage_24h,
    current_price,
    low_24h,
    high_24h,
    total_volume,
    market_cap,
    market_cap_rank,
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          handleClick(
            id,
            price_change_percentage_24h,
            current_price,
            low_24h,
            high_24h,
            total_volume,
            market_cap,
            market_cap_rank
          )
        }>
        <View style={styles.item}>
          <Image style={{ width: 30, height: 30 }} source={{ uri: image }} />

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.textss}>
              <Text style={styles.title}>{id}</Text>
              <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
            </View>

            <View
              style={{
                flex: 1,
                textAlign: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
              }}>
              {price_change_percentage_24h > 0 ? (
                <Text
                  style={{ color: 'green', fontSize: 15, paddingRight: 20 }}>
                  +{price_change_percentage_24h}%
                </Text>
              ) : (
                <Text style={{ color: 'red', fontSize: 15, paddingRight: 20 }}>
                  {price_change_percentage_24h}%
                </Text>
              )}
            </View>

            <View
              style={{
                borderRadius: 10,
                borderColor: '#636363',
                borderWidth: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingTop: 5,
                }}>
                ${Math.round((current_price + Number.EPSILON) * 100) / 100}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleClick = (
    id,
    price_change_percentage_24h,
    current_price,
    low_24h,
    high_24h,
    total_volume,
    market_cap,
    market_cap_rank
  ) => {
    navigation.navigate('view', {
      itemprice_change_percentage_24h: price_change_percentage_24h,
      coin: id,
      itemcurrent_price: current_price,
      itemlow_24h: low_24h,
      itemhigh_24h: high_24h,
      itemtotal_volume: total_volume,
      itemmarket_cap: market_cap,
      itemmarket_cap_rank: market_cap_rank,
    });
  };

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      image={item.image}
      symbol={item.symbol}
      price_change_percentage_24h={item.price_change_percentage_24h}
      low_24h={item.low_24h}
      high_24h={item.high_24h}
      total_volume={item.total_volume}
      market_cap={item.market_cap}
      market_cap_rank={item.market_cap_rank}
      current_price={item.current_price}
    />
  );

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#111524', paddingTop: 60 }}>
      <Text style={styles.textTitle}>Alpha Chain</Text>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
    backgroundColor: '#171C30',
  },
  item: {
    backgroundColor: '#191e33',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,

    borderColor: '#636363',
    borderWidth: 1,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  title: {
    color: 'white',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  textss: {
    marginLeft: 20,
    marginBottom: 1,
  },
  symbol: {
    color: 'white',
    fontSize: 10,
  },

  textTitle: {
    color: '#95C35D',
    fontWeight: 'bold',
    fontSize: 30,

    padding: 24,
  },
});
