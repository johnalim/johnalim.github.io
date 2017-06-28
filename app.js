// replace this entire code block with the config found in the firebase dashboard
// for your created database
 var config = {
    apiKey: "AIzaSyCngTaA5AMJc4XazQdWuLO9faii7hrLUaE",
    authDomain: "i-love-corgis.firebaseapp.com",
    databaseURL: "https://i-love-corgis.firebaseio.com",
    projectId: "i-love-corgis",
    storageBucket: "i-love-corgis.appspot.com",
    messagingSenderId: "153620906361"
  };
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

database.ref("/hello-world").set({ hello: "world" })

$(function(){

	$("#add-button").on("click", function(){
		//how to add data to firebase through the button/input
		var value = $("#new-item").val()
		
		//grab a ref to the "todo-items" key in firebase
		//and then create a new item that we set data on
		var item = database.ref("/todo-items").push();
		
		item.set( {value: value} )

	})

	//grab a refernce to the "todo-items" key
	database.ref("/todo-items").on("value", function(snapshot){

		//grab element out of the page. assign to list.

		var list = $("#list-items");

		//how to empty the list every time you load page
		list.empty();

		//list.append("<li> this is a test </li>");

		snapshot.forEach(function(listItem){

			


			//how to console.log the text value in firebase
			console.log(listItem.val().value)

			//assigning value to variable
			var item = listItem.val().value;


			//concatenate the text from value (inside of item variable) to html (also adding in remove link)
		    list.append('<li data-id="' + listItem.key +'">' + item + ' <a href="#" class="remove">Remove</a></li>');
		});
	});
	
	//for ul list item any click event  AND it is part of a "LI" tag with a "a" tag, perform function
	$('#list-items').on("click", "li a", function(){
		
		//retrieve the value of the "data-id" attribute on the parent <li> element
		//so we can remove it from firebase
		var itemId = $(this).parent().data('id');

		//using the id from above, we will remove it below
		database.ref("/todo-items/" + itemId).remove();


	});

});
