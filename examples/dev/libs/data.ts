const data = {
  "bgColor": "#292929",
  "elements": [{
    "name": "rect-001-abcdefghijklmn",
    "x": 20,
    "y": 20,
    "w": 200,
    "h": 100,
    "type": "rect",
    "desc": {
      "color": "#f0f0f0",
      "borderRadius": 20,
      "borderWidth": 10,
      "borderColor": "#bd0b64"
    },
    "uuid": "06416184-2ecf-10ad-1c08-3715aece35b5"
  }, 
  {
    x: 0,
    y: 0,
    w: 720,
    h: 540,
    type: 'html',
    desc: {
      width: 720,
      height: 540,
      html: `
      <style>
      .container {
        margin: 0;
        width: 720px;
        height: 540px;
        perspective: 1500px;
        position: relative;
        overflow: hidden;
      }

      .menu {
        margin: 100px auto;
        position: relative;
        background: #62278d;
        background: -moz-linear-gradient(top,  #62278d 0%, #2cc09b 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#62278d), color-stop(100%,#2cc09b));
        background: -webkit-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -o-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -ms-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: linear-gradient(to bottom,  #62278d 0%,#2cc09b 100%);
        width: 300px;
        border-width: 20px 0;
        border-style: solid;
        border-color: #fff;
        color: #fff;
        height: 540px;
        transform-style: preserve-3d;
        box-shadow: 0 0 50px 0 #444;
      }
      .menu-tranform.menu {
        transform: translateY(-150px) rotateX(45deg) rotateZ(45deg);
      }
      .menu:before {
        content: '';
        position: absolute;
        height: 30px;
        width: 300px;
        top: 520px;
        left: 0px;
        transform: rotateX(90deg) translateY(-15px) translateZ(15px);
        background: #fff;
        pointer-events: none;
      }
      .menu:after {
        content: '';
        position: absolute;
        height: 540px;
        width: 30px;
        top: -20px;
        right: -30px;
        transform: rotateY(90deg) translateZ(-15px) translateX(15px);
        border-width: 20px 0;
        border-style: solid;
        border-color: #fff;
        background: #62278d;
        background: -moz-linear-gradient(top,  #62278d 0%, #2cc09b 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#62278d), color-stop(100%,#2cc09b));
        background: -webkit-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -o-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -ms-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: linear-gradient(to bottom,  #62278d 0%,#2cc09b 100%);
        pointer-events: none;
      }


      .menu .middle {
        position: relative;
        min-height: 40px;
        list-style: none;
        padding: 0;
        margin: 0;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 15px;
        transform-style: preserve-3d;
      }
      .menu .middle li {
        margin: 0;
        padding: 15px 0 15px 40px;
        outline: 0 none;
        position: relative;
        transform-style: preserve-3d;
        transform: translateZ(1px);
        z-index: 1;
      }


      .menu .middle li .fa {
        padding-right: 15px;
      }
      .menu .bottom {
        height: 40px;
      }
      .menu-back {
        position: absolute;
        background: transparent;
        top: -20px;
        left: 0;
        width: 300px;
        height: 540px;
        transform: translateZ(-29px);
        /* box-shadow: 100px 100px 50px -30px #111; */
        box-shadow: 50px 60px 60px -60px #111;
        z-index: 0;
      }
      .glass-reflection {
        position: absolute;
        transform: rotateZ(-1deg) translateZ(1px) skewY(60deg);
        
        box-shadow: inset 0px -40px 0px -50px rgba(255, 255, 255, 0.0);
        border-radius: 200px 0 20px 0 ;
        top: 85px;
        left: 95px;
        width: 200px;
        height: 100px;
        background-color: transparent;
      }
      .menu-tranform.menu .glass-reflection {
        box-shadow: inset 0px -40px 150px -50px rgba(255, 255, 255, 0.15);
      }

    </style>
    <div class="container">
      <div class="menu-tranform menu">
        <ul class="middle">
          <li tabindex="0"><i class="fa fa-calendar"></i></li>
          <li tabindex="0"><i class="fa fa-calendar"></i>Calendar</li>
          <li tabindex="0"><i class="fa fa-camera"></i>Photos</li>
          <li tabindex="0"><i class="fa fa-check-square-o"></i>Tasks</li>
          <li tabindex="0"><i class="fa fa-map-marker"></i>Places</li>
          <li tabindex="0"><i class="fa fa-codepen"></i>Codepen</li>
          <li tabindex="0"><i class="fa fa-dribbble"></i>Dribbble</li>
          <li tabindex="0"><i class="fa fa-user"></i>User account</li>
          <li tabindex="0"><i class="fa fa-cogs"></i>Settings</li>
        </ul>
        <div class="bottom"></div>
        <div class="menu-back"></div>
        <div class="glass-reflection"></div>
      </div>
    </div>
      `,
    }
  }]
}

export default data;