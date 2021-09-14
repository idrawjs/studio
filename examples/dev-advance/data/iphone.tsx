// import { createHTML } from '../libs/html';
import { TypeDataBase } from '@idraw/types';

const data: TypeDataBase = {
  "bgColor": "#46494a",
  "elements": [ 
    {
      name: 'Layer-Background',
      x: 100,
      y: 200,
      w: 600,
      h: 320,
      type: 'html',
      angle: 0,
      desc: {
        width: 1200,
        height: 720,
        html: `<style>
        .phone-box {
          position: relative;
          width: 1200;
          height: 720px;
          /* transform: scale(0.5); */
        }
        .phone {
          position: absolute;
          left: calc(50% - 8px);
          top: calc(50% - 2px);
          transform: translate(-50%, -50%) rotate(-30deg) skewX(30deg);
        }
        .phone-entity {
          position: absolute;
          top: -3px;
          transform: translate(-50%, -50%);
          height: 734px;
          width: 430px;
          background-image: linear-gradient(to bottom, #3a3b3f 70%, #1d1d1f);
          border-radius: 74px 40px 84px 50px;
          box-shadow: -26px 8px 8px -10px rgba(0,0,0,0.3), -6px 6px 6px 0 rgba(0,0,0,0.6), -30px 14px 10px -10px rgba(0,0,0,0.5), -20px 40px 8px 0 rgba(0,0,0,0.1), -20px 30px 8px 0 rgba(0,0,0,0.1), inset 20px 0 15px -6px rgba(0,0,0,0.6), inset 2px 0 4px -2px rgba(0,0,0,0.6), inset 2px 0 1px -2px rgba(255,255,255,0.1), inset 0 -15px 10px -10px rgba(255,255,255,0.15);
        }
        .phone-entity:before {
          content: "";
          display: block;
          height: 300px;
          width: 100px;
          position: absolute;
          background-color: #fff;
          left: 16px;
          bottom: 40px;
          border-radius: 20px;
          filter: blur(5px);
          opacity: 0.1;
          transform: rotate(4deg);
        }
        .phone-entity:after {
          content: "";
          display: block;
          height: 300px;
          width: 100px;
          position: absolute;
          background-color: #fff;
          left: 26px;
          bottom: 40px;
          border-radius: 20px;
          filter: blur(4px);
          opacity: 0.25;
          transform: rotate(2deg);
        }
        .phone-screen {
          position: absolute;
          top: -16px;
          left: 14px;
          transform: translate(-50%, -50%);
          height: 710px;
          width: 400px;
          background-color: #000;
          border-radius: 48px 40px 52px 45px;
          box-shadow: -2px 0 0px -1px rgba(255,255,255,0.4), -1px 3px 3px -3px rgba(255,255,255,0.7);
        }
        .phone-display {
          position: absolute;
          z-index: 1;
          top: -23px;
          left: 20px;
          transform: translate(-50%, -50%);
          height: 690px;
          width: 378px;
          background-color: #fbfbfb;
          border-radius: 45px 37px 41px 41px;
        }
        .phone-notch {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translate(-50%);
          width: 210px;
          background-color: #131313;
          border-top: 6px solid #000;
          height: 21px;
          z-index: 3;
          border-radius: 0 0 20px 20px;
        }
        .phone-notch:after {
          content: "";
          display: block;
          height: 12px;
          width: 12px;
          background-color: transparent;
          position: absolute;
          left: -12px;
          top: -5px;
          border-radius: 50%;
          box-shadow: 5px -5px 0 -3px #000;
        }
        .phone-notch:before {
          content: "";
          display: block;
          height: 12px;
          width: 12px;
          background-color: transparent;
          position: absolute;
          right: -12px;
          top: -5px;
          border-radius: 50%;
          box-shadow: -4px -4px 0 -3px #000;
        }
        .phone-speaker {
          position: absolute;
          top: 6px;
          width: 58px;
          height: 6px;
          border-radius: 20px;
          background-color: #2b2b2b;
          overflow: hidden;
          box-shadow: 0 0 0 1px #363637, inset -3px 3px 1px 0px #000, inset -3px 4px 0px -1px rgba(255,255,255,0.5);
          left: 50%;
          transform: translateX(-50%);
        }
        .phone-speaker:after {
          content: "";
          display: block;
          height: 4px;
          width: 4px;
          background-color: #87888c;
          position: absolute;
          right: -1px;
          border-radius: 50%;
          top: -1px;
        }
        .phone-speaker:before {
          content: "";
          display: block;
          height: 4px;
          width: 4px;
          background-color: #898a8e;
          position: absolute;
          right: -2px;
          border-radius: 50%;
          top: 4px;
        }
        .phone-left-side {
          position: absolute;
          left: 0;
          top: 60px;
          width: 30px;
          height: 100%;
        }
        .phone-left-side .phone-antena {
          position: absolute;
          height: 20px;
          width: 50px;
          left: -5px;
          top: 10px;
          border-radius: 50%;
          transform: rotate(-40deg) skewX(20deg);
          background-color: transparent;
          box-shadow: 0px -2px 1px -2px #000;
        }
        .phone-left-side .phone-antena.bottom {
          top: auto;
          bottom: 128px;
        }
        .phone-left-side .phone-antena:after {
          content: "";
          display: block;
          height: 20px;
          width: 50px;
          position: absolute;
          transform: rotate(-2deg);
          left: -5px;
          top: 3px;
          border-radius: 50%;
          background-color: transparent;
          box-shadow: 0px -2px 1px -2px #000;
        }
        .phone-button {
          position: absolute;
          top: 100px;
          left: 4px;
          height: 47px;
          width: 12px;
          background-color: #010101;
          border-radius: 30px;
          transform: skewY(-40deg);
          box-shadow: -32px -16px 10px 0 rgba(0,0,0,0.4), -4px 0 4px 0 rgba(0,0,0,0.4);
        }
        .phone-button.bottom {
          top: 160px;
        }
        .phone-button.top {
          top: 48px;
          height: 29px;
          width: 14px;
          left: 2px;
          border-radius: 10px 10px 10px 3px;
          box-shadow: inset 2px 0 0 -1px rgba(255,255,255,0.25);
        }
        .phone-button.top:after {
          height: 27px;
          width: 8px;
          left: 4px;
          top: 0px;
        }
        .phone-button.top:before {
          height: 28px;
          width: 8px;
          left: 6px;
          top: 0px;
          box-shadow: 1px 0 0 0 rgba(0,0,0,0.4);
        }
        .phone-button:before {
          content: "";
          display: block;
          position: absolute;
          height: 45px;
          width: 10px;
          background-image: linear-gradient(to bottom, #6a6b6f 85%, #0b0b0b);
          border-radius: 20px;
        }
        .phone-button:after {
          content: "";
          display: block;
          position: absolute;
          left: -2px;
          top: -1px;
          height: 44px;
          width: 10px;
          background-color: #2d2d2f;
          border-radius: 20px;
          box-shadow: inset -1px -1px 0 -1px rgba(255,255,255,0.6);
        }
        .phone-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
        }
        .phone-bottom .bottom-speaker {
          position: absolute;
          display: flex;
          left: calc(50% - 120px);
          bottom: 6px;
          transform: skewX(-50deg);
        }
        .phone-bottom .bottom-speaker.right {
          left: calc(50% + 45px);
        }
        .phone-bottom .bottom-speaker div {
          height: 6px;
          width: 6px;
          background-color: #212121;
          box-shadow: inset -4px -3px 2px -2px #000, 1px -1px 0 -1px rgba(255,255,255,0.5);
          margin: 0 3px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }
        .phone-bottom .bottom-speaker div:after {
          content: "";
          display: block;
          height: 3px;
          width: 3px;
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          bottom: -1px;
          left: 3px;
          opacity: 0.4;
        }
        .phone-bottom .phone-screw {
          position: absolute;
          bottom: 5px;
          left: calc(50% - 38px);
          height: 9px;
          width: 9px;
          background-image: linear-gradient(to right, #1a1a1c 30%, #a1a2a7 60%, #1a1a1c 80%);
          border-radius: 50%;
          transform: translateX(-50%) skewX(-50deg);
        }
        .phone-bottom .phone-screw.right {
          left: calc(50% + 36px);
        }
        .phone-bottom .phone-screw div {
          height: 6px;
          width: 6px;
          border-radius: 50%;
          background-color: #252527;
          box-shadow: 2px 2px 0 0 rgba(0,0,0,0.9), inset -2px 1px 1px -1px #000;
          position: relative;
        }
        .phone-bottom .phone-screw div:after {
          content: "";
          display: block;
          height: 4px;
          width: 4px;
          background-color: #151515;
          transform: rotate(45deg);
          position: absolute;
          top: 1px;
          box-shadow: inset -1px -1px 0 0px rgba(255,255,255,0.6);
        }
        .phone-bottom .phone-charger {
          position: absolute;
          left: 50%;
          bottom: 2px;
          background-image: linear-gradient(to right, #121214 5%, #434446 20%, #434446 60%, #7a7b80 75%, #1b1b1d 90%);
          transform: translateX(-50%) skewX(-50deg);
          height: 14px;
          width: 48px;
          overflow: hidden;
          border-radius: 15px 16px 24px 20px;
          box-shadow: 1px 1px 1px -1px rgba(255,255,255,0.4), inset -2px -2px 0 -1px #0e0e0e, inset -3px -3px 0 -1px #252527, inset 3px 3px 0 -1px #050505;
        }
        .phone-bottom .phone-charger:after {
          content: "";
          display: block;
          height: 10px;
          width: 42px;
          background-color: #050505;
          border-radius: 20px 8px 16px 10px;
          box-shadow: 1px 1px 0 -1px rgba(255,255,255,0.4);
        }
        .phone-bottom .phone-antena {
          position: absolute;
          height: 20px;
          width: 50px;
          bottom: 8px;
          left: 60px;
          border-radius: 40%;
          opacity: 0.7;
          transform: rotate(-45deg) skewX(20deg) scaleY(-1);
          background-color: transparent;
          box-shadow: 0px -2px 1px -2px #000;
        }
        .phone-bottom .phone-antena.right {
          left: auto;
          right: 70px;
          box-shadow: 0px -2px 1px -2px #000, 19px -2px 0 -2px rgba(255,255,255,0.4);
        }
        .phone-bottom .phone-antena.right:after {
          box-shadow: 0px -2px 1px -2px #000, 19px -2px 0 -2px rgba(255,255,255,0.4);
        }
        .phone-bottom .phone-antena:after {
          content: "";
          display: block;
          height: 20px;
          width: 50px;
          position: absolute;
          transform: rotate(-2deg);
          left: -3px;
          top: 3px;
          border-radius: 40%;
          background-color: transparent;
          box-shadow: 0px -2px 1px -2px #000;
        }
    
        .display-content {
          position: absolute;
          top: 0;
          left: 0;
          height: 690px;
          width: 378px;
          border-radius: 45px 37px 41px 41px;
          overflow: hidden;
        }
    
        .display-content-view {
          background-image: linear-gradient(to top, #50d2f4, #3660f2);
          font-size: 40px;
          color: #ffffff;
          height: 100%;
          padding: 20px;
          padding-top: 100px;
          box-sizing: border-box;
        }
     
        </style>
       
        <div class="phone-box">
          <div class="phone">
            <div class="phone-entity">
              <div class="phone-left-side">
                <div class="phone-antena"></div>
                <div class="phone-button top"></div>
                <div class="phone-button"></div>
                <div class="phone-button bottom"></div>
                <div class="phone-antena bottom"></div>
              </div>
              <div class="phone-bottom">
                <div class="phone-antena"></div>
                <div class="bottom-speaker">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="phone-screw">
                  <div></div>
                </div>
                <div class="phone-charger">
                </div>
                <div class="phone-screw right">
                  <div></div>
                </div>
                <div class="bottom-speaker right">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="phone-antena right"></div>
              </div>
            </div>
            <div class="phone-screen"></div>
            <div class="phone-display">
              <div class="phone-notch">
                <div class="phone-speaker"></div>
              </div>
              <div class="display-content">
                <div class="display-content-view">
                  <!-- Hello World -->
                </div>
              </div>
            </div>
            
          </div>
        </div>`,
      },
      operation: {
        lock: false,
      }
    },
    {
      name: 'Layer-Screen',
      x: 104,
      y: 140,
      w: 600,
      h: 320,
      type: 'html',
      angle: 0,
      desc: {
        width: 1200,
        height: 720,
        html: `<style>
        .phone-box {
          opacity: 0.8;
          position: relative;
          width: 1200px;
          height: 720px;
        }
        .phone {
          position: absolute;
          left: calc(50% - 8px);
          top: calc(50% - 2px);
          transform: translate(-50%, -50%) rotate(-30deg) skewX(30deg);
        } 
        
        .phone-display {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          height: 690px;
          width: 378px;
          background-color: #fbfbfb;
          border-radius: 45px 37px 41px 41px;
        }
        .phone-notch {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translate(-50%);
          width: 210px;
          background-color: #131313;
          border-top: 6px solid #000;
          height: 21px;
          z-index: 3;
          border-radius: 0 0 20px 20px;
        }
        .display-content {
          position: absolute;
          top: 0;
          left: 0;
          height: 690px;
          width: 378px;
          border-radius: 45px 37px 41px 41px;
          overflow: hidden;
        }
        .display-content-view {
          background-image: linear-gradient(to top, #ffeb3b, #ff9800);
          font-size: 40px;
          color: #ffffff;
          height: 100%;
          padding: 20px;
          padding-top: 100px;
          box-sizing: border-box;
        }
        .display-content-text {
          font-size: 80px;
          font-weight: bolder;
          color: #ffffff;
          height: 100%;
          padding: 20px;
          padding-top: 100px;
          box-sizing: border-box;
        }
     
        </style>
       
        <div class="phone-box">
          <div class="phone">
            
            <div class="phone-display">
              <div class="phone-notch"></div>
              <div class="display-content">
                <div class="display-content-view"></div>
              </div>
              <div class="display-content">
                <h1 class="display-content-text">iDraw.js</h1>
              </div>
            </div>
            
          </div>
        </div>`
      }
    },
    {
      name: 'Introduction',
      x: 390,
      y: 120,
      w: 350,
      h: 75,
      angle: 0,
      type: 'text',
      desc: {
        text: 'A simple JavaScript framework for\r\nDrawing on the web',
        color: '#f0f0f0',
        fontSize: 20,
        fontWeight: 'bold',
        bgColor: ''
      }
    },
    {
      name: 'Title',
      x: 440,
      y: 45,
      w: 230,
      h: 70,
      angle: 0,
      type: 'text',
      desc: {
        text: 'iDraw.js',
        color: '#ffffff',
        fontSize: 50,
        fontWeight: 'bold',
        bgColor: '',
      }
    },
  ]
}

export default data;