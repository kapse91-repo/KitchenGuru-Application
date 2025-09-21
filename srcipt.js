const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
recipeDetails=document.querySelector('.recipe-details');
recipeCloseBtn=document.querySelector('.recipe-close-btn');recipeDetailsContent=document.querySelector('.recipe-details-content');


//function to get recipes
const fetchRecipes = async (query)=>{
    recipeContainer.innerHTML="<h2>fetching Recipes...</h2>";
    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response= await data.json();
        console.log(response);
        recipeContainer.innerHTML="";
        response.meals.forEach(meal =>{
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML=`<img src="${meal.
                strMealThumb}"> 
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>`
                const button =document.createElement('button');
                button.textContent = "View Recipe";
                recipeDiv.appendChild(button);
                // Adding addEventListener to recipe button
                button.addEventListener('click',(e)=>{
                    e.preventDefault();
                    openRecipePopup(meal);
    
    
                })
                recipeContainer.appendChild(recipeDiv);
                
        })
    }catch(error){
        recipeContainer.innerHTML=`<h2>Error in Fetching Recipes...</h2>`
    }
}
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for (let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure= meal[`strMeasure${i}`];
            ingredientsList +=`<li>${measure} ${ingredient}</li>`
        }else{
            break;
        }    
    }
    console.log(ingredientsList);
    return ingredientsList;
}

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML=`<h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul> 
    <div class= "recipeInstructions">
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
    </div>
    `
    

    recipeDetailsContent.parentElement.style.display = "block";


}
recipeCloseBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    recipeDetailsContent.parentElement.style.display="none";
})
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>type the recipe in search box</h2>`
        return;
    }
    fetchRecipes(searchInput);
    searchBox.value="";
    
})


