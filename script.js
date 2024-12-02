let btn = document.querySelector('.search-btn');
var showbtn = "";
var ingredientList = document.querySelector('.Ingredient-list');
var video_container = document.querySelector('.video-container');
var tutorial = document.querySelector('.tutorial');
var field = document.getElementById('input-field');


async function getData(input_value) {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + input_value;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        var mealContainer = document.querySelector('.mealContainer');
        mealContainer.innerHTML = '';
        json.meals.forEach((meal, index) => {
            var mealHTML = `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info">
                    <h3>${meal.strMeal}</h3>
                    <button data-index=${index} class="show-more-btn">Show more info</button>
                </div>
            </div>`;
            mealContainer.innerHTML += mealHTML;
        });

        showbtn = document.querySelectorAll('.show-more-btn');

        if (showbtn) {
            showbtn.forEach(span => {
                span.addEventListener('click', function (e) {
                    e.preventDefault();
                    const meal = json.meals[this.dataset.index];
                    console.log(meal);
                    showIngredient(meal);
                    displayVideo(meal);
                });
            });
        }

        function showIngredient(meal) {
            ingredientList.innerHTML = '';
            for (let i = 1; i <= 20; i++) {
                var ingredient = meal['strIngredient' + i];
                var measure = meal['strMeasure' + i];
                var ing_with_qty = ingredient + " " + measure;

                if (ingredient && measure) {
                    var listItem = document.createElement('li');
                    listItem.textContent = ing_with_qty;
                    ingredientList.appendChild(listItem);
                }
            }

            if (ingredientList.childNodes.length > 0) {
              ingredientList.style.display = 'block';
          } else {
              ingredientList.style.display = 'none';  
          }
          
        }
        // https://www.youtube.com/watch?v=9XpzHm9QpZg
        function displayVideo(meal){
          video_container.innerHTML ='';
          var youtube_url = meal['strYoutube'];
          youtube_url = youtube_url.replace( 'watch?v=', 'embed/' )
          var tutorial = meal['strInstructions'];
          if(tutorial && youtube_url ){
            var frame = document.createElement('iframe');
            var para = document.createElement('p');
            para.textContent = tutorial;
            frame.src = youtube_url;
            frame.frameborder = 0;
            frame.allowfullscreen = true;
            video_container.appendChild(frame);
            video_container.appendChild(para);
          }
        }

        
    } catch (error) {
        console.error(error.message);
    }
}


field.addEventListener('keyup', function (e) {
    e.preventDefault();
    let input = document.querySelector('#input-field').value;
    if (input) {
        getData(input);
    }
});

btn.addEventListener('click', function (e) {
    e.preventDefault();
    let input = document.querySelector('#input-field').value;
    if (input) {
        getData(input);
    }
});