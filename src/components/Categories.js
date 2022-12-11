import { View, Text, ScrollView } from 'react-native'
import React,{useState,useEffect } from 'react'
import CategoryCard from './CategoryCard'
import api from '../services/api'

export default function Categories() {

  const [categories,setCategories] = useState([])

  useEffect(()=> {
    console.log("loading..");
    async function loadData(){
        const category = await api.get('categories.php')
                        .then((response) => response.data)
                        .then((json) => {
                            console.log('json', json);
                            return json;  
                        })
                        .catch((error) => {
                            console.log("error:"+error);
                        });
        setCategories(category.categories)
      }
  
    loadData()
  }, [])
  return (
    <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
            paddingHorizontal:10,
            paddingTop:5
        }}>
        {/* category card */}
        {categories.map(category => (
            <CategoryCard 
            key={category._id}
            imgUrl={category.strCategoryThumb} 
            title={category.strCategory}/>
        ))}
    </ScrollView> 
  )
}