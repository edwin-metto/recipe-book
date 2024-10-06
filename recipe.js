document.getElementById("button").addEventListener('click', () => {
    let inputvalue = document.getElementById('inputName').value
    fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.meals)
            const items = document.getElementById("items")
            items.innerHTML = ""
            if (data.meals == null) {
                document.getElementById("msg").style.display = "block"
                console.log("no meals")
            } else {
                document.getElementById("msg").style.display = "none"
                data.meals.forEach(meal => {
                    console.log(meal)
                    itemDiv=document.createElement("div")
                    itemDiv.className="m-2 singleItem"
                    itemDiv.setAttribute('onclick',`details('${meal.idMeal})`)
                     const iteminfo = `
                    <div class="card" style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <h5 class="card-text">${meal.strMeal}</h5>
                        </div>
                    </div>
                    `
            itemDiv.innerHTML= iteminfo;
            items.appendChild(itemDiv);
                 })
            }
         })

})
function details(id){
    console.log(id)
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
.then(res=>res.json())
.then(detail=>{
    let meal=detail.meals[0]
    console.log(meal)
    let details=document.getElementById("details")
    details.innerHTML=""
    let detailsDiv=document.createElement("div")
    let detailsinfo=`
    <div class="card" style="width: 19rem;">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body text-center">
            <h3 class="card-text">${meal.strMeal}</h3>
            <h6>ingridients</h6>
            <ul>
                <li>${meal.strArea}</li> 
                <li>${meal.strCategory}</li>
                <li>${meal.strIngridient1}</li>
                <li>${meal.strIngridient2}</li>
                <li>${meal.strIngridient3}</li>
                <li>${meal.strIngridient4}</li>
                <li>${meal.strIngridient5}</li> 
            </ul>                                                                  
        </div>
    </div>
    `
    detailsDiv.innerHTML=detailsinfo
    details.appendChild(detailsDiv)
                 
})
}