// JavaScript Document
var localStorageRow = localStorage.getItem(localStorage.key(i)) ;
 
if (typeof(author_query) == "undefined" || author_query === "" )
{
}
else
{
	for ( var i = 0 ; i < localStorage.length;  i++)
	{
		var localStorageRow = localStorage.getItem(localStorage.key(i)) ;
 
		if (window.DOMParser)
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(localStorageRow,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(localStorageRow);
		} 
 
		for ( var k = 0 ; k < xmlDoc.firstChild.childNodes.length ; k++ )
		{
			/*if ( xmlDoc.firstChild.childNodes[k].nodeName === "author" )
			{ 
				var auth_row = xmlDoc.firstChild.childNodes[k].textContent;			
				var authMatch = auth_row.match(new RegExp(author_query, "i"));
				if ( authMatch )
				{ 
					for ( var p = 0 ; p < xmlDoc.firstChild.childNodes.length ; p ++ )
					{
						if ( xmlDoc.firstChild.childNodes[p].nodeName == 'title' )
						{
							document.getElementById("results_ID").innerHTML += xmlDoc.firstChild.childNodes[p].textContent+"<br />";
						}
					} 
				}
			}*/
		}
	}
}