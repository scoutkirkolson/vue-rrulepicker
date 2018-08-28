# SkoRRulePicker
Vue-based Form input element to create RRULE string for recurring events.

You can find more information about the "RRULE" property in the section ["3.8.5.3. Recurrence Rule"](https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html) of [RFC 5545](https://icalendar.org/RFC-Specifications/iCalendar-RFC-5545/).

**Works with Vue 2.***

## Demo
See live demo on [Live Demo](https://scoutkirkolson.github.io/vue-rrulepicker/)

# Requirements

- [Vue.js](https://github.com/vuejs/vue) `^2.0.0` 
- [Bootstrap](https://getbootstrap.com/) `^4.0` (Optional)

## Installation
`npm install scoutkirkolson/vue-rrulepicker --save`

## Usage

Install component using npm, add rrulepicker component into your app

```javascript
import Vue from 'vue'
import skoRRulePicker from 'sko-rrulepicker'

new Vue({
  //...
  components: {
    skoRRulepicker,
  },
  //...
})
```

``` html
<sko-r-rule-picker
   start-date      = "2018-07-01"
   v-model         = "rrule"
>
</sko-r-rule-picker>
```

## Props
|Props|Description|Required|Type|Default|
|-----|-----------|--------|----|-------|
|comingup|Show list with dates based on selected rrule values|false|Boolean|true|
|comingup-limit|Maxiumum number of dates shown in comingup list|false|Number|5|
|comingup-text|Text above comingup list|false|String|Coming up|
|confirm|Show confirm button in popup|false|Boolean|true|
|confirm-text|Text on confirm button|false|String|OK|
|disabled|Disable input|false|Boolean|false|
|disabled-class|CSS class used on input when disabled|false|String / Object|''|
|end-date|End date used to calculate rrule|false|String|''|
|end-date-input|Show enddate input in popup|false|Boolean|true|
|icon-class|CSS class used on input icon. This overrides icon-source|false|String / Object|''|
|icon-source|Source used on input image.|false|String / Object|Base64 calendar image|
|input-class|CSS class used on input|false|String / Object|sko-rrp-input|
|lang|Language used by the component (currently only English ('en') and Dutch ('nl') are supported |false|String|en|
|placeholder|Input placeholder|false|String|-|
|required|Make input required|false|Boolean|false|
|required-class|CSS class used on input when required|false|String / Object|''|
|start-date|Start date used to calculate rrule|false|String|''|
|start-date-input|Show startdate input in popup|false|Boolean|true|
|width|Input width|false|String / Number|'100%'|

## License

Sko-RRulePicker is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

## Support
Hello, I'm Kirk the maintainer of this project in my free time (which is getting lessen these days), if this project does help you in any way please consider to support me. Thanks :smiley:
- [One-time donation via Paypal](https://www.paypal.me/kirkolson
