import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import Currency from 'react-currency-formatter'

const Basket = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket,setGroupedItemsInBasket] =useState([])
  const dispatch = useDispatch()

  useEffect(()=> {
    const groupedItems = items.reduce((results,item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    },{});
    setGroupedItemsInBasket(groupedItems);
  },[items]);
  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
              <Text className="text-lg font-bold text-center">Basket</Text>
              <Text className="text-center text-gray-500">{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack} className="absolute rounded-full bg-gray-200 top-3 right-5">
            <XCircleIcon color="#00CCBB" height={40} width={40}  />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-3 py-3 my-5 bg-white">
          <Image source={{
                uri:restaurant.imgUrl
            }}
            className="h-7 w-7 bg-gray-700 rounded-full" />
            <Text className="flex-1">Deliver in 20-30 min</Text>
            <TouchableOpacity >
              <Text className="text-[#00CCBB]">Change</Text>                
            </TouchableOpacity>
        </View>
        <ScrollView className="divide-y">
          {Object.entries(groupedItemsInBasket).map(([key,items]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00CCBB]">{items.length} X</Text>
              <Image 
                source={{ uri:items[0]?.image }} 
                className="h-12 w-12 rounded-full"
              /> 
              <Text className="flex-1">{items[0]?.title}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="GBP"/>  
              </Text>
              <TouchableOpacity>
                 <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() =>dispatch(removeFromBasket({id:key}))}>
                     Remove 
                 </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-gray-400">
                <Currency quantity={basketTotal} currency="GBP"/>                
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Delivery Fee</Text>
              <Text className="text-gray-400">
                <Currency quantity={4.99} currency="GBP"/>                
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text >Order Total</Text>
              <Text className="font-extrabold">
                <Currency quantity={basketTotal + 4.99} currency="GBP"/>                
              </Text>
            </View>
            <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-2 ">
              <Text className="text-white text-center text-lg font-bold">Place Order</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Basket