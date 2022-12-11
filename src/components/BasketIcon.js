import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import Currency from 'react-currency-formatter'

const BasketIcon = () => {
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const navigation = useNavigation()
  if(items.length === 0) return null;
  return (
    <View className="absolute w-full z-50 bottom-10">
        <TouchableOpacity className="flex-row bg-green-400 p-4 mx-4 border-gray-200 rounded-lg items-center space-x-2"
             onPress={()=> navigation.navigate('Basket',{items})}>
            <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-sm">{items.length}</Text>
            <Text className="flex-1 text-white font-extrabold text-lg text-center" >View Basket</Text>
            <Text className="text-lg text-white font-extralight">
              <Currency quantity={basketTotal} currency="GBP"/>  
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default BasketIcon