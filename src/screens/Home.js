import { View, Text,TextInput,Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AdjustmentsHorizontalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from "react-native-heroicons/solid";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import api from '../services/api';

const Home = () => {
  const navigation = useNavigation();
  const [features,setFeatures] = useState([]);

  /* for change layout properties */
  useLayoutEffect(() =>{
        navigation.setOptions({
            // headerTitle: "Home",
            headerShown: false, /* hide title */
        })
  }, []);

  useEffect(()=> {
    console.log("loading..");
    async function loadData(){
        const category = await api.get('filter.php?a=Canadian')
                        .then((response) => response.data)
                        .then((json) => {
                            console.log('json', json);
                            return json;  
                        })
                        .catch((error) => {
                            console.log("error:"+error);
                        });
              setFeatures(category.categories)
      }
  
    loadData()
  }, [])
 
  return (
    <SafeAreaView className="bg-white pt-10"> 
            {/* need for exact size in screen , hide danger dzone*/}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                {/* header */}  
                <Image
                    source={{
                      uri:"../src/assets/icon.png"
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">Current Location
                      <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <UserIcon size={35} color="#00CCBB"/>
            </View>
            {/* search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-1 px-2">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2">
                  <MagnifyingGlassIcon size={20} color="gray" opacity={0.6}/>
                  <TextInput 
                   placeholder="Search"
                   keyboardType="default" 
                   />
                </View>
                <AdjustmentsHorizontalIcon color="#00CCBB"/>
            </View>

            {/* body */}
            <ScrollView className="bg-gray-200"
                contentContainerStyle={{
                  paddingBottom:100
                }}>
                   
              {/* category */}
               <Categories/>       
              {/* features rows */}
              <FeaturedRow
                  title="Breakfast"
                  description="Breakfast Food Menu Details"
                  id="Breakfast"
                />
              
              {/* discounts */}
                <FeaturedRow
                  title="Starter"
                  description="Starter Food Receipe Description2"
                  id="Starter"
                />
              {/* offers  */}
                <FeaturedRow
                  title="Miscellaneous"
                  description="FMiscellaneous ood Receipe Description4"
                  id="Miscellaneous"
                />
            </ScrollView>
    </SafeAreaView>
  )
}

export default Home