$(document).ready(function(){
	$("#java").mouseenter(function(){
		$("#jQuery").animate({height: '-=109px'}, 1500)
			.animate({height: '+=109px'},1500)
			.animate({width: '-=80%'}, 2500)
			.animate({width: '+=80%'}, 2400)
			.animate({width: '-=80%'}, 2300)
			.animate({width: '+=80%'}, 2000);
	});
	// $('#java').mousreleave(function(){
	// 	$('#css').stop();
	// });
});