import { View,Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MapPinIcon, StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={()=>{
        navigation.navigate('Restaurant',{
          id,
          imgUrl,
          title
        })
      }} 
      className="bg-white mr-3 shadow">
      <Image 
        source={{
            uri:imgUrl
        }}
        className="h-36 w-64 rounded-sm"
       />
       <View className="px-3 pb-4">
            <Text className="font-bold pt-2 text-lg">{title}</Text>
            <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-400">{rating}</Text> . {genre}
                </Text>
            </View>

            <View className="flex-row items-center space-x-1">
                <MapPinIcon size={22} color="gray" opacity={0.4}/>
                <Text className="text-xs text-gray-500">NearBy . {address}</Text>
            </View>
       </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard