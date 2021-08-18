const data = {
  "bgColor": "#292929",
  "elements": [ 
  {
    x: 183,
    y: 183,
    w: 360,
    h: 250,
    type: 'html',
    desc: {
      width: 360,
      height: 250,
      html: `
      <style>
      .layer-container {
        position: relative;
        height: 250px;
        width: 360px;
      }
      .layer-content {
        display: flex;
        place-items: flex-end;
        position: absolute;
        left: calc(50% - 88px);
        top: calc(50% - 86px);
        width: 180px;
        height: 320px;
        background: #62278d;
        background: -moz-linear-gradient(top,  #62278d 0%, #2cc09b 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#62278d), color-stop(100%,#2cc09b));
        background: -webkit-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -o-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -ms-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: linear-gradient(to bottom,  #62278d 0%,#2cc09b 100%);
        border: 1px #666666 solid;
        transform: perspective(900px) translateX(15px) rotateX(45deg) rotate(10deg) skew(-15deg) translateZ(120px);;
      }
      .layer-text {
        display: flex;
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        border: 2px solid #ffffff;
        margin: 10px;
        padding: 4px;
      }

    </style>
    <div class="layer-container">
      <div class="layer-content ">
        <span class="layer-text">HTML</span>
      </div>
    </div>
      `,
    }
  },
  {
    x: 180,
    y: 130,
    w: 360,
    h: 250,
    type: 'html',
    desc: {
      width: 360,
      height: 250,
      html: `
      <style>
      .layer-container {
        position: relative;
        height: 250px;
        width: 360px;
      }
      .layer-content {
        display: flex;
        place-items: flex-end;
        position: absolute;
        left: calc(50% - 88px);
        top: calc(50% - 86px);
        width: 180px;
        height: 320px;
        background: #62278d;
        background: -moz-linear-gradient(top,  #62278d 0%, #2cc09b 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#62278d), color-stop(100%,#2cc09b));
        background: -webkit-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -o-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: -ms-linear-gradient(top,  #62278d 0%,#2cc09b 100%);
        background: linear-gradient(to bottom,  #62278d 0%,#2cc09b 100%);
        border: 1px #666666 solid;
        transform: perspective(900px) translateX(15px) rotateX(45deg) rotate(10deg) skew(-15deg) translateZ(120px);;
      }
      .layer-text {
        display: flex;
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        border: 2px solid #ffffff;
        margin: 10px;
        padding: 4px;
      }

    </style>
    <div class="layer-container">
      <div class="layer-content ">
        <span class="layer-text">SVG</span>
      </div>
    </div>
      `,
    }
  }]
}

export default data;