// Based on: http://www.javascripter.net/faq/plotafunctiongraph.htm

const mass = 50.0
const other_mass = 50.0
const radius = 0.5
const other_radius = 0.5

const gravity_eq_shift = 10.0;
const repulsion_power = 10.0;
const rt_gravity_eq_shift = Math.pow(gravity_eq_shift,2.0/repulsion_power);

function fun1(x) {
    let repulsion;
    if(x<radius+other_radius){
        repulsion = (0.1 * mass * other_mass / (Math.pow(Math.max(x-(radius+other_radius)+rt_gravity_eq_shift,rt_gravity_eq_shift-0.1*rt_gravity_eq_shift*(radius+other_radius))), repulsion_power));
    }else{
        repulsion = 0.0;
    }
    return (0.1 * mass * other_mass / (Math.pow(Math.max(x-(radius+other_radius)+gravity_eq_shift,gravity_eq_shift), 2.0))) - repulsion;
}

function draw() {
    var canvas = document.getElementById("plot");
    if (null==canvas || !canvas.getContext) return;
    var wrapper = canvas.parentNode;
    canvas.setAttribute("width", window.getComputedStyle(canvas).width);
    canvas.setAttribute("height", (parseInt(window.getComputedStyle(canvas).width, 10)*3.5).toString() + "px");

    var axes={}, ctx=canvas.getContext("2d");
    axes.x0 = .1 + .1*canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .2*canvas.height; // y0 pixels from top to y=0
    axes.scale = canvas.width/10.05;                 // 40 pixels from x=0 to x=1
    axes.doNegativeX = true;

    showAxes(ctx,axes);
    funGraph(ctx,axes,fun1,"#417b6d",4); 
    }

    function funGraph (ctx,axes,func,color,thick) {
    var xx, yy, dx=0.01, x0=axes.x0, y0=axes.y0, scale=axes.scale;
    var iMax = Math.round((ctx.canvas.width-x0)/dx);
    var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (var i=iMin;i<=iMax;i++) {
    xx = dx*i; yy = scale*func(xx/(scale/4.0));
    if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
    else         ctx.lineTo(x0+xx,y0-yy);
    }
    ctx.stroke();
}

function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = axes.doNegativeX ? 0 : x0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)"; 
 ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();
}

window.addEventListener("DOMContentLoaded", function(event){draw();})
window.addEventListener("resize", function(event){draw();});