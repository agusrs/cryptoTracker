import React, {useEffect, useState} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import colors from '../../res/colors'
import CoinsItem from '../coins/CoinsItem'
import FavoritesEmptyState from './FavoritesEmptyState'
import Storage from '../../libs/storage'

const FavoritesScreen = ({ navigation }) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        navigation.addListener("focus", getFavorites)

        return () => {
            navigation.removeListener("focus", getFavorites)
        }
    }, [])

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys()

            const keys = allKeys.filter(key => key.includes("favorite-"))

            const favs = await Storage.instance.multiGet(keys)

            const mappedFavs = favs.map(f => JSON.parse(f[1]))

            setFavorites(mappedFavs)

        } catch (error) {
            console.log(error)
        }
    }

    const handlePress = (coin) => {
        navigation.navigate("CoinDetail", {coin})
    }

    return (
        <View style={styles.container}>
            {
                favorites.length == 0 ?
                <FavoritesEmptyState /> :
                <FlatList
                    data={favorites}
                    renderItem={({item}) => <CoinsItem item={item} onPress={() => handlePress(item)} />}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1
    }
})

export default FavoritesScreen
