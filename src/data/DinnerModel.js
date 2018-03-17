const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = 4;
  let selected_dishes = [];

  let observers = [];

  const dish_types = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers("change_guests");
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.getFullMenu = function() {
    return selected_dishes;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    let total_menu_price = 0;
    for(let i = 0; i < selected_dishes.length; i++){
      let dish = selected_dishes[i];
      total_menu_price += dish.pricePerServing * numberOfGuests;
    }
    return total_menu_price;

  }

  this.getDishTypeList = function(){
    return dish_types;
  }

  this.addDishToMenu = function(selectedDish) {
    for(let i = 0; i < selected_dishes.length; i++){
        if (selected_dishes[i].id === selectedDish.id) {
          return;
        }
      }
    selected_dishes.push(selectedDish);
    notifyObservers("add_dish");
  }

  // API Calls

  this.getAllDishes = function (query, type) {
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search'
    if(type && type.indexOf("All") === -1){
      type = type.replace(/ /g,"+");
      url += "?type="+ type;
      if(query){
        query = query.replace(/ /g,"+");
        url += "&query=" + query;
      }
    }
    else if(query){
      query = query.replace(/ /g,"+");
      url += "?query=" + query;
    }
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function(id) {
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+ id +"/information";
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function (message) {
    observers.forEach(o => o.update(message));
  };
};

export const modelInstance = new DinnerModel();
