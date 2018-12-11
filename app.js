console.log("yet");

$(document).ready(function() {
	$("#binary").on('input', function() {
		convert();
	});

	$("#m1").on('input', function() {
		mult();
	});
	$("#m2").on('input', function() {
		mult();
	});
	$("#user-binary-result").on('input', function() {
		compareMult();
	});
	$("#user-div-check-result").on('input', function() {
		compareDiv();
	});

	$("#d1").on('input', function() {
		div();
	});
	$("#d2").on('input', function() {
		div();
	});
});


function convert() {
	var bin = $("#binary").val() || "";
	bin = bin.replace(/ /g, '');
	try {
		var x = new BigNumber(bin, 2);
		document.getElementById("binary").style.backgroundColor = "white";
	}
	catch(err) {
		document.getElementById("binary").style.backgroundColor = "#fff0f0";
		return;
	}
	var xx=x.toString(10);
	document.getElementById("y").value = xx;
	// hex document.getElementById("y3").value = x.toString(16).toUpperCase();
	var t1 = new BigNumber("8000000000000000",16);
	var t2 = new BigNumber("10000000000000000",16);
	if( x.isInteger() && x.gte(0) ) {
		if( bin.length==8 && x.gte("80", 16) ) x=x.minus("100", 16);
		if( bin.length==16 && x.gte("8000", 16) ) x=x.minus("10000", 16);
		if( bin.length==32 && x.gte("80000000", 16) ) x=x.minus("100000000", 16);
		if( bin.length==64 && x.gte(t1) ) { x=x.minus(t2); }
		if( bin.length==8 || bin.length==16 || bin.length==32 || bin.length==64 )
			document.getElementById("y2").value = x.toString(10);
		else
			document.getElementById("y2").value = "N/A";
	}
	else
		document.getElementById("y2").value = "N/A";
	// var txt=bin+" = ";
	// var d,e,minus=false;
	// var len=bin.length;
	// if( bin[0]=="-" ) { txt+="-["; bin=bin.substr(1); len--; minus=true; }
	// var idot=bin.indexOf(".");
	// if( idot>=0 ) { bin=bin.substring(0,idot)+bin.substring(idot+1,len); len--; }
	// else idot=len;
	// etbl = ["\u2070","\u00B9","\u00B2","\u00B3","\u2074","\u2075","\u2076","\u2077","\u2078","\u2079"];
	// for(var i=0; i<len; i++) {
	// 	d = bin.charCodeAt(i);
	// 	if( d<58 ) d-=48;
	// 	else if( d>64 ) d-=55;
	// 	//e = len-i-1;
	// 	e = idot-i-1;
	// 	e=e.toString();
	// 	txt+="("+d+" \u00D7 2";
	// 	for(var k=0; k<e.length; k++)
	// 		if( e[k]=="-" )
	// 			txt+="\u207B";
	// 		else
	// 			txt+=etbl[e[k]];
	// 	txt+=")";
	// 	if( i<len-1 ) txt+=" + ";
	// }
	// if( minus ) txt+="]";
	// txt+=" = "+xx;
	// document.getElementById("y4").value = txt;
	checkIfPastedIsCalculatedAnswer(x);
}

function save() {
	var bin = $("#binary").val();
	var unsigned = $("#y").val();
	var signed = $("#y2").val();
	console.log(bin + ":\n" + unsigned + "\n" + signed);
}

// mat.trim().split('\n').map(n=>n.split(":")).map(n=>[parseInt(n[0]),n[1].length-n[1].lastIndexOf("1")-1])


var answers = {};
function mult() {
	var a = $("#m1").val();
	var b = $("#m2").val();
	if(!a || !b) return;
	var x = new BigNumber(a, 2);
	var y = new BigNumber(b, 2);
	var mult = x.multipliedBy(y);
	answers.mult = mult;
	$("#mult-decimal-result").val(mult.toString(10));
	$("#mult-binary-result").val(mult.toString(2));
	compareMult()
}

function compareMult() {
	var a = $("#user-binary-result").val();
	if(!a) return;
	if(!answers.mult) return;
	var c = new BigNumber(a, 2);
	var same = c.eq(answers.mult);
	$("#is-same").text(same ? "SAME" : "NO :(");
}

function div() {
	var a = $("#d1").val();
	var b = $("#d2").val();
	if(!a || !b) return;
	var x = new BigNumber(a, 2);
	var y = new BigNumber(b, 2);
	var div = x.idiv(y);
	var mod = x.mod(y);
	answers.div = div;
	answers.mod = mod;
	$("#div-decimal-result").val(div.toString(10)+ "R" + mod.toString(10));
	$("#div-binary-q-result").val(div.toString(2));
	$("#div-binary-r-result").val(mod.toString(2));
	compareDiv()
}


function compareDiv() {
	var a = $("#user-div-check-result").val();
	if(!a) return;
	if(!answers.div) return;
	var c = new BigNumber(a, 2);
	var same = c.eq(answers.div);
	$("#is-same-division").text(same ? "SAME" : "NO :(");
}

function checkIfPastedIsCalculatedAnswer(x) {
	for(var ans in answers) {
		if(x.eq(answers[ans])) {
			console.log(ans);
		}
	}
}



/* From Sedgewick:
if (q == 0)
return new int[] { p, 1, 0 };

int[] vals = gcd(q, p % q);
int d = vals[0];
int a = vals[2];
int b = vals[1] - (p / q) * vals[2];
return new int[] { d, a, b };
*/

function xgcd(p, q) {
	if(q.eq(0)) return [p, new BigNumber(1), new BigNumber(0)];
	var vals = xgcd(q, p.mod(q));
	var d = vals[0];
	var a = vals[2];
	var b = vals[1].minus(p.idiv(q).times(vals[2]));
	return [d, a, b];
}
function callGcd() {
	var a = $("#gcd1").val();
	var b = $("#gcd2").val();
	var p = new BigNumber(a, 2);
	var q = new BigNumber(b, 2);
	var xgcdres = xgcd(p,q);
	answers.xgcdd = xgcdres[0];
	answers.xgcda = xgcdres[1];
	answers.xgcdb = xgcdres[2];
	$("#xgcd-d-res").val(xgcdres[0].toString(10));
	$("#xgcd-a-res").val(xgcdres[1].toString(10));
	$("#xgcd-b-res").val(xgcdres[2].toString(10));
}


function callRsa() {
	var pinput = $("#rsa-p").val();
	var qinput = $("#rsa-q").val();
	if(!pinput || !qinput) return;
	var radix = /^[01]+$/.test(pinput) ? 2 : 10;
	var p = new BigNumber(pinput, radix);
	var q = new BigNumber(qinput, radix);
	answers.n = p.times(q);
	answers.phi_n = p.minus(1).times(q.minus(1));
	answers.e = new BigNumber("65537"); // 65537
	var xgcdRes = xgcd(answers.phi_n, answers.e);
	answers.d = xgcdRes[2].mod(answers.phi_n);
	if(answers.d.isNegative()) {
		answers.d = answers.d.plus(answers.phi_n);
	}
	$("#rsa-n").val(answers.n.toString(10));
	$("#rsa-phi_n").val(answers.phi_n.toString(10));
	$("#rsa-e").val(answers.e.toString(10));
	$("#rsa-d").val(answers.d.toString(10));
}