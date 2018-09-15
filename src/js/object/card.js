'use strict';

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var Card = function(scene) {
	BaseObject.apply(this, arguments);

	// 色
	this._type   = null;
	// 数字
	this._number = null;
	// 表／裏
	this._is_reverse = true;
};
Util.inherit(Card, BaseObject);

Card.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// TODO:
	this._type   = null;
	this._number = null;
	this._is_reverse = true;
};
// 裏／表反転
Card.prototype.flip = function(){
	this._is_reverse = !this._is_reverse;
};
Card.prototype.isReverse = function(){
	return this._is_reverse;
};
Card.prototype.setType = function(type, number){
	this._type   = type;
	this._number = number;
};
Card.prototype.type = function(){
	return this._type;
};
Card.prototype.number = function(){
	return this._number;
};
Card.prototype.beforeDraw = function(){
	BaseObject.prototype.beforeDraw.apply(this, arguments);
};

Card.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;
	ctx.save();
	ctx.translate(this.x(), this.y());

	if (this.type() === CONSTANT.TYPE_RED) {
		ctx.fillStyle = "red";
	}
	else if (this.type() === CONSTANT.TYPE_BLUE) {
		ctx.fillStyle = "blue";
	}
	else if (this.type() === CONSTANT.TYPE_GREEN) {
		ctx.fillStyle = "green";
	}
	else if (this.type() === CONSTANT.TYPE_PURPLE) {
		ctx.fillStyle = "purple";
	}

	var offset_x = this.width()/2;
	var offset_y = this.height()/2;
	ctx.fillRect(-offset_x, -offset_y, this.width(), this.height());

	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo( offset_x, offset_y);
	ctx.lineTo(-offset_x, offset_y);
	ctx.lineTo(-offset_x, -offset_y);
	ctx.lineTo( offset_x, -offset_y);
	ctx.closePath();
	ctx.stroke();

	// 表なら数字も描画
	if (!this._is_reverse) {
		ctx.fillStyle = "white";
		ctx.font = "192px 'MyFont'";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillText(this.number(), 0, 0);
	}

	ctx.restore();
};


Card.prototype.width = function(){
	return 135;
};
Card.prototype.height = function(){
	return 200;
};

module.exports = Card;
