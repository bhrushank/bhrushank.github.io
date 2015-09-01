// JavaScript Document
var cookie_name = "xml" ;
var cookie_duration = 30 ;

// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
function setXml ( xmlString )
{
	var domain = window.location.host;
	
	if(domain.indexOf("file") > -1)
		domain = "";
    
	set_cookie( cookie_name, xmlString,
      cookie_duration,domain);
}

function set_xmlCookie(xmlString)
{
  var xml_title = get_cookie( cookie_name );
  
  if (xml_title != "null")
  {
    setXml( xmlString );
  }
}
function set_cookie ( cookie_name, cookie_value,
    lifespan_in_days, valid_domain )
{
    /*var domain_string = valid_domain ?
                       ("; domain=" + valid_domain) : '' ;
    if(domain_string.length > 0)
	{
		document.cookie = cookie_name +
                       "=" + encodeURIComponent( cookie_value ) +
                       "; max-age=" + 60 * 60 *
                       24 * lifespan_in_days +
                       "; path=/" + domain_string ;
	}
	else
	{*/
		localStorage.setItem(cookie_name, cookie_value);
	//}
}

function get_cookie ( cookie_name )
{
    /*var cookie_string = document.cookie ;
    if (typeof cookie_string.Name != 'undefined') {
        var cookie_value = cookie_string.match (
                        '([^;]*)[\s]*' +
                        cookie_name +
                        '=([^;]*)' );
        return decodeURIComponent ( cookie_value[2] ) ;
    }
	else
	{*/	
		return decodeURIComponent(localStorage.getItem(cookie_name));
	//}
	
    return '' ;
}

window.onunload  = function() {
	if(closingWindow)
	{
	  localStorage.removeItem(cookie_name);
	  return '';
	}
};