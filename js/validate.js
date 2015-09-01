// JavaScript Document
$('.form-holder').submit(function(e) {
 	
	var errs = $("[class*='error']");
	
	if(errs.length > 0)
	{
		return false;	
	}
		
	elem = document.getElementsByClassName('form-holder')[0];
	
	var fields = elem.getElementsByClassName('required');
	
	for(i=0;i < fields.length; i++)
	{
		if(fields[i].value == "")
		{
			$('#msg').text("Required Field");
			fields[i].className = "error";
			return false;
		}
	}
	
	var eml = $("[class*='email']");
	
	var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/; 
	
	if(!emailRegex.test(eml.val().toUpperCase()))
	{
		$('#msg').text("Invalid email");
		eml.addClass("error").removeClass("required");
		return false;
	}
	
	var postData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR) 
        {
            //data: return data from server
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            //if fails      
        }
    });
    e.preventDefault(); //STOP default action
    //e.unbind(); //unbind. to stop multiple form submit.
	
	document.getElementById('msg').textContent = "Message Sent";
	$(this).closest('form').find("input[type=text], textarea").val("");
});

$("input").focus(function(x) {
	 	errorFocus(x.target);
});

$("textarea").focus(function(x) {
	 	errorFocus(x.target);
});

function errorFocus(e)
{
	if($(e).hasClass('error'))
	{
		$(e).addClass("required").removeClass("error");	
		$('#msg').text("");
		$('#msg').css("color","red");
	}
}

$("#telephone").keypress(function () {
	
	var intRegex = /[0-9-()+]/;  	
	if ( event.which == 13 || !intRegex.test(String.fromCharCode(event.which))) {
    	 event.preventDefault();
  		}	
});
