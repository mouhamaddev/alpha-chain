import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryLine } from 'victory-native';
import { useNavigation } from '@react-navigation/native';

export default function CryptoViewScreen({ route }) {
  const { coin } = route.params;

  const { itemprice_change_percentage_24h } = route.params;
  const { itemcurrent_price } = route.params;
  const { itemlow_24h } = route.params;
  const { itemhigh_24h } = route.params;
  const { itemtotal_volume } = route.params;
  const { itemmarket_cap } = route.params;
  const { itemmarket_cap_rank } = route.params;

  const [data, setData] = useState();
  //const [coin, setCoin] = useState('bitcoin');
  const [period, setPeriod] = useState(30);

  const [info, setInfo] = useState();

  useEffect(() => {
    getData();

    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    )
      .then((response) => response.json())
      .then((json) => setInfo(json))
      .catch((error) => console.error(error))
      .finally(() => setInfo(false));
  }, [coin, period]);

  async function getData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${period}`
      );
      const formatData = response.data.prices.map(function (i) {
        return {
          x: i[0],
          y: i[1],
        };
      });
      setData(formatData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{coin}</Text>

      <View
        style={{ borderWidth: 1, borderRadius: 10, borderColor: '#95C35D' }}>
        <VictoryLine
          style={{
            data: {
              stroke: '#95C35D',
              strokeWidth: 2,
            },
          }}
          width={400}
          height={200}
          data={data}
        />
        <View style={styles.timeWrapper}>
          <Text
            style={[styles.time, period === 1 ? styles.underline : null]}
            onPress={() => setPeriod(1)}>
            1 Day
          </Text>
          <Text
            style={[styles.time, period === 7 ? styles.underline : null]}
            onPress={() => setPeriod(7)}>
            1 Week
          </Text>
          <Text
            style={[styles.time, period === 30 ? styles.underline : null]}
            onPress={() => setPeriod(30)}>
            1 Month
          </Text>
          <Text
            style={[styles.time, period === 365 ? styles.underline : null]}
            onPress={() => setPeriod(365)}>
            1 Year
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 90 }}>
        <View>
          <Text style={styles.info}>Price :</Text>

          <Text style={styles.info2}>${itemcurrent_price}</Text>

          <Text style={styles.info}>24h Price Change :</Text>

          <Text style={styles.info2}>{itemprice_change_percentage_24h}</Text>

          <Text style={styles.info}>24h Low :</Text>

          <Text style={styles.info2}>{itemlow_24h}</Text>

          <Text style={styles.info}>24h High :</Text>

          <Text style={styles.info2}>{itemhigh_24h}</Text>
        </View>

        <View style={{ paddingLeft: 40 }}>
          <Text style={styles.info}>Trading Volume : </Text>

          <Text style={styles.info2}>{itemtotal_volume}</Text>

          <Text style={styles.info}>Market Cap : </Text>

          <Text style={styles.info2}>{itemmarket_cap}</Text>

          <Text style={styles.info}>Market Rank : </Text>

          <Text style={styles.info2}>#{itemmarket_cap_rank}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111524',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#95C35D',
  },
  timeWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  coins: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  time: {
    margin: 20,
    padding: 10,
    color: '#95C35D',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#95C35D',
  },
  header: {
    textTransform: 'capitalize',
    position: 'absolute',
    top: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#95C35D',
  },

  info: {
    fontSize: 20,
    margin: 5,
    paddingTop: 20,
    color: '#95C35D',
    fontWeight: 'bold',
  },

  info2: {
    fontSize: 15,
    margin: 5,
    color: '#999999',
  },

  underline: { textDecorationLine: 'underline' },
});
