'use strict';

var BaseScene = require('../hakurei').Scene.Base;
var CONSTANT = require('../constant');

var Util = require('../hakurei').Util;

var Scene = function(core) {
	BaseScene.apply(this, arguments);

	// 稼いだお金
	this._money = 0;
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(money){
	BaseScene.prototype.init.apply(this, arguments);

	// 稼いだお金
	this._money = money || 0;

	this.core.scene_manager.setFadeIn(60, CONSTANT.COLOR_BLACK);

	// SE再生
	this.core.audio_loader.playSound(this.soundName());
};

Scene.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	if (this.core.input_manager.isLeftClickPush()) {
		this.core.scene_manager.setFadeOut(60, CONSTANT.COLOR_BLACK);
		this.core.scene_manager.changeScene("rule");
	}
};

Scene.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;
	// 背景
	var bg = this.core.image_loader.getImage(this.bgName());
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg, -bg.width/2, -bg.height/2);
	ctx.restore();

	ctx.save();
	ctx.font = "48px 'MyFont'";

	// 文字を縁取る
	ctx.strokeStyle = CONSTANT.COLOR_BLACK;
	ctx.lineWidth = 4.0;
	ctx.textAlign = 'left';
	ctx.strokeText("Congratulations!!", 20, 50);
	ctx.textAlign = 'right';
	ctx.strokeText("獲得した金額" + this._money + "円", this.width, this.height - 20);

	// 文字本体
	ctx.fillStyle = "rgb(255,215,0)";
	ctx.textAlign = 'left';
	ctx.fillText("Congratulations!!", 20, 50);
	ctx.textAlign = 'right';
	ctx.fillText("獲得した金額" + this._money + "円", this.width, this.height - 20);
	ctx.restore();
};

Scene.prototype.soundName = function(){
	throw new Error("soundName must be overridden.");
};

Scene.prototype.bgName = function(){
	throw new Error("bgName must be overridden.");
};

module.exports = Scene;
