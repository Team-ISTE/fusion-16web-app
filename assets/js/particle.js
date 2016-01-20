(function() {
  var particlesQuantity = 140,
      velocity = 2,
      maxRadius = 7,
      matrixField = 0,
      matrixVel = 10;
  
  var canvas = document.getElementById('canvas'),
      context,
      particles = [],
      mouse = {x:0,y:0};
 
  if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');
    
    for (var i=0; i < particlesQuantity/2; i++) {
      var gray = Math.round(Math.random()*200);
      
      particles.push({
        x: Math.round(Math.random()*window.innerWidth),
        y: Math.round(Math.random()*window.innerHeight),
        velx: Math.random()*velocity*2 - velocity,
        vely: Math.random()*velocity*2 - velocity,
        radius: Math.round(Math.random()*maxRadius),
        color: 'rgb(' + [gray,gray,gray].join(',') + ')'
      }
	  
	  );
     }
	 for (var i=particlesQuantity/2; i < particlesQuantity; i++) {
      var gray = Math.round(Math.random()*200);
      
      particles.push({
        x: Math.round(Math.random()*window.innerWidth),
        y: Math.round(Math.random()*window.innerHeight),
        velx: Math.random()*velocity*2 - velocity,
        vely: Math.random()*velocity*2 - velocity,
        radius: Math.round(Math.random()*maxRadius),
        color: 'rgb(' + [100-gray,50-gray,gray].join(',') + ')'
      });
	 }

   for (var i=particlesQuantity/2; i < particlesQuantity; i++) {
      var gray = Math.round(Math.random()*200);
      
      particles.push({
        x: Math.round(Math.random()*window.innerWidth),
        y: Math.round(Math.random()*window.innerHeight),
        velx: Math.random()*velocity*2 - velocity,
        vely: Math.random()*velocity*2 - velocity,
        radius: Math.round(Math.random()*maxRadius),
        color: 'rgb(' + [100+gray,50+gray,gray].join(',') + ')'
      });
   }


    initialize();
  }
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function mouseMove(e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
  }
  
  function render() {
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    
    var particle,
        len = particles.length;
    
    for (var i=0; i < len; i++) {
      particle = particles[i];
      
      if (!particle.frozen) {
        if (particle.x < 0) {
          particle.velx = velocity + Math.random();
        } else if (particle.x > window.innerWidth) {
          particle.velx = -velocity - Math.random();
        } 
        
        if (particle.y < 0) {
          particle.vely = velocity + Math.random();
        } else if (particle.y > window.innerHeight) {
          particle.vely = -velocity - Math.random();
        }
        
        var distance = distanceBetween(mouse,particle);
        if (distance < matrixField) {
          particle.x += particle.velx/matrixVel;
          particle.y += particle.vely/matrixVel;
          } else {
          particle.x += particle.velx;
          particle.y += particle.vely;
        }
      }
     
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x,particle.y,particle.radius,0,Math.PI*2,true);
      //context.lineWidth = 2;
      //context.stroke();
      context.closePath();
      context.fill();
    }
    
    context.save();
    context.beginPath();
        context.clip();
    
    context.beginPath();
    context.globalAlpha = 0.25;
    context.arc(mouse.x,mouse.y,matrixField,0,Math.PI*2,false);
    var grd = context.createRadialGradient(mouse.x, mouse.y, matrixField/5, mouse.x, mouse.y, matrixField);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(1, '#808080');
    context.fillStyle = grd;
    context.shadowColor = 'black';
    context.shadowBlur = 10;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fill();
    
    context.restore();    
  }
  
  function mouseIn() {
    var closestIndex = 0,
        closestDistance = 1000, 
        len = particles.length;
    
    for (var i=0; i < len; i++) {
      var thisDistance = distanceBetween(particles[i],mouse);
      if (thisDistance < closestDistance) {
        closestDistance = thisDistance;
        closestIndex = i;
      }
    }
    
    if (closestDistance < particles[closestIndex].radius) {
      particles[closestDistance].frozen = true;
    }
    
  }
  
  function distanceBetween(a,b) {
    var dx = Math.pow(a.x - b.x,2),
        dy = Math.pow(a.y - b.y,2);
    return Math.sqrt(dx+dy);
  }
  
  function initialize() {
    canvas.addEventListener('mousemove',mouseMove,false);
    window.addEventListener('resize',resizeCanvas,false);
    window.addEventListener('mousein',mouseIn,false);
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    
    (function animloop(){
      requestAnimFrame(animloop);
      render();
    })();
    
    resizeCanvas();
  }
})();
