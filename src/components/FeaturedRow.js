import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import api from '../services/api';

const FeaturedRow = ({title,description,id}) => {

  const [features,setFeatures] = useState([]);

  useEffect(()=> {
    async function loadData(id){
        const menu = await api.get('filter.php?c='+id)
                        .then((response) => response.data)
                        .then((json) => {
                            console.log(id,json);
                            return json;  
                        })
                        .catch((error) => {
                            console.log("error:"+error);
                        });
          setFeatures(menu.meals)
      }
  
    loadData(id)
  }, [])
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg ">{title}</Text>
        <ArrowRightIcon color="#00CCBB"  />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView 
        horizontal
        contentContainerStyle={{
            paddingHorizontal:15
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4">
            {/* RestuarantCards..   */}
            { features.map(meal => (
                <RestaurantCard 
                  key={meal._id}
                  id={meal.idMeal}
                  imgUrl={meal.strMealThumb}
                  title={meal.strMeal}
                  rating={4.5}
                  genre={title}
                  address="12 st tokyo"
                  short_description={description}
                  dishes="dishes"
                  long={45}
                  lat={23}
              />
            ))}
            
      </ScrollView>
    </View>
  )
}

export default FeaturedRow