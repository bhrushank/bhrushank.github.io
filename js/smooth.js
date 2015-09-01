// JavaScript Document 
$('.navUlHome a').on('click', function(e){
	if($('#ut-background-video').length > 0)
	{
		e.preventDefault();
		var target= $($(this).attr('href')); //== 'up' ? $('#down') : $('#up');
		$('html, body').stop().animate({
		   scrollTop: target.offset().top
		}, 1000);
	}
});

$('#footer .toTop').on('click', function(e){
    e.preventDefault();
    var target= $($(this).attr('href')); //== 'up' ? $('#down') : $('#up');
    $('html, body').stop().animate({
       scrollTop: target.offset().top
    }, 900);
});