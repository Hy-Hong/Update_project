function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

var member;

$(document).ready(function(){
getApi();
$('#selection').on('change', function(){
    var recipeId = $('#selection').val();
    eachRecipe(recipeId);
})
});

// Function to getApi
function getApi(){
$.ajax({
    dataType: 'json',
    url: getUrl(),
    success: (data) => chooseRecipe(data.recipes),
    error: () => console.log("Cannot get data"),
});
}

var allData = [];
function chooseRecipe(recipe){
allData = recipe;
var option = "";
recipe.forEach(item => {
    option += `
    <option value="${item.id}">${item.name}</option>
    `;
});
$('#selection').append(option);
}

// function eachRecipe
$('#appear').hide();
function eachRecipe(id){
allData.forEach(item => {
    if(item.id == id){
        //showRecipe()
        showRecipe(item.name, item.iconUrl, item.nbGuests, item.instructions);
        //shhowIngredient()
        showIngredient(item.ingredients);
        //showStep()
        showStep(item.instructions);
        $('#appear').show();
        // show numbers to input
        $('#member').val(item.nbGuests);
        //updateIngredient
        updateIngredient(item.ingredients);
    }
});
}


//function showRecipe
function showRecipe(name,img,nbGuests){
var result = "";
result += `
<div class="container mt-5">
    <div class="row">
        <div class="col-6 text-center">
            <h3>${name}</h3>   
        </div>
        <div class="col-6">
           <img src="${img}" width="150">   
        </div>
        <div class="col-6">
        ${nbGuests * addMember(member)}   
        </div>
    </div>
</div>
`;
$('#member').html(result);
}

//function showIngredient
function showIngredient(ing){
var resultIngredient = "";
ing.forEach(item => {
    resultIngredient += `
    <div class="container mt-5">
        <div class="row">
            <div class="col-3">
                <img src="${item.iconUrl}" width="100">
            </div>
            <div class="col-3">
                ${item.name}
            </div>
            <div class="col-3">
                ${item.quantity}
            </div>
            <div class="col-3">
                ${item.unit[0]}
            </div>
        </div>
    </div>
    `;
    $('#ingredientId').html(resultIngredient);
});
}

//function updateIngredient
function updateIngredient(ing){
var resultIngredient = "";
ing.forEach(item => {
    resultIngredient += `
    <div class="container mt-5">
        <div class="row">
            <div class="col-3">
                <img src="${item.iconUrl}" width="100">
            </div>
            <div class="col-3">
                ${item.name}
            </div>
            <div class="col-3">
                ${item.quantity * addMember(member)}
            </div>
            <div class="col-3">
                ${item.unit[0]}
            </div>
        </div>
    </div>
    `;
    $('#member').html(resultIngredient);
});
}

//function showStep
function showStep(){
    var defaultStep = "<step>Add the avocado, sugar and concentrated milk into the blender<step>Add the ice<step>Mix for 10 mins";
    var cutStep = defaultStep.split("<step>");
    resultStep = ""; 
    for(let i = 1; i < cutStep.length; i++){
        resultStep += `
        <div class="container mt-4">
        <div class="row">
            <div class="col-6">
                <p class="text-primary">Step ${i}</p>
                <p>${cutStep[i]}</p>
            </div>
            </div>
        </div>
    `;
        $('#step').html(resultStep);
    }
}
// function addMembers
function addMember(member) {
    return  parseInt(member);
}