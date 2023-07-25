const URL_ENDPOINT = "http://localhost:3000/musicLovers"; 


function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("age").value; 
  var song = document.getElementById("song").value;
  var artist = document.getElementById("artist").value;

  if(name == ""){
     alert("Name is Required"); 
     return false;
      }

  if(age == ""){
     alert("Age is Required");
     return false; 
      }
  else if (age <1){
          alert("Age must not be zero or less than zero");
       } 

  if(email == ""){
          alert("Email is Required"); 
          return false;
       } 

  else if (!email.includes("@")){
          alert("Invalid email address");
       }     

   if(song == ""){
          alert("Your Favorite Song is Required"); 
          return false;
       } 

       if(artist == ""){
          alert("Your Favorite Artist is Required"); 
          return false;
       } 
   return true; 
}
function showData(){
     var peopleList; 
     if(localStorage.getItem("peopleList") == null){
          peopleList= []; 
     }
     else{
          peopleList = JSON.parse(localStorage.getItem("peopleList"))
          
     }
     var html = "";
     
     peopleList.forEach(function (element, index) {
          html += "<tr>"; 
          html += "<td>" + element.name + "</td>"; 
          html += "<td>" + element.email + "</td>"; 
          html += "<td>" + element.age + "</td>"; 
          html += "<td>" + element.song + "</td>"; 
          html += "<td>" + element.artist + "</td>"; 
          html += 
          <button onclick="deleteData('+ index +')" class= "btn btn-danger">Delete</button>; 
          <button onclick="updateData('+ index +')" class= "btn btn-warning m-2">Edit</button>; 
          html += "</tr>", 

     document.querySelector("crudTable tbody").innerHTML = html; 

// Loads All data when document or page loads
     document.onload = showData(); 

//fucntion to add data 

     function AddData(){

          if(validateForm() == true){
                    var name = document.getElementById("name").value; 
                    var email = document.getElementById("email").value; 
                    var age = document.getElementById("age").value; 
                    var song = document.getElementById("song").value; 
                    var artist = document.getElementById("artist").value; 
          }
}

          var peopleList; 
          if(localStorage.getItem("peopleList") == null){
               peopleList= []; 
          }
          else{
               peopleList = JSON.parse(localStorage.getItem("peopleList"))
          }
          peopleList.push({
                    name: name, 
                    email: email, 
                    age: age, 
                    song: song, 
                    artist: artist,
          }),

          localStorage.setItem("peopleList", JSON.stringify(peopleList)); 
          showData();
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("age").value = "";
          document.getElementById("song").value = "";
          document.getElementById("artist").value = ""; 
     }, 
}

//Function to delete Data from local storage
     function deleteData(index){
          var peopleList; 
          if(localStorage.getItem("peopleList") == null){
               peopleList= []; 
          }
          else{
               peopleList = JSON.parse(localStorage.getItem("peopleList"));
          }
               peopleList.splice(index, 1);
               localStorage.setItem("peopleList", JSON.stringify(peopleList)); 
               showData();
     }

// function to update data from local storage, and the submit will show, update will hide
     function updateData(index){
          document.getElementById("Submit").style.display = "none"; 
          document.getElementById("Update").style.display = "block"; 
          
          var peopleList; 
          if(localStorage.getItem("peopleList") == null){
               peopleList= []; 
          }
          else{
               peopleList = JSON.parse(localStorage.getItem("peopleList"));
          }
          document.getElementById("name").value = peopleList[index].name; 
          document.getElementById("email").value = peopleList[index].email; 
          document.getElementById("age").value = peopleList[index].age; 
          document.getElementById("song").value = peopleList[index].song; 
          document.getElementById("artist").value = peopleList[index].artist; 

     document.querySelector("#Update").onclick = function(){
        if(validateForm() ==true){
          peopleList[index].name = document.getElementById("name").value; 
          peopleList[index].email = document.getElementById("email").value; 
          peopleList[index].age = document.getElementById("age").value; 
          peopleList[index].song = document.getElementById("song").value; 
          peopleList[index].artist = document.getElementById("artist").value; 

          localStorage.setItem("peopleList", JSON.stringify(peopleList)); 
          showData();

          document.getElementById("name").value = ""; 
          document.getElementById("email").value = ""; 
          document.getElementById("age").value = ""; 
          document.getElementById("song").value = ""; 
          document.getElementById("artist").value = ""; 
// the update button will now hide, and submit will show
          document.getElementById("Submit").style.display = "block"; 
          document.getElementById("Update").style.display = "none"; 
        }
     }
}
