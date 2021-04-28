import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../res/colors'

const CoinMarketItem = ({ item }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.nameText}>
                {item.name}
            </Text>
            <Text style={styles.priceText} >
                {item.price_usd}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.zircon,
        backgroundColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 1,
        padding: 16,
        margin: 8,
        alignItems: 'center'
    },
    nameText: {
        color: '#fff',
        fontWeight: "bold"
    },
    priceText: {
        color: '#fff'
    }

})

export default CoinMarketItem
