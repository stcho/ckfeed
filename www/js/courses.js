
//Course Ref in Firebase
var coursesRef = new Firebase("https://ckfeed.firebaseio.com/courses");
// We listen for new children on the courses.
coursesRef.on("child_added", function(snap) {
  snap.fbCourseId = snap.name(); //the id given upon creation by Firebase
  snap.title = snap.val().title;
  snap.description = snap.val().description;
  //snap.courseId = snap.val().courseId;
  //snap.courseNumber = snap.val().courseNumber;

	var courseEl = $(Mustache.to_html($("#tmpl-course").html(), snap));
	$("#courses-list").prepend(courseEl);

});

function _coursePageController (courseId) {
	//get valur of this specific course object that has been clicked
	coursesRef.child(courseId).once("value", function(snap) {
		
		console.log(snap.val());

		//use mustache to get html tmpl and submit content into it while clearing our all others

		var content = Mustache.to_html($("#tmpl-course-content").html(), snap.val());
		var body = Mustache.to_html($("#tmpl-content").html(), {
      classes: "cf", content: content
    });
		$("#body").html(body);
	});	
}


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

}