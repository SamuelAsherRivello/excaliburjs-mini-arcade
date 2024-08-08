var ae=Object.defineProperty;var ne=(c,e,A)=>e in c?ae(c,e,{enumerable:!0,configurable:!0,writable:!0,value:A}):c[e]=A;var i=(c,e,A)=>ne(c,typeof e!="symbol"?e+"":e,A);import{o as ce,p as le,e as _,a as C,k as n,q as p,r as I,s as d,t as oe,u as re,v as S,w as l,x as B,n as K,y as M,z as R,l as q,A as $,B as de}from"./vendor-DBPU9Icq.js";import{B as he,M as we,a as ge,O as k,E as U,b as ue,G as pe,L as G,R as ee,S as Be,U as N,c as Ee,d as Ie,A as Ce,e as me}from"./game-core-_Xy6VLff.js";const ye={duration:1e3,delay:0};class g{static callAfterDelay(e,A,t){e.actions.delay(A).callMethod(t)}static callAfterFrame(e,A){e.actions.delay(100).callMethod(A)}static async particlesAddDustAsync(e,A){e.actions.callMethod(async()=>{const t=new ce({});t.emitterType=le.Circle,t.radius=5,t.minVel=100,t.maxVel=200,t.minAngle=0,t.maxAngle=Math.PI*2,t.emitRate=300,t.opacity=.5,t.fadeFlag=!0,t.particleLife=100,t.maxSize=10,t.minSize=1,t.color=_.Rose,t.isEmitting=!0,t.pos=new C(0,40),t.particleLife,e.addChild(t),await g.awaitTimeAsync(A),t.kill()}).delay(1e3)}static async cameraShakeAsync(e,A){switch(A){case 0:e.currentScene.camera.shake(.5,.5,50),e.currentScene.camera.zoom;break;case 1:e.currentScene.camera.shake(5,5,50);break;case 2:e.currentScene.camera.shake(15,15,50);break}}static async awaitNextFrameAsync(){await g.awaitTimeAsync(1e3/30)}static async awaitTimeAsync(e){await new Promise(A=>setTimeout(A,e))}static async scaleUpAndFadeUpAsync(e,A){A={...ye,...A},e.actions.clearActions(),e.scale=n(0,0),e.graphics.opacity=0,await g.awaitTimeAsync(A.delay);const t=new p(e,w=>{w.scaleTo(n(1,1),n(3,3))}),s=new p(e,w=>{w.fade(1,A.duration)}),a=new I([t,s]);await e.actions.runAction(a)}static async scaleDownAndFadeDownAsync(e){e.actions.clearActions();const A=new p(e,a=>{a.scaleTo(n(0,0),n(2,2))}),t=new p(e,a=>{a.fade(0,100)}),s=new I([A,t]);await e.actions.runAction(s)}static async scaleUpAndDownAsync(e){e.actions.clearActions();const A=new p(e,s=>{s.scaleTo(n(1.2,1.2),n(2,2)),s.scaleTo(n(1,1),n(2,2))}),t=new I([A]);await e.actions.runAction(t)}static async scaleDownAndUpAsync(e){e.actions.clearActions();const A=new p(e,s=>{s.scaleTo(n(.7,.7),n(4,4)),s.scaleTo(n(1,1),n(4,4))}),t=new I([A]);await e.actions.runAction(t)}}class Qe extends he{constructor(A){super();i(this,"_ui");this._ui=new we(A)}set score(A){const t=A.toString().padStart(3,"0");this._ui.scoreText=`Score: ${t}​`}set lives(A){A=Math.max(0,A);const t="❤️",s="🖤",a=3,w=t.repeat(A),f=s.repeat(Math.max(0,a-A)),b=w+f;this._ui.livesText=`Lives: ${b}`}onInitialize(){this.addChild(this._ui),this._ui.buttonsText="⬅️⬆️​​➡️​🟦​, F, R​"}}class fe extends ge{constructor(){super(...arguments);i(this,"_score",new k(0));i(this,"_lives",new k(0))}get score(){return this._score}get lives(){return this._lives}async initializeAsync(){await super.initializeAsync(),this._score.value=0,this._lives.value=0,this._score.refreshValueChanged(),this._lives.refreshValueChanged()}}class be{constructor(){i(this,"_lastPointerDownTime",0);i(this,"_isPointerDown",!1);i(this,"_isPointerDoubleClick",!1);i(this,"actions");this.actions={left:{wasPressed:!1,isHeld:!1,wasReleased:!1},down:{wasPressed:!1,isHeld:!1,wasReleased:!1},right:{wasPressed:!1,isHeld:!1,wasReleased:!1},up:{wasPressed:!1,isHeld:!1,wasReleased:!1},action:{wasPressed:!1,isHeld:!1,wasReleased:!1},fullScreen:{wasPressed:!1,isHeld:!1,wasReleased:!1},resetGame:{wasPressed:!1,isHeld:!1,wasReleased:!1}},U.instance.input.pointers.primary.on("down",()=>{const e=Date.now();e-this._lastPointerDownTime<150&&(this._isPointerDoubleClick=!0),this._lastPointerDownTime=e,this._isPointerDown=!0}),U.instance.input.pointers.primary.on("up",()=>{this._isPointerDown=!1})}update(e,A){this.updateAction(e,"left",[d.A,d.Left]),this.updateAction(e,"right",[d.D,d.Right]),this.updateAction(e,"up",[d.W,d.Up]),this.updateAction(e,"down",[d.S,d.Down]),this.updateAction(e,"action",[d.Space,d.Enter]),this.updateAction(e,"fullScreen",[d.F]),this.updateAction(e,"resetGame",[d.R]),this.actions.action.isHeld=this.actions.action.wasPressed||this._isPointerDown,this.actions.action.wasPressed=this.actions.action.wasPressed||this._isPointerDown,this.actions.fullScreen.wasPressed=this.actions.fullScreen.wasPressed,this._isPointerDoubleClick=!1,this._isPointerDown=!1}updateAction(e,A,t){const s=e.input.keyboard;this.actions[A]={wasPressed:t.some(a=>s.wasPressed(a)),isHeld:t.some(a=>s.isHeld(a)),wasReleased:t.some(a=>s.wasReleased(a))}}}class De extends ue{constructor(){super();i(this,"input");this.input=new be}update(A,t){this.input.update(A,t)}get left(){return this.input.actions.left}get right(){return this.input.actions.right}get up(){return this.input.actions.up}get down(){return this.input.actions.down}get action(){return this.input.actions.action}get fullScreen(){return this.input.actions.fullScreen}get resetGame(){return this.input.actions.resetGame}}class ve extends pe{constructor(){console.log("retroFactor",G.RetroFactor);const A={canvasElementId:"excaliburjs-game-canvas",width:900/G.RetroFactor,height:1600/G.RetroFactor,displayMode:oe.FitContainer,maxFps:120,physics:{solver:re.Arcade},antialiasing:{pixelArtSampler:!0,nativeContextAntialiasing:!1,multiSampleAntialiasing:!0,filtering:S.Pixel,canvasImageRendering:"auto"},suppressPlayButton:!0};super(A);i(this,"_view");i(this,"_model");i(this,"_controller")}get model(){return this._model}get view(){return this._view}get controller(){return this._controller}async initializeAsync(){await super.initializeAsync(),this._model=new fe,await this._model.initializeAsync(),this._view=new Qe(this),await this._view.initializeAsync(),this.currentScene.add(this._view),this._model.score.onValueChanged.addEventListener(this.model_Score_onValueChanged.bind(this)),this._model.lives.onValueChanged.addEventListener(this.model_Lives_onValueChanged.bind(this)),this._controller=new De,await this._controller.initializeAsync(),await this._model.initializeAsync()}onPreUpdate(A,t){super.onPreUpdate(A,t),this.controller.update(A,t),this.controller.fullScreen.wasPressed&&(A.screen.isFullScreen?A.screen.exitFullScreen():A.screen.goFullScreen()),this.controller.resetGame.wasPressed&&console.log("todo: make reset")}checkGameOver(){}model_Score_onValueChanged(A,t){this._view.score=t,this.checkGameOver()}model_Lives_onValueChanged(A,t){this._view.lives=t,this.checkGameOver()}}const Z="/assets/Paddle01-CBu270WY.png",P="/assets/Ball01-Cy8AXPTx.png",T="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAACACAYAAAACsL4LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0YTE3OTkxNC1jN2VmLTRlYTItYWQ1NS1jYjc0MTkzYzIyY2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REMwQjI1NDQwNDM3MTFFOEFENUFDMDQzRTI1ODgzQjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REMwQjI1NDMwNDM3MTFFOEFENUFDMDQzRTI1ODgzQjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjUyNjVkOTEtOTNjNi00YjNiLWJiYzQtMTM4MWUxMGM4NjVmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRhMTc5OTE0LWM3ZWYtNGVhMi1hZDU1LWNiNzQxOTNjMjJjZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn7PIh8AAANESURBVHja7NhPThNRAMfxOpYmLFy4U5d6glkQDQuv4BG8ikfxKGwUSaODhaUCWrUNgSIhgKEipiaaGP902s40fe99Pqu2m5d5k/y+Sa89frL26t6tG3kDgGQ8XWsX2eHpRf62f1K4DoB0xn9ncJxnoy8iAJDW+I8+Zz9/FAGAdMb/twCIAEA64/9HAEQAII3x/2sARAAg/vH/ZwBEACDu8f9vAEQAIN7xHxsAEQCIc/xLBUAEAOIb/9IBEAGAuMZ/ogCIAEA84z9xAEQAII7xnyoAIgAQ/vhPHQARAAh7/GcKgAgAhDv+MwdABADCHP9KAiACAOGNf2UBEAGAsMa/0gCIAEA44195AEQAIIzxryUAIgCw+ONfWwBEAGCxx7/WAIgAwOKO/0iz7ocYRWCwM3h+/vVyySsFGO/Nfm+4Nzherfuc5jweZvvz2dLu6cWK1wpQwtmwPY9jMjcNkCYBABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABABAAVwAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgAgAAAIAAACAEC8mnM55fxo2Dg8aLtugBK+XQ6jCEDvoF/sbq2vNq6uvFSAsm7eKRqt5bzOI2r9C2g0/i+LZ7nxB5jQ0ae8cXFeBBkA4w+w2BGoJQDGH2DxI1B5AIw/QBgRqDQAxh8gnAhUFgDjDxBWBCoJgPEHCC8CMwfA+AOEGYGZAmD8AcKNwNQBMP4AYUdgqgAYf4DwIzBxAIw/QBwRmCgAxh8gngiUDoDxB4grAqUC8GH/Y9v4A8QVgbEB6Pa7LzY311eMP0BcEcjGjf/rzsYDtwkQXwQy4w+QZgQy4w+QZgQy4w+QZgQy4w+QZgR+BeB9v7th/AHSicCPAOz13hWdzsZ9twOQTgSut+4+fLS91c7dCkAivpzcbrSWi+8CDACKd319HqexWAAAAABJRU5ErkJggg==",Y="/assets/Tile02-TTYuOWn4.png",j="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAACACAYAAAACsL4LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0YTE3OTkxNC1jN2VmLTRlYTItYWQ1NS1jYjc0MTkzYzIyY2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDEzMEYzNjMwNDM3MTFFOEFENUFDMDQzRTI1ODgzQjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDEzMEYzNjIwNDM3MTFFOEFENUFDMDQzRTI1ODgzQjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjUyNjVkOTEtOTNjNi00YjNiLWJiYzQtMTM4MWUxMGM4NjVmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRhMTc5OTE0LWM3ZWYtNGVhMi1hZDU1LWNiNzQxOTNjMjJjZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppb+0VkAAAM6SURBVHja7NjNahNRAIZhHdJFETeu3Og9zKIovTfvyJUXoDXFokQ7itCd0iatSpXSEDWExEanICL+TH5mQs45z7NKsjnMGfheyNUHB/f2b2zezq8AkIyHL+4X2dfJeX427BauAyCd8T/tn+ZZ+UUEANIa//Jz9vNHEQBIZ/x/C4AIAKQz/n8EQAQA0hj/vwZABADiH/9/BkAEAOIe//8GQAQA4h3/ygCIAECc4z9TAEQAIL7xnzkAIgAQ1/jPFQARAIhn/OcOgAgAxDH+CwVABADCH/+FAyACAGGP/1IBEAGAcMd/6QCIAECY419LAEQAILzxry0AIgAQ1vjXGgARAAhn/GsPgAgAhDH+jQRABADWf/wbC4AIAKz3+DcaABEAWN/xL7WafogyAsNBf+/bxWjDKwWo1jvpjn+M/3bT57RW8TDno97GYHy25bUCVPt8Meqs4pzMVQOkSQAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAABMAVAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAAAgAAAIAgAAAEK/WKg7pfxyN330adFw3QLXJeDqOIgAnx++L9s7B9nTqpQLM6uat68XmtVbe5BmN/gVUjv+jnee58QeYz4feIB9+mRRBBsD4A6x3BBoJgPEHWP8I1B4A4w8QRgRqDYDxBwgnArUFwPgDhBWBWgJg/AHCi8DSATD+AGFGYKkAGH+AcCOwcACMP0DYEVgoAMYfIPwIzB0A4w8QRwTmCoDxB4gnAjMHwPgDxBWBmQLQPTruGH+AuCJQGYCjw97Tx+1iy/gDxBWBrGr827sv77pOgPgikBl/gDQjkBl/gDQjkBl/gDQjkBl/gDQjkP0a/+4z4w+QTgQuA/D2zWHR3n11x/UApBOBrBz/J3uvc9cCkFYEvgswAG3dtFXNRSXJAAAAAElFTkSuQmCC",m="/assets/Background02-C1FDw3ul.png",y="/assets/Hit01-BScFQpPY.wav",Q="/assets/Britanic-2j_r9DuK.ttf",h=new ee;h.add(Z,new l(Z));h.add(P,new l(P));h.add(T,new l(T));h.add(Y,new l(Y));h.add(j,new l(j));h.add(m,new l(m));h.add(y,new B(y));h.add(Q,new K(Q,"Britanic",{filtering:S.Pixel,size:18}));const r=h,Ge="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAB3RJTUUH6AceEhwdrvaJaQAAAlFJREFUWIXtlrGL2lAcxz9nM4QuHhUUpMZFbiyc5JycOrTdDurWv6FIp9sKBbdO5eg/0MXNgkvR5XC4oajoLkJJBCGCQ1rK5SQ0HeyLUZOnp271C+Lj8fI+37zf7/sIHPW/6+RQGzWqFW/Y7pMrnAPw6s37rfY+iIFGteKJ8bDd9+fffvq6cf/YIQwE4eZoAoA5mlDWdW/DI/sb+PzutSfgnfoYLZOkUx9j9VyAjSZ2LsHqsZujiQ+PJ+ZwNauiZZKYowkfa7ehLGUXSHBOKDgv4M9LLxm2+1g9l7Kue9fd7pqJSAPBo12F5ArnS/UOKpVX0DJpPw2DWxNQOCtq0O2urY80IIPkCvN/q+dycZn214jjnv+aOIaDmlUBh059HMrZ2IRWz106XjE2RxPiCdd/UzEH4BgOjuH4Y5lCDYjaR0Fuak0AzooaN7XmEmTx1gvZU8VvzFWFdmajWvEERBxr2MZBiQQAPsyeLir85cf3UNajsMknxq8Pyun8YfvnbwCUUwUtk2TQslFmM1zbRawBGLRs4gmXZy+eMjVtAO7vYlI4SHogWEchkXFxEmKNWKdmVb9c4u1lcJBcRFelordqwJ4q/2KWjOzqeMLdGg6SGGqZJJ3eOsTquVgh8wL8EDhsuIqvSsWle9wxnKXGkmlbA5E9ELyGRfbVrEoqPy9DPOGSys/NrEZsWzhEpADCkyDMDFo293cxlNkM9fGfreIWJelNKEvCxWV6bf1D4VID193uySHjFiVpR8mS8M2o7w2HHT5Iyrru7VPzo446alV/ATMJU0+aN75bAAAAAElFTkSuQmCC",H="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAB3RJTUUH6AceEhwmH/1gTQAABJdJREFUaIHtWUFrK1UU/qqzGHSRB4FEgpmglCwEhea9FBdZFZ6VbgbMzo1/QES6cCOC0N1bFHn4B9zUVR9kYenbvFVAaUO7thYlE+ijgSyiFobH+OJi/G7P3LkzudO0ipAPyp2Z3pn5zjnfOffMDbDEEkv8r7Gy6AO+/fyj2er6GgDgw4+/WpHXASAYjeHVK2p+MBoDAB7t9xd+N7CgAYd7OzMAOD86BY3gucTq+pq6dtYPAACPB4P/1oDDvZ0ZSZH8+dEpzvoBmh1PzaPHiXAYquPbMOJGD6DngbS3CUncq1fUuTQAWNyIV4recLi3M3u2/xRAmjxJHvcucHkS4fIkAnAtG5J3Gy7chntz1gKFDKDnN7qbRs/LZC2VI7T9GoCYcDgMMZ04C5E1wdoAKZssyERudrzEORAbNZ04ieh89uDBTI5FYa0/WS7Pj05T5ZHQk5YIhyHchovLkwilcpQ4nk4cNVZbTqESax0BSR6AkXwWcXlM8l69glI5Ss2/PIkKRWNhUR73LtQxNS/BZKXHqy0H4TBEgDhS0vsc3YYLDOzeX7gKmciXyjExXfNAOlLhMMTWto+N7qa6V45AHIVP3nrfKgrWBrB06uSB2ItevZKaA1znBL3PZx3s9lRVkiPn2MLaAHpMT9K78H7br6FUtouClblszEykWON14mf9QOmcmE4c1W6Y7mMOxNG1i4RVBKR3edz2a2j7NWx0N7G17SfmkyBrPVFtOamWgn0TR1NlyoNVvdW7TtMqTGKy78mD7n0J3fjvfvspk2ehKiQjEYzGRqI25HXoUcgzToeVAfJDhfDqlUQ+ZC1s4TA0/k82c2z2OAKwrkbWEaBsstpnHbrG5XX+mWCKQl41KtxKAElPUTIyB4BrD1NqkrRabQ046weYThy1NsyLRKEkBswROO5dqBJoeinLKsFeSF4j8lpuUzLPNYDkn+0/NWpZrsiyp6EUsr7E8ghLZ8hzkwFzJcQEluRX19cSVYi12224yvvBaJyQnS6ZZsfL9LZ+PS8qVqlO2VDLeqlkD8OeX5LN8rxsBLkquw0XG91NfP/lDza0AFgm8affPFGhMyVfqRwpAgT7nTxUW06i3TY9dx5enTvjH6xGr38dTSNE0wjOvevAvbP+Bn49vcJ7H7yJ6e9XivzBbg+//PizmjedOHBfe6nIXj1/CefFC7z9bg33H3bw159/4P7DjvJ+teXAuefg6nl8T9ZqbCUh/QuJFcRtuAhGY9GNxq3GwW4v9QzpzVhWcalknsh8qbYc61bCqox+0e3MKJG8ZX5r21fkZeIxseU6QKOaHQ/HvQu0/Vqios0jTljlwKP9/gpfyiRlFWl2POM+T6kcKa9zEXMbriqzbb+GrW1fkb4JeWsD+ECvXlFelNLx6hWlex1p6SAhHdN7bMkDBbcWs3YLbiIdvbYXIS1R6CY2VabylrWiUuM6bkpYR+FdCbl1Qt3nrah3SR4ouC9UKkeJBiwuddmy0HGbxIlCEXg8GKywkuT1K9WWk5LZXZAHFviBQ//I0Bcf4O5ISyz0At2If4PwrcN2C3CJJZZYwoi/AXILu8sxhDv5AAAAAElFTkSuQmCC",F="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAB3RJTUUH6AceEiIIgu52/wAAAphJREFUSInNVkFLG0EYfbsUwpI2SAJig1Aqpbukh8KKJeAlBw146CEIhv4G6S0FL948lAZPnvwFpYL1sF5cE8wloSgGUohkgyQRZNVAlhANSy6ZHsJMZ9ONXUogfafZb3be+94337cs4BFaSidu67FAS+kkNr/KSGPzq8SriDjWTP5FQEvp5DCrYXO6z2Kb030cZjVPpZqsA5r92sw1osk4i0eTcazNXHty4dnB/eml6/pvGCmgpXRSKBTY87N3r1zXhULhUReTccBnH5RC2LudRbleY/vleg17t7MISiEAj7twFdg+2YVlt2DZLRbbuHpwXdP3tk92vTnQUjqR+2EUexUYoukQya4kSHYlwTK17BYM0USxV4HcD7u6EIYDC5FlsjS1yIgN0UTX7uDzi6eIJuO4P71EuV7DxtUD/FIAcj8MYFDKTDuPs4tjB6fDQbXRJKpPYQeCUogRUHIAePNyDgAg98PsPQBQfQqqjabDhciTG8bNn0XkUK7XHJftBsO4cYg84Tcr1dGHf3zTWeaPiVSqNcjyc/YsDmdf7FVcD/KfCio0DHqWdyHSAAA070zQO8i088i08whKIag+BbEv39kEv8/9hOpT2MVm2nkAgzto3pngOVmJ+PJk2nmH0NLUIlQMRCgRJeffo+tKtQbl9dzvElHy9Na6YIgm/FKAdYZfCrB+V30KVJ/C5sMvBQAMOs4vBWCIJtJb6wLPybro08eEAAC5832ha3dg2S3WpnSQ+NblY5bdQtfuIHe+L/BcjhLxOLs4FhABUaGwzCkRzZjuyfbgcocHjMI1SLEQWSZ8zYMf3gIArK8lWHaLdc0ock+oNppEOyqR9M4BG570zgHRjkpkeGpdHRAy3l+cYUz+t+W/F/gFlx9vuXFG0UoAAAAASUVORK5CYII=",W="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAB3RJTUUH6AceEiIQkYLuqQAAAc5JREFUSInNlr9rFEEUxz975DCcWUSQPQSJl2JtttgDrUS2SXMcFkkglWyZIn+AaVKnsrNNrYWCe4VYaJ/KwoQsBAe5QyJiEAIuLAtbPItjl7nkTmcgB3nN7JuZ7/u+n8uAhUgUi0Sx2GAWbC6no6HNdQAa1oh5EUgUiyoyVJFhk6a5R2Bcg3Q0RJV5/W0qxhEEnRX8Zgu/2SLorFw9wVxFolgSL5Tei2N5uP1KEi80ngejCAYnR6gyZ28r4NHGY1SZMzg5MnLOiECVOavDr7z9Cbfvdfj25mNd8P+JURf5zRYAX96nANzv3qz3roQAYHc/pfs0AODTy9f0DHHGKdrbCmq9qoMRwcVueH6rM6FLFEvfbfP9QZfNu3B+OqL3bI2+2770y5iGbehTubZ4R/QVmOiW3f2Uz+8OmHY2DZuOhjjHy09m9vOH7Nd4ehddAFSRAUzoqszpu+1ZJsZFrgzBON96h6gyrw1Wq36mE+vYingBYOdcOVV4/o0lDv78YFD8dipDfrMll4wXWY2bhe27bWlU7EB9oBvXPf3X3jSsKjIcDCXxQtFzv352aIQ1HjTdY9MZsJbECyXxQqtXxdxT5IhYOWQt1+fZcm0J/gLZIuNghhtizgAAAABJRU5ErkJggg==",x="/assets/Background01-Bfgl5WSZ.png",V="/assets/Background03-CvnV8plf.png",O="data:image/png;base64,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",L="/assets/Shoot01-C3uAXra4.wav",J="/assets/Shoot02-feqa8JwR.wav",X="/assets/Hit02-D7Q-SvHj.wav",o=new ee;o.add("Asteroid01",new l(Ge));o.add(H,new l(H));o.add(F,new l(F));o.add(W,new l(W));o.add(x,new l(x));o.add(m,new l(m));o.add(V,new l(V));o.add(O,new l(O));o.add(L,new B(L));o.add(J,new B(J));o.add(y,new B(y));o.add(X,new B(X));o.add(Q,new K(Q,"Britanic",{filtering:S.Pixel,size:18}));const He=o,Se=M.create("player"),Ae=M.create("bullet"),te=M.create("asteroid"),Me=R.collidesWith([]),Re=R.collidesWith([te]),ze=R.collidesWith([Ae]),ke={Player:Me,Bullet:Re,Asteroid:ze,PlayerGroup:Se,BulletGroup:Ae,AsteroidGroup:te};class Ue extends q{constructor(){super({collisionType:$.Active,collisionGroup:ke.Player});i(this,"_moveSpeed",100);i(this,"shadowVisible",!0);i(this,"_shadowTintCache");i(this,"_shadowTint",new _(0,0,0,.2));i(this,"_shadowOffset",n(3,3));i(this,"_flipHorizontal",!1)}onInitialize(){let A=r.get("Paddle01").toSprite();A=Be.resizeSpriteWithin(A,100,50),this.graphics.use(A),this.collider.set(new de({radius:Math.max(A.width,A.height)/2})),this.graphics.onPreDraw=t=>{if(!(!this.shadowVisible||!this.graphics)){this._shadowTintCache=t.tint,t.tint=this._shadowTint;for(const s of Object.values(this.graphics.graphics))s.draw(t,-s.width*this.anchor.x+this._shadowOffset.x,-s.height*this.anchor.y+this._shadowOffset.y);t.tint=this._shadowTintCache}}}async move(A,t,s){s=s.scale(this._moveSpeed*(t/1e3)),this.pos=this.pos.add(s),s.x!==0&&(this._flipHorizontal=s.x>0,this.graphics.flipHorizontal=this._flipHorizontal),await g.scaleDownAndUpAsync(this),await g.awaitTimeAsync(200)}}const Ne={imageSource:r.get("Tile01"),anchor:n(.5,.5),layoutConfiguration:{sizeLayoutConfiguration:{width:{value:10,unit:N.Percent},height:{value:10,unit:N.Percent},relativeTo:Ee.Screen,scaleAspectRatio:Ie.PrioritizeWidth}}};class Ze extends Ce{constructor(e){e={...Ne,...e},super(e),this.on("pointerup",A=>{console.log("click me: "+this.pos.x),this.kill()})}onInitialize(){const e=this._configuration.imageSource.toSprite();e.scale=this.layoutEngine.getCalculatedScale(this.configuration.imageSource),this.graphics.add(e)}onPreUpdate(e,A){}}class Pe extends q{constructor(e){super({width:e.width,height:e.height,collisionType:$.PreventCollision})}onInitialize(e){this.addTiles(e)}addTiles(e){const A=[r.get("Tile01"),r.get("Tile02"),r.get("Tile03")],t=e.screen.drawWidth,s=e.screen.drawHeight,a=.3,w=t*a,f=t*(1-a),b=s*.2,se=s*.5;let E=w,D=b,u,v=0;for(;D<=se;){for(;E<=f;){v=v+1;const ie=A[Math.floor(Math.random()*A.length)];u=new Ze({imageSource:ie}),u.pos=new C(E,D),this.addChild(u),E+=u.width;const z=u;u.graphics.opacity=0,g.callAfterFrame(z,this.tileEntrance.bind(this,z,v))}E=w,D+=u.width/(384/128)}}async tileEntrance(e,A){await g.scaleUpAndFadeUpAsync(e,{duration:100,delay:3*A})}}class Fe extends ve{constructor(){super();i(this,"_player");i(this,"_background");i(this,"_tileLevel")}async initializeAsync(){if(this.isInitialized)return Promise.resolve();await r.initializeAsync(),this.start(r.loader),await super.initializeAsync(),this.initializeBackground(),this.initializeLevel(),this.initializePlayer(),this.model.score.value=0,this.model.lives.value=3}onPreUpdate(A,t){super.onPreUpdate(A,t),this.handlePlayerInput(A,t)}checkGameOver(){this.model.lives.value<=0&&(this.model.lives.value=0,console.log("Gameover"))}initializeBackground(){this._background=new me({imageSource:r.get("Background02")}),this.currentScene.add(this._background)}initializeLevel(){this._tileLevel=new Pe({width:this.screen.resolution.width,height:this.screen.resolution.height}),this.currentScene.add(this._tileLevel)}initializePlayer(){this._player=new Ue,this._player.pos.x=this.screen.resolution.width/2,this._player.pos.y=this.screen.resolution.height-100,this.currentScene.add(this._player)}handlePlayerInput(A,t){(this.controller.left.wasPressed||this.controller.right.wasPressed)&&r.get("Hit01").play(),(this.controller.left.wasReleased||this.controller.right.wasReleased)&&r.get("Hit01").play(),this.controller.left.isHeld?(this._player.move(A,t,new C(-1,0)),this.model.score.value+=1):this.controller.right.isHeld&&(this._player.move(A,t,new C(1,0)),this.model.score.value+=1),this.controller.action.wasPressed&&r.get("Hit01").play()}}export{Fe as B,g as M,He as a};
