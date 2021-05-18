import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import Http from '../../libs/http'
import CoinsItem from './CoinsItem'
import Colors from '../../res/colors'
import CoinsSearch from './CoinsSearch'

const CoinsScreen = ({ navigation }) => {

    const [coins, setCoins] = useState([])
    const [allCoins, setAllCoins] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLoading(true)
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")
        setLoading(false)
        setCoins(res.data)
        setAllCoins(res.data)
    }

    const handlePress = (coin) => {
        navigation.navigate('CoinDetail', { coin })
    }

    const handleSearch = (query) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
            coin.symbol.toLowerCase().includes(query.toLowerCase()) 
        })

        setCoins(coinsFiltered)
    }

    return (
        <View style={styles.container}>
            <CoinsSearch onChange={handleSearch} />
            {loading ? 
                <ActivityIndicator style={styles.loader} color='#fff' size="large" /> :
                null
            }
            <FlatList 
                data={coins}
                renderItem={({ item }) => 
                    <CoinsItem item={item} onPress={() => handlePress(item)} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    titleText: {
        color: "#fff",
        textAlign: "center"
    },
    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: "white",
        textAlign: "center"
    },
    loader: {
        marginTop: 60
    }
})

export default CoinsScreen
