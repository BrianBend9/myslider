var MySlider = (function () {

	'use strict'

	var imageIndex = 0;
	var sliderElementId;
	var timeoutId;

	var config = {
		"navButtons" : true,
		"autoPlay" : false,
		"autoPlayDelay" : 5000
	};

	var init = function (elementId, configObject)  {
		var sliderElement = document.getElementById(elementId);

		sliderElementId = elementId;
		this.addWrapper(sliderElement);
		this.updateConfig(configObject);
		sliderElement.classList.add('myslider');
		sliderElement.children[imageIndex].classList.add("active");

		if (this.config.navButtons === true) {
			this.addNavButton("▶", "previous-button", sliderElement);
			this.addNavButton("◀", "next-button", sliderElement);
			this.addButtonEventListeners();
		}

		if (this.config.autoPlay === true) {
			this.startAutoPlayTimer(this.slide, this.config.autoPlayDelay);
		}
	};

	var updateConfig = function (newConfigObject) {
		if (typeof(newConfigObject) === "object") {
			for (var setting in newConfigObject) {
				this.config[setting] = newConfigObject[setting];
			}
		}
	};

	var addWrapper = function (sliderElement) {
		var mysliderParent = sliderElement.parentNode;
		var wrapper = document.createElement('div');
		wrapper.classList.add('myslider-wrapper');
		mysliderParent.replaceChild(wrapper, sliderElement);
		wrapper.appendChild(sliderElement);
	};

	var addNavButton = function (buttonText, buttonClass, sliderElement) {
		var button = document.createElement("button");
		var text = document.createTextNode(buttonText);
		button.appendChild(text);
		button.classList.add("nav-button", buttonClass);
		sliderElement.parentNode.insertBefore(button, sliderElement);
	};

	var addButtonEventListeners = function () {
		var buttons = document.getElementsByClassName('nav-button');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", this.slide, false);
		}
	};

	var slide = function (event) {
		var images = document.getElementById(sliderElementId).children;

		if (event !== undefined && timeoutId !== undefined) {
			MySlider.resetAutoPlayTimer();
		}

		if ((event === undefined || event.target.classList.contains("next-button")) && imageIndex === images.length - 1) {
			MySlider.resetAllImagePositions(images);
			imageIndex = 0;
			images[imageIndex].classList.add("active");
		} else if ((event === undefined || event.target.classList.contains("next-button")) && imageIndex < images.length - 1) {
			MySlider.slideImagesToNextPosition(images);
		} else if (event.target.classList.contains("previous-button") && imageIndex > 0) {
			MySlider.slideImagesToPreviousPosition(images);
		}
	};

	var resetAllImagePositions = function (imageArray) {
		for (var i = 0; i < imageArray.length; i++) {
			imageArray[i].classList.remove("inactive", "active")
		}
	};

	var slideImagesToPreviousPosition = function (imageArray) {
		imageArray[imageIndex].classList.remove("inactive", "active");
		imageIndex -= 1;
		imageArray[imageIndex].classList.add("active");
		imageArray[imageIndex].classList.remove("inactive");
	};

	var slideImagesToNextPosition = function (imageArray) {
		imageArray[imageIndex].classList.add("inactive");
		imageArray[imageIndex].classList.remove("active");
		imageIndex += 1;
		imageArray[imageIndex].classList.add("active");
	};

	var startAutoPlayTimer = function (callbackFn, delay) {
		timeoutId = setInterval(callbackFn, delay);
	};

	var resetAutoPlayTimer = function () {
		clearInterval(timeoutId)
		MySlider.startAutoPlayTimer(MySlider.slide, MySlider.config.autoPlayDelay);
	};

	var pulicMethods = {
		config : config,
		init : init,
		updateConfig : updateConfig,
		addWrapper : addWrapper,
		addNavButton : addNavButton,
		addButtonEventListeners : addButtonEventListeners,
		slide : slide,
		resetAllImagePositions : resetAllImagePositions,
		slideImagesToPreviousPosition : slideImagesToPreviousPosition,
		slideImagesToNextPosition : slideImagesToNextPosition,
		startAutoPlayTimer : startAutoPlayTimer,
		resetAutoPlayTimer : resetAutoPlayTimer
	};

	return pulicMethods;
})();
