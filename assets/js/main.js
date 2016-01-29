var items = []
  , point = document.querySelector('svg').createSVGPoint();

function getCoordinates(e, svg) {
  point.x = e.clientX;
  point.y = e.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function changeColor(e) {
  document.body.className = e.currentTarget.className;
}

function Item(config) {
  Object.keys(config).forEach(function (item) {
    this[item] = config[item];
  }, this);
  this.el.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
  this.el.addEventListener('touchmove', this.touchMoveHandler.bind(this));
}

Item.prototype = {
  update: function update(c) {
    this.clip.setAttribute('cx', c.x);
    this.clip.setAttribute('cy', c.y);
  },
  mouseMoveHandler: function mouseMoveHandler(e) {
    this.update(getCoordinates(e, this.svg));
  },
  touchMoveHandler: function touchMoveHandler(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) return this.update(getCoordinates(touch, this.svg));
  }
};

[].slice.call(document.querySelectorAll('.item'), 0).forEach(function (item, index) {
  items.push(new Item({
    el: item,
    svg: item.querySelector('svg'),
    clip: document.querySelector('#clip-'+index+' circle'),
  }));
});

[].slice.call(document.querySelectorAll('button'), 0).forEach(function (button) {
  button.addEventListener('click', changeColor);
});

 $(document).ready(function(){
      $('.slider').slider();
       $('.modal-trigger').leanModal();
       $('#team1').click(function(){
          swal({
            html: true,
            imageUrl:"../img/team-icon.png",
            title:"Made with <img src='../img/heartico.ico' /> by: <br>",
            text: "<div class='row'><div class='col-xs-12'> Arvind Iyer <br><a href='#'><img src='../img/githubB.png' style='height:22px; margin-bottom:5px;margin-right:5px' /></a><a href='#'>  <img src='../img/email.png' /></a></div><div class='col-xs-12'> Yash Mehta <br> <a href='#'><img src='../img/email.png' /></a> </div><div class='col-xs-12'> Maunil Swadas <br><a href='#'><img src='../img/githubB.png' style='height:22px; margin-bottom:5px;margin-right:5px' /></a><a href='#'> <img src='../img/email.png' /> </a> </div><div class='col-xs-12'> Vatsal Trivedi <br><a href='#'><img src='../img/githubB.png' style='height:22px; margin-bottom:5px;margin-right:5px' /> </a><a href='#'><img src='../img/email.png' /></a></div><div class='col-xs-12'> Rohit Patel <br><a href='#'><img src='../img/githubB.png' style='height:22px; margin-bottom:5px;margin-right:5px' /></a><a href='#'> <img src='../img/email.png' /> </a></div><div class='col-xs-12'> Mittal Mayank <br><a href='#'><img src='../img/email.png' /></a>  </div></div>",
            allowOutsideClick:true,
            showConfirmButton: false,
          });
       });
var myCenter=new google.maps.LatLng(22.552334,72.923217);
              var marker;
              function initialize()
              {
              var mapProp = {
                center:myCenter,
                zoom:5,
                mapTypeId:google.maps.MapTypeId.ROADMAP
                };

              var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

              var marker=new google.maps.Marker({
                position:myCenter,
                animation:google.maps.Animation.BOUNCE
                });

              marker.setMap(map);
              }

              google.maps.event.addDomListener(window, 'load', initialize);
    });


  



        