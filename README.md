# myslider

This is a basic image slider created using html, css, and vanilla javascript.

The slider is created from a ul element defined on a html page.

In your .js file linked to your html page, the slider needs to be initialized using the ul element id,
and a configuration object as follows:

```
MySlider.init(elementId, {
"settingName": setting
});
```

Currently the only settings for this slider are navButtons, autoPlay, and autoPlayDelay.

For example:

(.js file)
```
(function(){
  MySlider.init(simpson-slider, {
    "navButtons": true, //to include navigation buttons on slider or not
    "autoPlay": false, //to have the images slide/or transition automatically
    "autoPlayDelay": 5000 //determines the amount of delay between image transitions
    });
})();
```

(.html file)
```
  <ul id="simpson-slider">
    <li><img src="assets/images/bart.jpg"></li>
    <li><img src="assets/images/lisa.jpg"></li>
    <li><img src="assets/images/maggie.jpg"></li>
    <li><img src="assets/images/homer.jpg"></li>
    <li><img src="assets/images/santaslittlehelper.jpg"></li>
  </ul>
```
