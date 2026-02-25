import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function CustomRecipesScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const route = useRoute();
    const { recipe } = route.params || {}; // Pass the  object as a parameter
    //console.log('recipe',recipe);
    
    const favoriteRecipe = useSelector(
      (state) => state.favorites.favoriterecipes
    );
   // console.log('favoriteRecipe from custom',favoriteRecipe);
    
    const isFavourite = favoriteRecipe.includes(recipe.idCategory); // Adjust this according to your recipe structure
  
    if (!recipe) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No Recipe Details Available</Text>
        </View>
      );
    }
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(recipe)); // Adjust the action to handle recipe
    };

   
    return (
      <ScrollView
           style={styles.container}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.scrollContent}
         >
           {/* recipe Image */}           
     
           <View style={styles.imageContainer} testID="imageContainer">
            <Image
                           source={{ uri: recipe.recipeImage }}
                           style={styles.recipeImage}
                         />
           </View>
     
           {/* Back Button and Favorite Button */}
           <View style={styles.topButtonsContainer}>
             <TouchableOpacity
               onPress={() => navigation.goBack()}
               style={styles.backButton}
             >
               <Text>Back</Text>
             </TouchableOpacity>             
           </View>
     
           {/* recipe Description */}
       
             <View style={styles.contentContainer}>
               {/* Title and Category */}
               <View
                 style={styles.recipeDetailsContainer}
                 testID="recipeDetailsContainer"
               >
                 <Text style={styles.recipeTitle} testID="recipeTitle">
                   {recipe.recipeName}              
                 </Text>
                 <Text style={styles.recipeCategory} testID="recipeCategory">
                   {recipe.category}
                 </Text>
               </View>
               <View style={styles.miscContainer} testID="miscContainer">
                     <View style={styles.miscItem}>
                     <Text style={styles.miscIcon}>🕒</Text>
                     <Text style={styles.miscText}>35 Mins</Text>
                   </View>
                   <View style={styles.miscItem}>
                     <Text style={styles.miscIcon}>👥</Text>
                     <Text style={styles.miscText}>03 Servings</Text>
                   </View>
                   <View style={styles.miscItem}>
                     <Text style={styles.miscIcon}>🔥</Text>
                     <Text style={styles.miscText}>103 Cal</Text>
                   </View>
                   <View style={styles.miscItem}>
                     <Text style={styles.miscIcon}>🎚️</Text>
                     <Text style={styles.miscText}>Medium</Text>
                   </View>
           </View>
     
           {/* Ingredients */}
           <View style={styles.sectionContainer}>
          
           </View>
     
           {/* Instructions */}
           <View style={styles.sectionContainer} testID="sectionContainer">
             <Text style={styles.sectionTitle}>Ingredients</Text>
               <View style={styles.ingredientsList} testID="ingredientsList">
                 {(recipe.recipe).map((i) => (
                   <View key={i} style={styles.ingredientItem}>
                     <View style={styles.ingredientBullet} />
                     <Text style={styles.ingredientText}>
                       {/* {meal["strMeasure" + i]} {meal["strIngredient" + i]} */}
                       {i.ingredientName} {i.measure}
                     </Text>
                   </View>
                 ))}
               </View>
     
               <Text style={styles.sectionTitle}>Instructions</Text>
               <Text style={styles.instructionsText}>{recipe.recipeInstructions}</Text>
     
             </View>
               {/* Description */}
               
             </View>
         </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    recipeImage: {
      width: wp(98),
      height: hp(50),
      borderRadius: 35,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      marginTop: 4,
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(2),
    },
    sectionContainer: {
      marginBottom: hp(2),
    },
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(1),
    },
    topButtonsContainer: {
      width: "100%",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: hp(4),
    },
    backButton: {
      padding: 8,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "white",
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 50,
      marginRight: wp(5),
      backgroundColor: "white",
    },
    contentText: {
      fontSize: hp(1.6),
      color: "#4B5563",
    },
      miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: wp(4),
  },
    miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  ingredientsList: {
    marginLeft: wp(4),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
    fontFamily: "Lato",
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#444",
    lineHeight: hp(3),
    textAlign: "justify",
    fontFamily: "Lato",
  },
  });
  