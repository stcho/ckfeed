$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

function createNewCourse() {
	
	var courseRef = new Firebase('https://ckfeed.firebaseio.com/courses/');

// ERROR HANDLING
	// if(document.course.title.value === "") {
	// 	alert("title?" + document.course.description.value + "Woop");
	//
	// if(document.course.description.value === "") {
	// 	alert("description?" + document.course.description.value + "Woop");
	// }
	// if(document.course.university.value === null) {
	// 	document.getElementById().innerHtml()
	// }
	// if(document.course.professors.value === "") {
	// 	alert("professors?" + document.course.description.value + "Woop");
	// }
	// if(document.course.courseId.value === "") {
	// 	alert("courseId?" + document.course.description.value + "Woop");
	// }
	// if(document.course.courseNumber.value === "") {
	// 	alert("numver?" + document.course.description.value + "Woop");
	// }


	//form_name.element.its_value
	courseRef.push({
		'title': document.course.title.value,
		'description': document.course.description.value,
		'university': "ASU",
		'professors': document.course.professors.value,
		'courseId': document.course.courseId.value,
		'courseNumber': document.course.courseNumber.value
	}, function(error) {
	  if (error) {
	    alert("Data could not be saved." + error);
	  } else {
	    alert("Data saved successfully.");
	  }
	});

	// var person = {
 //    firstName: "Christophe",
 //    lastName: "Coenraets",
 //    blogURL: "http://coenraets.org"
	// };
	// var template = "<h1>{{firstName}} {{lastName}}</h1>Blog: {{blogURL}}";
	// var html = Mustache.to_html(template, person);
	// $('#sampleArea').html(html);
}


//Generate courses list on courses.html
var coursesRef = new Firebase("https://ckfeed.firebaseio.com/courses");
// We listen for new children on the courses.
var handler = coursesRef.on("child_added", function(snap) {
  snap.name = snap.name(); 
  snap.title = snap.val().title;
  snap.description = snap.val().description;
  //snap.courseId = snap.val().courseId;
  //snap.courseNumber = snap.val().courseNumber;

	var courseEl = $(Mustache.to_html($("#tmpl-course").html(), snap));
	$("#courses-list").prepend(courseEl);

});

