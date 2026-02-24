import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,ScrollView,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";
import ReactTestUtils from 'react-dom/test-utils';
import FoodItems from "../components/recipes";
 var recipe =  [];
 var counter = 0;

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [recipeName, setTitle] = useState(recipeToEdit ? recipeToEdit.recipeName : "");
  const [recipeImage, setImage] = useState(recipeToEdit ? recipeToEdit.recipeImage : "");
  const [ingredients, setIngredients] = useState({ingredientName: null, measure: null});
  const [counter, setCounter] = useState(0);
  const [recipe, setRecipe] = useState(recipeToEdit ? recipeToEdit.recipe : []);

  const handleIncrease = () => {
        setCounter((prev) => prev + 1);
    };
  const handleDecrease = () => {
        setCounter((prev) => prev - 1);
    };

  const handleChange = e => {
  const { name, value } = e.target;
    setIngredients(ingredients => ({
        ...ingredients,
        [name]: value       
    }));
};
  
  const [recipeInstructions, setInstructions] = useState(
    recipeToEdit ? recipeToEdit.recipeInstructions : ""
  );
 
  const addIngredient = ( ) => {  
   const handleIncrease = () => {
        setCounter((prev) => prev + 1);
    };

    if (ingredients.ingredientName != null && ingredients.measure != null) {
      recipe.push(ingredients); 
      viewName = document.getElementsByName("ingredientName")[0];     
      viewMeasure = document.getElementsByName("measure")[0]; 
      viewName.value = null;
      viewMeasure.value = null;
      handleIncrease();        
    } else console.log('it is null......')
   
  };

   const deleteIngredient = (index ) => {  
   const handleDecrease = () => {
        setCounter((prev) => prev - 1);
    };
     recipe.splice(index,1);   
     handleDecrease(); 
  };

  const saverecipe = async () => {
    const newrecipe = { recipeName, recipeImage, recipeInstructions, recipe };
    try {
      const existingRecipes = await AsyncStorage.getItem("customrecipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

      // If editing an recipe, update it; otherwise, add a new one
      if (recipeToEdit !== undefined) {
        recipes[recipeIndex] = newrecipe;
        await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
        if (onrecipeEdited) onrecipeEdited(); // Notify the edit
      } else {
        recipes.push(newrecipe); // Add new recipe
        await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));   
      }

      navigation.goBack(); // Return to the previous screen
      
    } catch (error) {
      console.error("Error saving the article:", error);
    }
  };

  return (
     <ScrollView>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      </link>

    <View style={styles.container}>     
      <TextInput
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image upload"
        value={recipeImage}
        onChangeText={setImage}
        style={styles.input}
      />
      {recipeImage ? (
        <Image source={{ uri: recipeImage }} style={styles.image} />        
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
           
    <div style={styles.row}>  
      <Text>Ingredients List  <Text style={styles.dontshow}>{counter}</Text></Text>    
        <input    
          type="text"    
          placeholder="  Ingredient Name"
          onChange={handleChange}
          name="ingredientName"                
          style={styles.input}       
        />
         <Text> </Text>
        <input      
          type="text" 
          placeholder="  Measure"
          onChange={handleChange}
          name="measure"       
          style={styles.input}
        />
       
        <button name="mybutton" style = {styles.addIngredientButton} onClick={() => addIngredient()}>Add Ingredient</button>
      
       </div> 
      
       <div style={styles.row}>        
          <View style={styles.the_Ingredients} testID="ingredientsList" name="mylist">
              {recipe.map((i) => (                          
              <View key={i} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {i.ingredientName} {i.measure}  <i style={styles.red} class="fas fa-trash" onClick={() => deleteIngredient(i)}></i>                
                </Text>
              </View>
            ))}
          </View>
       
        </div>
      
      <TextInput
        placeholder="Step-by-Step Instructions"
        value={recipeInstructions}
        onChangeText={setInstructions}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(1),
    overflow: 'scroll'
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
   topButtonsContainer: {
    width: "25%",
backgroundColor: "#52525B",
    flexDirection: "row",
   borderRadius: 5,
    paddingTop: hp(4),
  },
  addIngredientButton: {
   backgroundColor: "#4F75FF",
    border: "1px solid lightgrey",
    color: "white",
    fontsize: "18px",
    cursor: "pointer",
    padding: wp(.5),
    margin: hp(2),
    borderRadius: 5,
  },
   sectionContainer: {
    marginHorizontal: wp(25),
    marginBottom: 2,
    maxHeight: "75px",
   overflowx: scroll,

  },
   ingredientsList: {
    marginLeft: wp(25),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 5,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 1,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(1),
  },
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
    fontsize: "20px",
    fontFamily: "Lato",
  },
the_Ingredients: {
    flexDirection: 'row',    
    flexWrap: 'wrap',    
},
red: {
  color: 'red',
  cursor: 'pointer',
},
 row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dontshow:{
    display: 'none',
  },
});
