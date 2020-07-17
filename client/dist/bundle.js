/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/common/entity.js":
/*!*********************************!*\
  !*** ./src/js/common/entity.js ***!
  \*********************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/**\n * Class for a game entity\n * (something that gets drawn to the screen, and can receive clicks)\n */\n\nclass Entity {\n    constructor() {\n        this.pos = {\n            x: 0,\n            y: 0\n        }\n        this.bounds = {\n            x: 0,\n            y: 0\n        }\n\n        this.rotation = 0;\n        this.children = [];\n\n        this.show();\n    }\n\n    // no-op in base class\n    onClick(pos) {}\n    render(ctx) {}\n\n    setPos(x, y) {\n        this.pos.x = x;\n        this.pos.y = y;\n    }\n\n    show() {\n        this.visible = true;\n        this.enabled = true;\n    }\n\n    hide() {\n        this.visible = false;\n        this.enabled = false;\n    }\n\n    // derives local click pos and passes event down to children\n    handleClickInternal(pos) {\n        if (!this.enabled || !this.visible) return;\n        \n        let localPos = {\n            x: pos.x - this.pos.x,\n            y: pos.y - this.pos.y\n        }\n\n        if ((localPos.x >= 0 && localPos.x < this.bounds.x) && \n            (localPos.y > 0 && localPos.y < this.bounds.y)) {\n                this.onClick(localPos);\n        }\n        this.children.forEach(c => {\n            c.handleClickInternal(localPos);\n        })\n    }\n\n    // handles local position and passes rendering down to children\n    _render(ctx) {\n        if (!this.visible) return;\n\n        ctx.save();\n        ctx.translate(this.pos.x, this.pos.y);\n        \n        this.render(ctx);\n\n        this.children.forEach(c => {\n            c._render(ctx);\n        });\n        ctx.restore();\n    }\n\n\n}\n\n//# sourceURL=webpack:///./src/js/common/entity.js?");

/***/ }),

/***/ "./src/js/common/utils.js":
/*!********************************!*\
  !*** ./src/js/common/utils.js ***!
  \********************************/
/*! exports provided: drawRoundedRect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawRoundedRect\", function() { return drawRoundedRect; });\nconst drawRoundedRect = (ctx, w, h, r) => {\n    ctx.beginPath();\n        \n    ctx.moveTo(r, 0);\n    ctx.lineTo(w-r, 0);\n    ctx.arcTo(w, 0, w, r, r);\n    ctx.lineTo(w, h-r);\n    ctx.arcTo(w, h, w-r, h, r);\n    ctx.lineTo(r,h);\n    ctx.arcTo(0, h, 0, h-r, r);\n    ctx.lineTo(0,r);\n    ctx.arcTo(0, 0, r, 0, r);\n\n    ctx.closePath();\n}\n\n//# sourceURL=webpack:///./src/js/common/utils.js?");

/***/ }),

/***/ "./src/js/dice/dice_data.js":
/*!**********************************!*\
  !*** ./src/js/dice/dice_data.js ***!
  \**********************************/
/*! exports provided: DiceData, DiceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DiceData\", function() { return DiceData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DiceManager\", function() { return DiceManager; });\nclass DiceData {\n    constructor(sides) {\n        this.numSides = sides;\n        this.values = [];\n        this.setAscending();\n        this.print();\n    }\n\n    setAscending() {\n        this.values = Array.from(Array(this.numSides).keys()).map( v => v + 1);\n    }\n\n    setConstant(n) {\n        this.values = this.values.fill(n);\n    }\n\n    print() {\n        let s = this.values.join(' ');\n        console.log(this.numSides, s);\n    }\n\n}\n\nclass DiceManager {\n    constructor(numDice, sides) {\n        this.numDice = numDice;\n        this.dice = [];\n        for (let i=0; i < numDice; i++) {\n            this.dice[i] = new DiceData(sides);\n        }\n    }\n\n    getDie(index) {\n        if (index < 0 || index >= this.dice.length) return null;\n        return this.dice[index];\n    }\n}\n\n//# sourceURL=webpack:///./src/js/dice/dice_data.js?");

/***/ }),

/***/ "./src/js/dice/dice_panel.js":
/*!***********************************!*\
  !*** ./src/js/dice/dice_panel.js ***!
  \***********************************/
/*! exports provided: DicePanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DicePanel\", function() { return DicePanel; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/styles */ \"./src/js/ui/styles.js\");\n/* harmony import */ var _single_die_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./single_die_panel */ \"./src/js/dice/single_die_panel.js\");\n\n\n\n\nclass DicePanel extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(gr, diceData) {\n        super();\n        this.registry = gr;\n\n        this.setupDiceDisplays();\n    }\n\n    setupDiceDisplays() {\n        const { diceManager } = this.registry;\n\n        const offsetY = _ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"].dieSize + (_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"].dieSeparation * 3);\n\n        diceManager.dice.forEach((diceData, i) => {\n            const diePanel = new _single_die_panel__WEBPACK_IMPORTED_MODULE_2__[\"SingleDiePanel\"](diceData);\n            diePanel.setPos(0, (i * offsetY));\n            this.children.push(diePanel);\n        });\n    }\n\n    render(ctx) {\n        // draw a panel per die\n        \n    }\n}\n\n//# sourceURL=webpack:///./src/js/dice/dice_panel.js?");

/***/ }),

/***/ "./src/js/dice/single_die_panel.js":
/*!*****************************************!*\
  !*** ./src/js/dice/single_die_panel.js ***!
  \*****************************************/
/*! exports provided: SingleDiePanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SingleDiePanel\", function() { return SingleDiePanel; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/styles */ \"./src/js/ui/styles.js\");\n\n\n\nclass SingleDiePanel extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(diceData) {\n        super();\n        this.diceData = diceData;\n\n        this.bounds.x = (this.diceData.numSides * (_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"].dieSize + _ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"].dieSeparation));\n        this.bounds.y = _ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"].dieSize + (_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"].dieSeparation * 2);\n\n        console.log(this.bounds);\n    }\n\n    // maybe alter pips\n    onClick(pos) {\n        console.log('clicked on dice panel');\n    }\n\n    drawFace(ctx, n) {\n        const { dieSize, dieSeparation } = _ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"]; \n\n        ctx.save();\n\n        ctx.strokeRect(0, 0, dieSize, dieSize);\n\n        ctx.fillStyle = '#000';\n        ctx.translate(dieSize/2, dieSize/2);\n        \n        ctx.fillText(`${n}`, 0, 0);\n\n\n        ctx.restore();\n    }\n\n    drawFaces(ctx) {\n        const { dieSize, dieSeparation } = _ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"Dimensions\"]; \n\n        ctx.save();\n\n        ctx.translate(dieSeparation/2, dieSeparation);\n        this.diceData.values.forEach(v => {\n            this.drawFace(ctx, v);\n            ctx.translate(dieSize + dieSeparation, 0);\n        });\n        ctx.restore();\n    }\n\n\n    render(ctx) {\n        ctx.save();\n\n        ctx.strokeRect(0, 0, this.bounds.x, this.bounds.y);\n\n        this.drawFaces(ctx);\n\n        ctx.restore();\n    }\n}\n\n//# sourceURL=webpack:///./src/js/dice/single_die_panel.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/*! exports provided: DicelabClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DicelabClient\", function() { return DicelabClient; });\n/* harmony import */ var _game_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_registry */ \"./src/js/game_registry.js\");\n/* harmony import */ var _game_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_data */ \"./src/js/game_data.js\");\n/* harmony import */ var _ui_game_screen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/game_screen */ \"./src/js/ui/game_screen.js\");\n/* harmony import */ var _ui_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/styles */ \"./src/js/ui/styles.js\");\n/* harmony import */ var _ui_toast_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/toast_manager */ \"./src/js/ui/toast_manager.js\");\n/* harmony import */ var _dice_dice_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dice/dice_data */ \"./src/js/dice/dice_data.js\");\n\n\n\n\n\n\n\n/**\n * DicelabClient: main game class\n */\n\nclass DicelabClient {\n\n    constructor(stageId) {\n        let mainScreen = null;\n        \n        this.initCanvas(stageId);\n\n        this.gameRegistry = new _game_registry__WEBPACK_IMPORTED_MODULE_0__[\"GameRegistry\"]();\n        \n        this.children = [];\n\n        document.onmousedown = this.mouseDown.bind(this);\n\n        this.startGame();\n        this.update();\n    }\n\n    initCanvas(stageId) {\n        this.canvasEl = document.getElementById(stageId);\n        this.ctx = this.canvasEl.getContext('2d');\n\n        this.bounds = {\n            width: this.canvasEl.clientWidth,\n            height: this.canvasEl.clientHeight,\n        }\n\n        this.pos = {\n            x: this.canvasEl.offsetLeft,\n            y: this.canvasEl.offsetTop\n        };\n    }\n\n    mouseDown(evt) {\n        let localPos = {\n            x: evt.clientX - this.pos.x,\n            y: evt.clientY - this.pos.y            \n        }\n        this.children.forEach(c => {\n            c.handleClickInternal(localPos);\n        })\n\n    }\n\n    initTimers() {\n        this.lastTime = Date.now();\n        this.tickTimer = 0;\n\n    }\n\n    startGame() {\n        /*\n        const { \n            gameData,\n            businessLookup,\n            achievements,\n            playerStorage,\n            upgrades\n        } = this.gameRegistry;\n        */\n\n        this.gameRegistry.diceManager = new _dice_dice_data__WEBPACK_IMPORTED_MODULE_5__[\"DiceManager\"](2, 6);\n\n        this.mainScreen = new _ui_game_screen__WEBPACK_IMPORTED_MODULE_2__[\"GameScreen\"](this.gameRegistry);\n        this.children.push(this.mainScreen);\n\n        // put toasts on top of everything else\n        this.gameRegistry.toasts = new _ui_toast_manager__WEBPACK_IMPORTED_MODULE_4__[\"ToastManager\"](this.gameRegistry);\n        this.gameRegistry.toasts.setPos(0, 0);\n        this.mainScreen.children.push(this.gameRegistry.toasts);\n\n    }\n\n    /**\n     * render loop\n     */\n    render(dt) {\n        let ctx = this.ctx;\n        let { width, height } = this.bounds;        \n\n        ctx.clearRect(0, 0, width, height);\n        ctx.save();\n\n        ctx.save();\n        ctx.fillStyle = _ui_styles__WEBPACK_IMPORTED_MODULE_3__[\"Colors\"].backColorMain; // '#ffcb74';\n        ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);\n        ctx.restore();\n\n        if (this.mainScreen) {\n            this.mainScreen._render(ctx);\n        } else {\n            ctx.save();\n            ctx.translate(width/2, height/2);\n            ctx.fillText('loading', 0, 0);\n            ctx.restore();\n        }\n\n        ctx.restore();\n    }\n\n    update() {\n        let curr = Date.now();\n        let deltaTime = curr - this.lastTime;\n        this.lastTime = curr;\n\n        this.render(deltaTime);\n\n        requestAnimationFrame(this.update.bind(this));\n    }\n\n}\n\n//# sourceURL=webpack:///./src/js/game.js?");

/***/ }),

/***/ "./src/js/game_data.js":
/*!*****************************!*\
  !*** ./src/js/game_data.js ***!
  \*****************************/
/*! exports provided: GameData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameData\", function() { return GameData; });\nconst SERVER_URL_DEV = 'http://localhost:8080';\nconst SERVER_URL = 'http://polar-earth-02456.herokuapp.com'\n\nclass GameData {\n    constructor() {\n        this.businessJSON = null;\n        this.achievementJSON = null;\n        this.upgradesJSON = null;\n\n        this.loaded = false;\n    }\n\n    getFromServer(callback) {\n        fetch(`${SERVER_URL}/gamedata`).then(res => {\n            res.json().then(resJSON => {\n                this.businessJSON = resJSON.businesses;\n                this.achievementJSON = resJSON.achievements;\n                this.upgradesJSON = resJSON.upgrades;\n\n                this.loaded = true;\n                callback();\n            });\n        });\n    }\n}\n\n//# sourceURL=webpack:///./src/js/game_data.js?");

/***/ }),

/***/ "./src/js/game_registry.js":
/*!*********************************!*\
  !*** ./src/js/game_registry.js ***!
  \*********************************/
/*! exports provided: GameRegistry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameRegistry\", function() { return GameRegistry; });\nclass GameRegistry {\n    constructor() {\n        // sides slider\n        this.sidesUI = null;\n\n        // dice data manager\n        this.diceManager = null;\n\n        this.dicePanel = null;\n\n    }\n}\n\n//# sourceURL=webpack:///./src/js/game_registry.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\n\n\nlet client = new _game__WEBPACK_IMPORTED_MODULE_0__[\"DicelabClient\"]('stage');\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/ui/button.js":
/*!*****************************!*\
  !*** ./src/js/ui/button.js ***!
  \*****************************/
/*! exports provided: ButtonDefaultStyle, Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ButtonDefaultStyle\", function() { return ButtonDefaultStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Button\", function() { return Button; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ \"./src/js/common/utils.js\");\n\n\n\nconst ButtonDefaultStyle = {\n    radius: 10,\n    fill: '#AFA',\n    disabledColor: '#AAA',\n    strokeColor: '#000',\n    strokeColorDisabled: '#000',\n    border: 3,    \n}\n\nclass Button extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(params) {\n        super();\n        this.bounds.x = params.width || 50;\n        this.bounds.y = params.height || 50;\n        this.callback = params.callback || null;\n        this.label = params.label || 'foo';\n\n        this.radius = params.radius || ButtonDefaultStyle.radius;\n        this.backColor = params.fill || ButtonDefaultStyle.fill;\n        this.disabledColor = params.disabledColor || ButtonDefaultStyle.disabledColor;\n        this.strokeColor = params.stroke || ButtonDefaultStyle.strokeColor;\n        this.strokeColorDisabled = params.strokeDisabled || ButtonDefaultStyle.strokeColorDisabled;\n        this.border = params.border || ButtonDefaultStyle.border;\n\n        this.enabled = true;\n    }\n\n    onClick(pos) {\n        if (!this.enabled || !this.visible) return;\n\n        if (this.callback) {\n            this.callback();\n        }\n    }\n\n    drawButtonBack(ctx) {\n        let r = this.radius;\n        let w = this.bounds.x;\n        let h = this.bounds.y;\n\n        ctx.save();\n\n        ctx.fillStyle = (this.enabled) ? this.backColor : this.disabledColor;\n        ctx.strokeStyle = (this.enabled) ? this.strokeColor : this.strokeColorDisabled;\n        ctx.lineWidth = this.border;\n\n        Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__[\"drawRoundedRect\"])(ctx, w, h, r);\n\n        ctx.fill();\n        ctx.stroke();\n\n        ctx.restore();\n    }\n\n    render(ctx) {\n        let w = this.bounds.x;\n        let h = this.bounds.y;\n\n        this.drawButtonBack(ctx);\n\n        ctx.fillStyle = (this.enabled) ? this.strokeColor : this.strokeColorDisabled;\n\n        ctx.save();\n        ctx.textAlign = 'center';\n        ctx.translate(w/2, h/2);\n        ctx.font = '20px helvetica';\n        ctx.fillText(this.label, 0, 0);\n        ctx.restore();\n    }\n}\n\n//# sourceURL=webpack:///./src/js/ui/button.js?");

/***/ }),

/***/ "./src/js/ui/game_screen.js":
/*!**********************************!*\
  !*** ./src/js/ui/game_screen.js ***!
  \**********************************/
/*! exports provided: GameScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameScreen\", function() { return GameScreen; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _game_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game_registry */ \"./src/js/game_registry.js\");\n/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/button */ \"./src/js/ui/button.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles */ \"./src/js/ui/styles.js\");\n/* harmony import */ var _dice_dice_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dice/dice_panel */ \"./src/js/dice/dice_panel.js\");\n\n\n\n\n \n\nclass GameScreen extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(gr) {\n        super();\n        this.registry = gr;\n\n        this.init();\n    }\n\n    init() {\n        this.dicePanel = new _dice_dice_panel__WEBPACK_IMPORTED_MODULE_4__[\"DicePanel\"](this.registry);\n        this.dicePanel.setPos(10, 10);\n        this.children.push(this.dicePanel);\n       \n    }\n}\n\n//# sourceURL=webpack:///./src/js/ui/game_screen.js?");

/***/ }),

/***/ "./src/js/ui/styles.js":
/*!*****************************!*\
  !*** ./src/js/ui/styles.js ***!
  \*****************************/
/*! exports provided: Dimensions, Colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dimensions\", function() { return Dimensions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Colors\", function() { return Colors; });\nconst Dimensions = {\n    panelWidth: 500,\n    dieSize: 80,\n    dieSeparation: 10,\n    diePanelOffsetY: 90,\n}\n\nconst Colors = {\n    backColorMain: '#e8e4e1',\n    backColorOn: '#ec823a',\n    backColorOff: '#f9c49a',\n    borderColorMain: '#7c3c21',\n    backgroundBlue: '#12cad6',\n}\n\n//# sourceURL=webpack:///./src/js/ui/styles.js?");

/***/ }),

/***/ "./src/js/ui/toast.js":
/*!****************************!*\
  !*** ./src/js/ui/toast.js ***!
  \****************************/
/*! exports provided: ToastPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ToastPanel\", function() { return ToastPanel; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ \"./src/js/common/utils.js\");\n/* harmony import */ var _ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/styles */ \"./src/js/ui/styles.js\");\n\n\n\n\nconst WIDTH = 300;\nconst HEIGHT = 50;\n\nconst BACK_COLOR = '#AAA';\nconst EDGE_COLOR = '#000';\n\nclass ToastPanel extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(msg) {\n        super();\n        this.message = msg;\n\n        this.created = Date.now();\n    }\n\n    render(ctx) {\n        ctx.save();\n\n        Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__[\"drawRoundedRect\"])(ctx, WIDTH, HEIGHT, 10);\n\n        ctx.fillStyle = _ui_styles__WEBPACK_IMPORTED_MODULE_2__[\"Colors\"].backgroundBlue;\n        ctx.strokestyle = EDGE_COLOR;\n\n        ctx.fill();\n        ctx.stroke();\n\n        ctx.restore();\n\n        ctx.save();\n        ctx.fillStyle = '#000';\n        ctx.font = '20px Helvetica';\n        ctx.fillText(this.message, 10, HEIGHT/2);\n\n        ctx.restore();\n\n    }\n}\n\n//# sourceURL=webpack:///./src/js/ui/toast.js?");

/***/ }),

/***/ "./src/js/ui/toast_manager.js":
/*!************************************!*\
  !*** ./src/js/ui/toast_manager.js ***!
  \************************************/
/*! exports provided: ToastManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ToastManager\", function() { return ToastManager; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toast */ \"./src/js/ui/toast.js\");\n\n\n\nconst TIME_TO_DISPLAY_SEC = 3;\n\nclass ToastManager extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(gr) {\n        super();\n        this.registry = gr;\n\n        this.toasts = [];\n\n        this.lastTime = Date.now();\n    }\n\n    showToast(msg) {\n        console.log(`showing toast: ${msg}`);\n\n        let t = new _toast__WEBPACK_IMPORTED_MODULE_1__[\"ToastPanel\"](msg);\n        t.setPos(490, 10);\n\n        this.toasts.push(t);\n        this.children.push(t);\n    }\n\n    updateToasts() {\n        let currTime = Date.now();\n\n        this.toasts.forEach(toast => {\n            if (currTime >= (toast.created + (TIME_TO_DISPLAY_SEC * 1000))) {\n                toast.visible = false;\n            }\n        });\n\n        this.children = this.children.filter(c => {\n            return c.visible;\n        });\n    }\n\n    render(ctx) {\n        this.updateToasts();\n    }\n}\n\n//# sourceURL=webpack:///./src/js/ui/toast_manager.js?");

/***/ })

/******/ });