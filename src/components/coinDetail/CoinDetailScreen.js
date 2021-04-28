import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, SectionList, FlatList } from 'react-native'
import CoinMarketItem from './CoinMarketItem'
import Colors from '../../res/colors'
import Http from '../../libs/http'

const CoinsScreen = ({ route, navigation }) => {

    const [coin, setCoin] = useState({})
    const [markets, setMarkets] = useState([])

    useEffect(() => {
        const { paramsCoin } = route.params

        navigation.setOptions({ title: paramsCoin.symbol })

        getMarkets(paramsCoin.id)

        setCoin(paramsCoin)

    }, [])

    const getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`

        const marketsFromGet = await Http.instance.get(url)

        setMarkets(marketsFromGet)
    }

    const getSections = (aCoin) => {
        const data = [
            {
                title: "Market cap",
                data: [aCoin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data: [aCoin.volume24]
            },
            {
                title: "Change 24h",
                data: [aCoin.percent_change_24h]
            }
        ]

        return data
    }

    const getSymbolIcon = (name) => {
        if (name) {
            const symbol = name.toLowerCase().replace("", "-")
            
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.subHeader}>
                <Image style={styles.iconImg} source={{ uri: getSymbolIcon(coin.name) }} />
                <Text style={styles.titleText} >
                    {coin.name}
                </Text>
            </View>
            <SectionList
                style={styles.section}
                sections={getSections(coin)}
                keyExtractor={(item) => item}
                renderItem={({item}) => 
                    <View style={styles.sectionItem} >
                        <Text style={styles.itemText} >{item}</Text>
                    </View>
                }
                renderSectionHeader={({section}) => 
                    <View style={styles.sectionHeader} >
                        <Text style={styles.sectionText} >{section.title}</Text>
                    </View>
                }
            />
            <Text style={styles.marketTitle}>
                Markets
            </Text>
            <FlatList
                style={styles.flatList}
                data={markets}
                horizontal={true}
                renderItem={({item}) => <CoinMarketItem item={item} />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    subHeader: {
        backgroundColor: "rgba(0,0,0, 0.1)",
        padding: 16,
        flexDirection: "row"
    },
    section: {
        maxHeight: 220
    },
    titleText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8
    },
    iconImg: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: "rgba(0,0,0, 0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: "#fff",
        fontSize: 14
    },
    sectionText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold"
    },
    flatList: {
        maxHeight: 100,
        paddingLeft: 16
    },
    marketTitle: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: "bold"
    }
})

export default CoinsScreen
