const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn'); // Updated selector to match the button class
const recipeContainer = document.querySelector('.recipe-container');

const fetchRecipes = async (query) => {
    // Use template literals correctly for the URL
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    // Check if meals exist before accessing
    if (response.meals) {
        // Clear previous results
        recipeContainer.innerHTML = '';

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            // Use innerHTML correctly with backticks
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory}</p>
            `;

            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        // Handle case where no meals are found
        recipeContainer.innerHTML = '<p>No recipes found.</p>';
    }
};

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim(); // Use 'value' instead of 'Value'
    fetchRecipes(searchInput);
});
