var dog,sadDog,happyDog;
var database
var AddFood , deductFood
var deductFood
var foodObj
var foodS
var foodImg , food2
var lastFed
var fedTime
var nameDog




function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  foodImg = loadImage("Images/Milk.png")
 
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  console.log(database);

  var read = database.ref('Food')
  read.on("value",readFoodStock,showError)

  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
 

  food2 = createSprite(725,225,20,20)
  food2.addImage(foodImg)
  food2.scale = 0.07
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  AddFood = createButton('AddFood')
  AddFood.position(900,100)
  AddFood.mousePressed(addFood);

  

  nameDog = createInput("Name of Dog")
  nameDog.position(875,350)

  deductFood = createButton('Feed')
  deductFood.position(980,100)
  deductFood.mousePressed(feedDog)
  
 foodObj = new Food()

 



 
}

function draw() {
  background(46,139,87);

foodObj.display();

fill("yellow");
 textSize(15);
 if(lastFed>=12){
   text("Last Feed :- "+ lastFed%12 +"PM",350,30);
  
 } else if(lastFed==0){
     text("Last Feed :- 12 AM",350,30)

}else{
  text("Last Feed :- "+ lastFed +"AM",350,30)
}
  
  drawSprites();
}

//function to read food Stock

function readFoodStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}



//function to update food stock and last fed time

//function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime : hour()
 })
}



function showError(){
  console.log("Error is writing to the database");
}
