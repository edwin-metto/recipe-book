document.getElementById("button").addEventListener('click', () => {
    let inputvalue = document.getElementById('inputName').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.meals);
            const items = document.getElementById("items");
            items.innerHTML = "";
            if (!data.meals) {
                document.getElementById("msg").style.display = "block";
            } else {
                document.getElementById("msg").style.display = "none";
                data.meals.forEach(meal => {
                    const itemDiv = document.createElement("div");
                    itemDiv.className = "m-2 singleItem";
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`);
                    const iteminfo = `
                    <div class="card" style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body text-center">
                            <h5 class="card-text">${meal.strMeal}</h5>
                        </div>
                    </div>
                    `;
                    itemDiv.innerHTML = iteminfo;
                    items.appendChild(itemDiv);
                });
            }
        });
});

function details(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            const meal = detail.meals[0];
            const details = document.getElementById("details");
            details.innerHTML = "";
            const detailsDiv = document.createElement("div");
            const detailsinfo = `
            <div class="card" style="width: 19rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body text-center">
                    <h3 class="card-text">${meal.strMeal}</h3>
                    <h6>Ingredients</h6>
                    <ul>
                        <li>${meal.strArea}</li> 
                        <li>${meal.strCategory}</li>
                        <li>${meal.strIngredient1}</li>
                        <li>${meal.strIngredient2}</li>
                        <li>${meal.strIngredient3}</li>
                        <li>${meal.strIngredient4}</li>
                        <li>${meal.strIngredient5}</li> 
                    </ul>                                                                  
                </div>
            </div>
            `;
            detailsDiv.innerHTML = detailsinfo;
            details.appendChild(detailsDiv);
        });
}
