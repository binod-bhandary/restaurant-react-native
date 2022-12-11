import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useEffect } from 'react';
import { setRestaurant } from '../features/restaurantSlice';
import { useDispatch } from 'react-redux';

const Restaurant = () => {
  const navigation = useNavigation();
  const { params: {
    id, imgUrl, title
  } } = useRoute();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(
      setRestaurant({ id, imgUrl, title})
    )
  },[dispatch])
  return (
    <>
      <BasketIcon />
      <ScrollView className="bg-gray pt-0">
        <View className="relative">
          <Image source={{
            uri: imgUrl
          }}
            className="h-56 w-full bg-gray-300 p-4" />
          <TouchableOpacity className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full" onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pb-2">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="gray" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-400">{4.3}</Text> . genre</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon size={22} color="gray" opacity={0.4} />
                <Text className="text-xs text-gray-500">NearBy . address</Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">
              The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon size={22} color="gray" opacity={0.6} />
            <Text className="pl-2 flex-1 text-md font-bold">Have a Food allergy?</Text>
            <ChevronRightIcon size={22} color="green" />
          </TouchableOpacity>
        </View>
        <View className="pb-24">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          <DishRow
            id="1"
            title="Chicken"
            description="Dish Folklore has it that the fish return to the exact spot where they hatched to spawn"
            price={25}
            image="https://www.themealdb.com/images/ingredients/Chicken.png" />
          <DishRow
            id="2"
            title="Lime"
            description="Dish Folklore has it that the fish return to the exact spot where they hatched to spawn"
            price={30}
            image="https://www.themealdb.com/images/ingredients/Lime.png" />
          <DishRow
            id="3"
            title="Mushrooms"
            description="Auricularia auricula-judae, known as the Jew's ear, wood ear, jelly ear or by a number of other common names"
            price={50}
            image="https://www.themealdb.com/images/ingredients/Mushrooms.png" />
        </View>
      </ScrollView>
    </>
  )
}

export default Restaurant