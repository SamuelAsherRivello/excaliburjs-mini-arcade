var U=Object.defineProperty;var O=(a,t,e)=>t in a?U(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var o=(a,t,e)=>O(a,typeof t!="symbol"?t+"":t,e);import{b as H,u as T,v as P,w as S,x as W,o as u,y as N,f as K,z as q,A as n,B as j,C as Y,h as J,c as Q,D as X,E as Z,F as A,d as _,G as ee}from"./vendor-D0tLigUK.js";import{S as te,K as z,B as G,H as I,M as m,E as h,U as g,R as k,a as se,A as ie,b as ae,O as y,c as oe,d as re,e as ne,G as le,L as x,f as ce}from"./game-core-APmSXdAv.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const w=new te;w.add(z,new H(z));w.add(G,new H(G));w.add(I,new T(I));const l=w,ue=P.create("player"),V=P.create("bullet"),B=P.create("asteroid"),de=S.collidesWith([]),he=S.collidesWith([B]),pe=S.collidesWith([V]),_e={Player:de,Bullet:he,Asteroid:pe,PlayerGroup:ue,BulletGroup:V,AsteroidGroup:B},ge={duration:1e3,delay:0,directionRadians:0};class b{static async particlesAddDustAsync(t,e){e={...ge,...e};const s=new W({});return s.pos=t.pos,s.radius=5,s.emitRate=300,s.particleLife=100,s.color=u.White,s.opacity=.2,s.emitterType=N.Circle,s.minSize=5,s.maxSize=20,s.minVel=50,s.maxVel=100,s.minAngle=0,s.maxAngle=Math.PI,s.fadeFlag=!0,s.isEmitting=!0,b.getParticleParent().add(s),await m.awaitTimeAsync(e.duration),s.kill(),Promise.resolve()}static getParticleParent(){return h.instance}}const F={},D={...F,outlineColor:new u(0,0,0,.8),outlineThickness:1},M={...F,shadowColor:new u(0,0,0,.5),shadowOffset:[1,1],shadowBlur:1};class me{static getMaterial_Outline(t=D){t={...D,...t};const e=t.outlineColor||u.Black,i=`#version 300 es
      precision mediump float;

      uniform sampler2D u_graphic;

      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 texSize = vec2(textureSize(u_graphic, 0));
        vec2 uv = v_uv;
        float thickness = ${(t.outlineThickness||2).toFixed(1)};

        vec4 outlineColor = vec4(${e.r}, ${e.g}, ${e.b}, ${e.a});
        vec4 texColor = texture(u_graphic, uv);

        float outline = 0.0;
        for (float y = -thickness; y <= thickness; y += 1.0) {
          for (float x = -thickness; x <= thickness; x += 1.0) {
            vec2 sampleUV = uv + vec2(x, y) / texSize;
            outline = max(outline, texture(u_graphic, sampleUV).a);
          }
        }

        outline = outline - texColor.a;
        vec4 outlineResult = mix(texColor, outlineColor, outline);
        fragColor = outlineResult;
      }
    `;return h.instance.graphicsContext.createMaterial({name:"outline",fragmentSource:i})}static getMaterial_DropShadow(t=M){t={...M,...t};const e=t.shadowColor||u.fromHex("#00000080"),s=t.shadowOffset||[4,4],i=t.shadowBlur||4,r=`#version 300 es
      precision mediump float;

      uniform sampler2D u_graphic;
      uniform vec2 u_resolution;

      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 texSize = vec2(textureSize(u_graphic, 0));
        vec2 uv = v_uv;
        vec2 offset = vec2(${s[0]}.0, ${s[1]}.0) / texSize;
        float blur = ${i.toFixed(1)};

        vec4 shadowColor = vec4(${e.r}, ${e.g}, ${e.b}, ${e.a});
        vec4 texColor = texture(u_graphic, uv);

        float shadow = 0.0;
        for (float y = -blur; y <= blur; y += 1.0) {
          for (float x = -blur; x <= blur; x += 1.0) {
            vec2 sampleUV = uv + offset + vec2(x, y) / texSize;
            shadow += texture(u_graphic, sampleUV).a;
          }
        }
        shadow /= (2.0 * blur + 1.0) * (2.0 * blur + 1.0);

        vec4 shadowResult = mix(vec4(0.0), shadowColor, shadow);
        fragColor = mix(shadowResult, texColor, texColor.a);
      }
    `;return h.instance.graphicsContext.createMaterial({name:"dropshadow",fragmentSource:r})}}const R={collisionType:K.Passive,collisionGroup:_e.Player,imageSource:l.get("KnightStatic01"),layoutConfiguration:{sizeLayoutConfiguration:{width:{value:30,unit:g.Percent},height:{value:30,unit:g.Percent},relativeTo:k.Screen,scaleAspectRatio:se.PrioritizeHeight},positionLayoutConfiguration:{x:{value:50,unit:g.Percent},y:{value:50,unit:g.Percent},relativeTo:k.Screen}}};class fe extends ie{constructor(e=R){e={...R,...e};super(e);o(this,"_moveSpeed",1e3);o(this,"_flipHorizontal",!1)}onInitialize(){const e=this.configuration.imageSource.toSprite();e.scale=this.layoutEngine.getCalculatedScale(this.configuration.imageSource),this.graphics.add(e),this.graphics.material=me.getMaterial_DropShadow(),this.collider.set(new q({radius:Math.max(e.width/2,e.height/2)}))}async move(e,s,i){i=i.scale(this._moveSpeed*(s/1e3)),this.pos=this.pos.add(i),i.x!==0&&(this._flipHorizontal=i.x>0,this.graphics.flipHorizontal=this._flipHorizontal),m.clearActions(this),m.scaleDownAndUpAsync(this),b.particlesAddDustAsync(this,{duration:100})}}var E=(a=>(a[a.None=0]="None",a[a.GameInitialized=1]="GameInitialized",a[a.GameRunning=2]="GameRunning",a[a.GameEnded=3]="GameEnded",a))(E||{});class we extends ae{constructor(){super(...arguments);o(this,"_score",new y(0));o(this,"_lives",new y(0));o(this,"_gameState",new y(0))}get score(){return this._score}get lives(){return this._lives}get gameState(){return this._gameState}async initializeAsync(){await super.initializeAsync(),this._score.value=-1,this._lives.value=-1,this._score.refreshValueChanged(),this._lives.refreshValueChanged()}}class ve extends oe{constructor(e){super();o(this,"_ui");this._ui=new re(e)}set score(e){const s=e.toString().padStart(3,"0");this._ui.textUpperLeft=`Score: ${s}​`}set lives(e){e=Math.max(0,e);const s="❤️",i="🖤",r=3,d=s.repeat(e),v=i.repeat(Math.max(0,r-e)),$=d+v;this._ui.textUpperRight=`Lives: ${$}`}set buttons(e){this._ui.textLowerLeft=e}set status(e){this._ui.textCenter=e}async initializeAsync(){super.initializeAsync(),this.buttons="⬅️⬆️​​➡️​🟦​, F, R​",this.status=""}onInitialize(){this.addChild(this._ui)}}class ye{constructor(){o(this,"_lastPointerDownTime",0);o(this,"_isPointerDown",!1);o(this,"_isPointerDoubleClick",!1);o(this,"actions");this.actions={left:{wasPressed:!1,isHeld:!1,wasReleased:!1},down:{wasPressed:!1,isHeld:!1,wasReleased:!1},right:{wasPressed:!1,isHeld:!1,wasReleased:!1},up:{wasPressed:!1,isHeld:!1,wasReleased:!1},action:{wasPressed:!1,isHeld:!1,wasReleased:!1},fullScreen:{wasPressed:!1,isHeld:!1,wasReleased:!1},resetGame:{wasPressed:!1,isHeld:!1,wasReleased:!1}},h.instance.input.pointers.primary.on("down",()=>{const t=Date.now();t-this._lastPointerDownTime<150&&(this._isPointerDoubleClick=!0),this._lastPointerDownTime=t,this._isPointerDown=!0}),h.instance.input.pointers.primary.on("up",()=>{this._isPointerDown=!1})}update(t,e){this.updateAction(t,"left",[n.A,n.Left]),this.updateAction(t,"right",[n.D,n.Right]),this.updateAction(t,"up",[n.W,n.Up]),this.updateAction(t,"down",[n.S,n.Down]),this.updateAction(t,"action",[n.Space,n.Enter]),this.updateAction(t,"fullScreen",[n.F]),this.updateAction(t,"resetGame",[n.R]),this.actions.action.isHeld=this.actions.action.wasPressed||this._isPointerDown,this.actions.action.wasPressed=this.actions.action.wasPressed||this._isPointerDown,this.actions.fullScreen.wasPressed=this.actions.fullScreen.wasPressed,this._isPointerDoubleClick=!1,this._isPointerDown=!1}updateAction(t,e,s){const i=t.input.keyboard;this.actions[e]={wasPressed:s.some(r=>i.wasPressed(r)),isHeld:s.some(r=>i.isHeld(r)),wasReleased:s.some(r=>i.wasReleased(r))}}}class xe extends ne{constructor(){super();o(this,"input");this.input=new ye}update(e,s){this.input.update(e,s)}get left(){return this.input.actions.left}get right(){return this.input.actions.right}get up(){return this.input.actions.up}get down(){return this.input.actions.down}get action(){return this.input.actions.action}get fullScreen(){return this.input.actions.fullScreen}get resetGame(){return this.input.actions.resetGame}}const f=class f extends le{constructor(){console.log("retroFactor",x.RetroFactor);const e={canvasElementId:"excaliburjs-game-canvas",width:900/x.RetroFactor,height:1600/x.RetroFactor,displayMode:j.FitContainer,fixedUpdateFps:30,maxFps:120,physics:{enabled:!0,solver:Y.Realistic,gravity:J(0,f.GravityY)},antialiasing:{pixelArtSampler:!0,nativeContextAntialiasing:!1,multiSampleAntialiasing:!0,filtering:Q.Pixel,canvasImageRendering:"auto"},suppressPlayButton:!0};super(e);o(this,"_view");o(this,"_model");o(this,"_controller")}get model(){return this._model}get view(){return this._view}get controller(){return this._controller}async initializeAsync(){await super.initializeAsync(),this._view=new ve(this),await this._view.initializeAsync(),this.currentScene.add(this._view),this._controller=new xe,await this._controller.initializeAsync(),this._model=new we,await this._model.initializeAsync(),this._model.score.onValueChanged.addEventListener(this.model_Score_onValueChanged.bind(this)),this._model.lives.onValueChanged.addEventListener(this.model_Lives_onValueChanged.bind(this)),this._model.gameState.onValueChanged.addEventListener(this.model_GameState_onValueChanged.bind(this))}onPreUpdate(e,s){super.onPreUpdate(e,s),this.controller.update(e,s),this.controller.fullScreen.wasPressed&&(e.screen.isFullScreen?e.screen.exitFullScreen():e.screen.goFullScreen()),this.controller.resetGame.wasPressed&&location.reload()}onModelChanged(){}model_Score_onValueChanged(e,s){this._view.score=s,this.onModelChanged()}model_Lives_onValueChanged(e,s){this._view.lives=s,this.onModelChanged()}model_GameState_onValueChanged(e,s){this.onModelChanged()}};o(f,"GravityY",1e3);let C=f;const p={},L={...p,pixelSize:4,colorLevels:5,scanlineIntensity:.1,bulgeIntensity:-.2};class Ce{static getPostProcessor_ColorBlindness(t=p){return t={...p,...t},new X(Z.Deuteranope,!0)}static getPostProcessor_GrayScale(t=p){return t={...p,...t},new class{constructor(){o(this,"_shader")}initialize(s){this._shader=new A(s,`#version 300 es
        precision mediump float;
        // our texture
        uniform sampler2D u_image;
        // the texCoords passed in from the vertex shader.
        in vec2 v_texcoord;
        out vec4 fragColor;
        void main() {
          vec4 tex = texture(u_image, v_texcoord);
          float avg = 0.2126 * tex.r + 0.7152 * tex.g + 0.0722 * tex.b;
          fragColor = vec4(avg, avg, avg, 1.0);
        }`)}getLayout(){return this._shader.getLayout()}getShader(){return this._shader.getShader()}}}static getPostProcessor_Retro(t=L){t={...L,...t};const e=t.pixelSize||4,s=t.colorLevels||5,i=t.scanlineIntensity||.1,r=t.bulgeIntensity||.1;return new class{constructor(){o(this,"_shader")}initialize(v){this._shader=new A(v,`#version 300 es
        precision mediump float;
        uniform sampler2D u_image;
        uniform vec2 u_resolution;
        in vec2 v_texcoord;
        out vec4 fragColor;

        vec2 bulge(vec2 uv) {
          vec2 center = vec2(0.5, 0.5);
          vec2 d = uv - center;
          float r = length(d);
          float bulgeAmount = ${r};
          
          // Adjust the bulge function to be less pronounced near the edges
          float bulge = 1.0 + bulgeAmount * (1.0 - r * r);
          
          // Smoothstep to further reduce the effect near the edges
          float edgeFade = smoothstep(0.7, 0.0, r);
          bulge = mix(1.0, bulge, edgeFade);
          
          return center + d * bulge;
        }

        void main() {
          vec2 uv = v_texcoord;
          
          // Apply screen bulge
          uv = bulge(uv);
          
          // Pixelation
          vec2 pixels = vec2(${e}.0, ${e}.0);
          uv = floor(uv * u_resolution / pixels) * pixels / u_resolution;
          
          vec4 tex = texture(u_image, uv);
          
          // Color quantization
          float colorLevels = ${s}.0;
          tex = floor(tex * colorLevels) / colorLevels;
          
          // Scanline effect
          float scanline = sin(uv.y * u_resolution.y * 2.0) * ${i};
          tex.rgb -= scanline;

          fragColor = tex;
        }`)}getLayout(){return this._shader.getLayout()}getShader(){return this._shader.getShader()}}}}class Pe extends C{constructor(){super();o(this,"_player");o(this,"_background")}async initializeAsync(){if(this.isInitialized)return Promise.resolve();await l.initializeAsync(),this.start(l.loader),await super.initializeAsync(),this.initializeBackground(),this.initializePlayer(),this.model.score.value=0,this.model.lives.value=3,this.model.gameState.value=E.GameInitialized,Ce.getPostProcessor_GrayScale()}initializeBackground(){const e={imageSource:l.get("Background01"),isScrolling:!1};this._background=new ce(e),this.currentScene.add(this._background)}initializePlayer(){this._player=new fe,this.currentScene.add(this._player)}handlePlayerInput(e,s){this.controller.left.wasPressed?(this._player.move(e,s,new _(-1,0)),l.get("Hit01").play(),this.model.score.value+=1):this.controller.right.wasPressed?(this._player.move(e,s,new _(1,0)),l.get("Hit01").play(),this.model.score.value+=1):this.controller.up.wasPressed?(this._player.move(e,s,new _(0,-1)),l.get("Hit01").play(),this.model.score.value+=1):this.controller.down.wasPressed&&(this._player.move(e,s,new _(0,1)),l.get("Hit01").play(),this.model.score.value+=1),this.controller.action.wasPressed&&(l.get("Hit01").play(),this.model.lives.value-=1)}onPreUpdate(e,s){super.onPreUpdate(e,s),this.handlePlayerInput(e,s)}onModelChanged(){this.model.lives.value==0&&console.log("Gameover")}}class Se{constructor(){o(this,"_isInitialized",!1);o(this,"_gameIndex",0);o(this,"_gameCurrent");o(this,"_games",[])}get isInitialized(){return this._isInitialized}get gameCount(){return this._games.length}get gameCurrent(){return this._gameCurrent}requireIsInitialized(){throw new Error("Method not implemented.")}async initializeAsync(){}addGame(t){this._games.push(t)}async showNextGameAsync(){let t=this._gameIndex+1;t>=this._games.length&&(t=0),await this.loadGameAtIndexAsync(t)}async showPreviousGameAsync(){let t=this._gameIndex-1;t<0&&(t=this._games.length-1),await this.loadGameAtIndexAsync(t)}async showGameAtIndexAsync(t){await this.loadGameAtIndexAsync(t)}async loadGameAtIndexAsync(t){var i;let e=null;this._gameCurrent&&(console.log("Warning: Disposing an existing game is not working!"),e=this._gameCurrent.canvas.cloneNode(),(i=this._gameCurrent)==null||i.dispose()),await m.awaitTimeAsync(200),e&&document.body.appendChild(e);const s=this._games[t];this._gameCurrent=new s,h.instance=this._gameCurrent,await this._gameCurrent.initializeAsync()}}const c=new Se;c.addGame(Pe);(async()=>{await c.initializeAsync();let a=Math.round(Math.random()*(c.gameCount-1));a=0,a=c.gameCount-1,await c.showGameAtIndexAsync(a);const t=new ee(c.gameCurrent);t.collider={showAll:!0,showBounds:!0,boundsColor:new u(0,255,0,.5),showOwner:!0,showGeometry:!0,geometryColor:new u(255,0,255,.5),geometryLineWidth:1,geometryPointSize:1},c.gameCurrent.debug=t})();
