$(function() {
	$balls = $('.ball');
	width = $(window).innerWidth() - 80;
	height = $(window).innerHeight() - 80;
	init();
});

var $balls,
	width,
	height,
	mx, my,
	G = 0.6;

function init() {
	randomize();
	calc();
}

function randomize() {
	$balls.each(function(i, ball) {
		var $ball = $(ball),
			x = Math.random() * width,
			y = Math.random() * height;

		$ball.css({
			left: x,
			top: y
		});

		ball.v = {
			left: 0,
			top: 0
		}
	});
}

function calc() {
	$balls.each(function(i, ball) {
		var $ball = $(ball),
			$prev = $ball.prev(),
			x = $ball.position().left,
			y = $ball.position().top;

		if ($prev.length) {
			ball.v.left = ($prev.position().left + 80 - x) * G;
			ball.v.top = ($prev.position().top - y) * G;
		} else {
			ball.v.left = (40 - x) * G;
			ball.v.top = (0 - y) * G;
		}

		x += ball.v.left;
		y += ball.v.top;

		if (x < 0) {
			x = 0;
			ball.v.left *= -1;
		}
		if (x > width) {
			x = width;
			ball.v.left *= -1;
		}
		if (y < 0) {
			y = 0;
			ball.v.top *= -1;
		}
		if (y > height) {
			y = height;
			ball.v.top *= -1;
		}

		$ball.css({
			left: x,
			top: y
		});
	});

	setTimeout(calc, 100);
}
