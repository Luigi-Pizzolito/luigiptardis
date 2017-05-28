<!--

/*
Submitted by Marcin Wojtowicz [one_spook@hotmail.com] 
Featured on JavaScript Kit (http://javascriptkit.com)
Modified by JK to be IE7+/ Firefox compatible
For this and over 400+ free scripts, visit http://javascriptkit.com
*/

var trailLength = 8 // The length of trail (8 by default; put more for longer "tail")
var path = "cursor.gif" // URL of your image

var standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes
var i,d = 0

function initTrail() { // prepares the script
	images = new Array() // prepare the image array
	for (i = 0; i < parseInt(trailLength); i++) {
		images[i] = new Image()
		images[i].src = path
	}
	storage = new Array() // prepare the storage for the coordinates
	for (i = 0; i < images.length*3; i++) {
		storage[i] = 0
	}
	for (i = 0; i < images.length; i++) { // make divs for IE and layers for Navigator
		document.write('<div id="obj' + i + '" style="position: absolute; z-Index: 100; height: 0; width: 0"><img src="' + images[i].src + '"></div>')
	}
	trail()
}
function trail() { // trailing function
	for (i = 0; i < images.length; i++) { // for every div/layer
		document.getElementById("obj" + i).style.top = storage[d]+'px' // the Y-coordinate
		document.getElementById("obj" + i).style.left = + storage[d+1]+'px' // the X-coordinate
		d = d+2
	}
	for (i = storage.length; i >= 2; i--) { // save the coordinate for the div/layer that's behind
		storage[i] = storage[i-2]
	}
	d = 0 // reset for future use
	var timer = setTimeout("trail()",10) // call recursively 
}
function processEvent(e) { // catches and processes the mousemove event 
	if (window.event) { // for IE
		storage[0] = window.event.y+standardbody.scrollTop+10
		storage[1] = window.event.x+standardbody.scrollLeft+10
	} else {
		storage[0] = e.pageY+12
		storage[1] = e.pageX+12
	}
}

	initTrail() 
	document.onmousemove = processEvent // start capturing

//-->












function lib2bwcheck() {
    this.ver = navigator.appVersion;
    this.agent = navigator.userAgent;
    this.dom = document.getElementById ? 1 : 0;
    this.opera5 = this.agent.indexOf("Opera 5") > -1;
    this.ie5 = (this.ver.indexOf("MSIE 5") > -1 && this.dom && !this.opera5) ? 1 : 0;
    this.ie6 = (this.ver.indexOf("MSIE 6") > -1 && this.dom && !this.opera5) ? 1 : 0;
    this.ie4 = (document.all && !this.dom && !this.opera5) ? 1 : 0;
    this.ie = this.ie4 || this.ie5 || this.ie6;
    this.mac = this.agent.indexOf("Mac") > -1;
    this.ns6 = (this.dom && parseInt(this.ver) >= 5) ? 1 : 0;
    this.ns4 = (document.layers && !this.dom) ? 1 : 0;
    this.bw = (this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.opera5);
    return this;
}
var bw = new lib2bwcheck()
var px = bw.ns4 || window.opera ? "" : "px";
function run() {
    var css, obj, nest, ooo;
    if ((document.all) && (!bw.opera5)) {
        movy = document.body.clientHeight - 64;
        movx = document.body.clientWidth - 50;
    } else {
        movx = window.innerWidth - 50;
        movy = window.innerHeight - 64;
    }
    if (t == maxitems) {
        x1 = Math.round(Math.random() * movx * (sxto - sxfrom) / 100 + movx * sxfrom / 100);
        x2 = Math.round(Math.random() * movx * (sxto - sxfrom) / 100 + movx * sxfrom / 100);
        y2 = Math.round(Math.random() * movy * (syto - syfrom) / 100 + movy * syfrom / 100);
        if (x1 == x2)
            x1++;
        for (var i = 0; i < maxitems; i++) {
            ox[i] = x1;
            oy[i] = movy;
            ds[i] = 0;
        }
    }
    t = 0;
    for (var i = 0; i < maxitems; i++) {
        if (ds[i] == 0) {
            oy[i] -= yspeed;
            if (oy[i] < y2) {
                oy[i] = y2;
                ds[i] = 1;
                sx[i] = Math.round(Math.random() * movx * (sdto - sdfrom) / 100 + movx * sdfrom / 100);
                sy[i] = Math.round(Math.random() * movy * (sdto - sdfrom) / 100 + movy * sdfrom / 100);
            }
            ox[i] = x2 + (x1 - x2) * (oy[i] - y2) / (movy - y2);
        } else if (ds[i] < explode) {
            ox[i] = x2 + Math.round(Math.cos((explode - ds[i]) * Math.PI / (2 * explode)) * sx[i]);
            oy[i] = y2 + Math.round(Math.cos((explode - ds[i]) * Math.PI / (2 * explode)) * sy[i]);
            ds[i]++;
        } else {
            if (oy[i] < movy) {
                oy[i] += yspeed;
                if (sx[i] == 0)
                    ox[i] = 0;
                else
                    ox[i] += Math.round(Math.random() * xspeed * sx[i] / Math.abs(sx[i]));
            } else
                t++;
        }
        if (bw.ns4) {
            ooo = eval("document.s" + i);
            ooo.moveTo(ox[i], oy[i]);
        } else {
            obj = "s" + i;
            nest = "";
            css = bw.dom ? document.getElementById(obj).style : bw.ie4 ? document.all[obj].style : bw.ns4 ? eval(nest + "document.layers." + obj) : 0;
            css.left = ox[i];
            css.top = oy[i];
        }
    }
    setTimeout("run()", tpause, "JavaScript");
}
var maxitems = Math.floor((Math.random() * 100)+20);
var sxfrom = 30;
var sxto = 60;
var syfrom = 20;
var syto = 50;
var sdfrom = -20;
var sdto = 20;
var yspeed = Math.floor((Math.random() * 10)+5);
var xspeed = Math.floor((Math.random() * 5)+3);
var explode = Math.floor(Math.random() * 32);
var pcol = Math.floor(Math.random() * 16777215).toString(16);
var tpause = 20;
var schar = ".";
var fontface = 0;
var fontsize = "6";
if (fontface == 0)
    fontface = 'Arial, Helvetica, sans-serif';
else if (fontface == 1)
    fontface = 'Times New Roman, serif';
else if (fontface == 2)
    fontface = 'Courier New, Courier, mono';
else if (fontface == 3)
    fontface = 'Georgia, Times New Roman, Times, serif';
else
    fontface = 'Verdana, Arial, Helvetica, sans-serif';
var x1, x2, y2;
var t = 0;
t = pcol.length;
for (var i = 0; i < 6 - t; i++)
    pcol = '0' + pcol;
if (sxfrom > sxto) {
    t = sxto;
    sxto = sxfrom;
    sxfrom = t;
}
if (syfrom > syto) {
    t = syto;
    syto = syfrom;
    syfrom = t;
}
if (sdfrom > sdto) {
    t = sdto;
    sdto = sdfrom;
    sdfrom = t;
}
if ((document.all) && (!bw.opera5)) {
    movy = document.body.clientHeight - 64;
    movx = document.body.clientWidth - 50;
} else {
    movx = window.innerWidth - 50;
    movy = window.innerHeight - 64;
}
ox = new Array();
oy = new Array();
sx = new Array();
sy = new Array();
ds = new Array();
pa = new Array();
t = maxitems;
for (var i = 0; i < maxitems; i++) {
    if (bw.ns4)
        document.writeln("<layer id='s" + i + "'>");
    else
        document.writeln("<div id='s" + i + "' style='position:absolute; z-index:3;'>");
        //update here
    //pcol = Math.floor(Math.random() * 16777215).toString(16);
pcol = "ffffff";
 maxitems = Math.floor((Math.random() * 100)+10);
yspeed = Math.floor((Math.random() * 10)+5);
xspeed = Math.floor((Math.random() * 5)+3);
explode = Math.floor((Math.random() * 32)+20);
    document.writeln('<font color=#' + pcol + ' face="' + fontface + '" size="' + fontsize + '">' + schar + '</font>');
    if (bw.ns4)
        document.writeln("</layer>");
    else {
        document.writeln("</div>");
    }
}
setTimeout("run()", tpause, "JavaScript");




var sp0
var sp1
var sp2
var fl
var time = new Date();
setInterval("tick()",250);

function tick() {
	time = new Date();
	if (time.getSeconds()%2 == 0) {fl = ":"} else {fl = " "}
	if (time.getHours() < 10) {sp0 = "0"} else {sp0 = ""}
	if (time.getMinutes() < 10) {sp1 = "0"} else {sp1 = ""}
	if (time.getSeconds() < 10) {sp2 = "0"} else {sp2 = ""}
	document.getElementById("clock").value=sp0+time.getHours()+fl+sp1+time.getMinutes()+fl+sp2+time.getSeconds()
	
	document.getElementById("clock").blur()
};







/*
Neon Lights Text
By JavaScript Kit (http://javascriptkit.com)
Over 400+ free scripts here!
*/

var message="Luigi's Website"
var neonbasecolor="gray"
var neontextcolor="lime"
var flashspeed=100  //in milliseconds

///No need to edit below this line/////

var n=0
if (document.all||document.getElementById){
document.write('<center>')
for (m=0;m<message.length;m++)
document.write('<span style="font-size:60px" id="neonlight'+m+'">'+message.charAt(m)+'</span>')
document.write('</center>')
}
else
document.write(message)

function crossref(number){
var crossobj=document.all? eval("document.all.neonlight"+number) : document.getElementById("neonlight"+number)
return crossobj
}

function neon(){

//Change all letters to base color
if (n==0){
for (m=0;m<message.length;m++)
//eval("document.all.neonlight"+m).style.color=neonbasecolor
crossref(m).style.color=neonbasecolor
}

//cycle through and change individual letters to neon color
crossref(n).style.color=neontextcolor

if (n<message.length-1)
n++
else{
n=0
clearInterval(flashing)
setTimeout("beginneon()",1500)
return
}
}

function beginneon(){
if (document.all||document.getElementById)
flashing=setInterval("neon()",flashspeed)
}
beginneon()