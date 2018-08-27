# sko-rrulepicker
Vue-based Form input element to create RRULE string for recurring events

**Works with Vue 2.***

## Demo
See live demo on [Live Demo](https://scoutkirkolson.github.io/vue-rrulepicker/)

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
