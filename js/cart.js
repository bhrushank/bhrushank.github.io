// JavaScript Document

var XML = new XMLWriter('UTF-8');
var prodList = [];
var closingWindow = true;

window.onload = function(){
	readXml();
	updCart();
	if($('.items-holder').length > 0)
	{
		var total = 0;
		prodList.map(function(x){
			total += (parseFloat(x.Price) * parseInt(x.Quantity));
			addToChkOut(x);
		});
		
		var totalA = "<a>"+toUSD(total)+"</a>";
		if(total > 0)
			$(".finalize-total").append(totalA);
	}
		
};

$("#finish").click(function(e){
   /* var postData = $(this).serializeArray();
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
    //e.unbind(); //unbind. to stop multiple form submit.*/
	
$("#form").submit(function(e)
{
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
});
	$("#form").submit();
	clearForm();
});

function updTotal()
{
	if($('.items-holder').length > 0)
	{
		$(".finalize-total a").remove();
		
		var total = 0;
		prodList.map(function(x){
			total += (parseFloat(x.Price) * parseInt(x.Quantity));
		});
		
		if(total > 0)
		{
			var totalA = "<a>"+toUSD(total)+"</a>";
		
			$(".finalize-total").append(totalA);
		}
	}
}

function addToChkOut(product)
{
	var addToForm = "<div id='itemCheckOut-"+product.Code+"' class='checkout-item'><img alt='' src='"+product.Img+"' /><div class='text-item'><a>"+product.Name+"</a></div>"+			 				    "<input name='Code' type='text' value='"+product.Code+"' style='visibility: collapse;width: 0%;'></input>"+
				    "<input id='item"+product.Code+"-quantity' type='text' name='quantity' value="+product.Quantity+"></input>"+
			        "<div class='price-item'><a>"+toUSD(product.Price)+"<a></div>"+
					"<div class='remove'><i class='fa fa-times'></i></div></div>";
	$(".items-holder").append(addToForm);
	
	$('.remove').click(function(e){
		var rem = $(e.target).parents('[id]:eq(0)').attr('id').replace('itemCheckOut-','');
		removefromCart(rem);
		updTotal();
	});
	
	$("#item"+product.Code+"-quantity").keypress(function(e){
		var intRegex = /[0-9-()+]/;  	
		
		if ( event.which == 13 || !intRegex.test(String.fromCharCode(event.which))) {
    	 event.preventDefault();
  		}		
	});
	$("#item"+product.Code+"-quantity").change(function(e){
		if($(e.target).val().length == 0)
		{
			$(e.target).addClass("error");
		}
		else
		{
			$(e.target).removeClass("error");
		}
	});
}

$('.add').click(function(e){
	readXml();
	var prod = getAttr(e);
	if(!checkProd(prod))
		addProd(prod);
	swXml(prodList);
});

function getAttr(e)
{
	var parent = $(e.target).parent(this)[0];
	var name = parent.getElementsByClassName('Name')[0].text;
	var price = parent.getElementsByClassName('price')[0].text.replace('NZD','').replace('$','');
	var quantity = "1";
	var code = parent.getElementsByClassName('Code')[0].text;
	var img = $(parent.getElementsByClassName('liMage')[0].children).attr('src');
	
	return new Product(name,price,quantity,code,img);
}

function checkProd(product)
{
	var ret = false;
	
	if(prodList.length > 0)
	{
		prodList.map(function(x){
			if(x.Code == product.Code)
			{
				prodList.forEach(function(s){
					var rem = "#item-"+s.Code+"";
					$(rem).remove();
				});
				//x.Price = (parseCurrency(x.Price) + parseCurrency(product.Price)).toString();
				x.Quantity = (parseInt(x.Quantity) + parseInt(product.Quantity)).toString();
				ret = true;
				updCart();
			}		
		});
	}
	
	return ret;
}

function addProd(product)
{
	prodList.push(new Product(product.Name,
							  product.Price,
							  product.Quantity,
							  product.Code,
							  product.Img));
	addToCart(product);
}

function updCart()
{
	prodList.map(function(x){
		addToCart(x);
	});
}

function addToCart(product)
{
	var addToDiv = "<div class='item' id='item-"+product.Code+"'><ul><li><img class='item-photo' alt='' src='"+product.Img+"'/><span class='item-name'><a>"+product.Name+"</a></span>"+
				   "<span class='item-qnt'><a>"+product.Quantity+"</a></span><span class='item-price'><a>"+toUSD(product.Price)+"</a></span></li></ul>"+
				   "<div class='item-remove'><a><i class='fa fa-times'></i></a></div></div>";
	$(".cart-items").append(addToDiv);
	
	document.getElementById("item-"+product.Code).onclick= function(e){
		var rem = $(e.target).parents('[id]:eq(0)').attr('id').replace('item-','');
		removefromCart(rem);
		updTotal();
	};
}

function parseCurrency( num ) {
    return parseFloat( num.replace( ',', '.') );
}

function Product(Name,Price,Quantity,Code,Img){
	this.Name = Name;
	this.Price = Price;
	this.Code = Code;
	this.Quantity = Quantity;
	this.Img = Img;
};

function startXml()
{
	XML.writeStartDocument();
	XML.writeStartElement('Products');
}

function endXml()
{
	XML.writeEndElement('Products');
	XML.writeEndDocument();
}

function swXml(prod)
{
	startXml();
	
	prod.map(function(x){
		XML.writeStartElement('item');
    	XML.writeAttributeString( 'id', x.Code);
	    XML.writeAttributeString( 'enabled', 'true' );
    	XML.writeElementString('Name', x.Name);
	    XML.writeElementString('Price', x.Price);
		XML.writeElementString('Quantity', x.Quantity);
		XML.writeElementString('Image', x.Img);
		XML.writeEndElement();
	});
	
	endXml();
	setXml(XML.flush());
}

function readXml()
{
	var localStorageRow = localStorage.getItem('xml') ;
 
	if (typeof(localStorageRow) == "undefined" || localStorageRow === "" || localStorageRow === null )
	{
	}
	else
	{ 
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
	
		var items =	xmlDoc.querySelectorAll('item');
		
		if(prodList.length > 0)
			prodList = [];
			
		Array.prototype.slice.call(items).map(function(x){
			prodList.push(new Product($(x).children('name').text(),
									  $(x).children('price').text(),
									  $(x).children('quantity').text(),
									  $(x).attr('id'),
									  $(x).children('image').text()));										
		});
	}
}

function removefromCart(code)
{
	var index = 0;
	var count = true;	
	prodList.forEach(function(s){					
					if(s.Code == code)
					{
						var rem = "#item-"+s.Code+"";
						$(rem).remove();
						if($('.items-holder').length > 0)
						{
							rem = "#itemCheckOut-"+s.Code+"";
							$(rem).remove();
						}
						count = false;
					}
					if(count)
						index++;
				});
	prodList.splice(index,1);
	swXml(prodList);
};

function clearForm(){
	var index = 0;
	prodList.forEach(function(s){
						var rem = "#item-"+s.Code+"";
						$(rem).remove();						
						rem = "#itemCheckOut-"+s.Code+"";
						$(rem).remove();
				});
	prodList = [];
	swXml(prodList);
	updTotal();
}

$('#cart-chkOut a').click(function(){
	closingWindow = false;
});
$('#ulGenres a').click(function(){
	closingWindow = false;
});
$('.n2 a').click(function(){
	closingWindow = false;
});
$('.n3 a').click(function(){
	closingWindow = false;
});
$('.n4 a').click(function(){
	closingWindow = false;
});
$('.nav-items a').click(function(){
	closingWindow = false;
});

function toUSD(number) {
    var number = number.toString(), 
    dollars = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars + '.' + cents.slice(0, 2);
}