<template>
    <div
        class           = "rrp"
        :class          = "{'disabled': disabled}"
        :style          = "{'width': getWidth() }"
        v-clickoutside  = "closePopup"
    >
        <!-- input -->
        <input
            readonly
            name            = "date"
            :disabled       = "disabled"
            :data-label     = "$attrs['data-label']"
            :class          = "inputClass"
            :value          = "getText()"
            :placeholder    = "innerPlaceholder"
            ref             = "input"
            :required       = "required"
            @mouseenter     = "hoverIcon"
            @mouseleave     = "hoverIcon"
            @click          = "togglePopup"
            @mousedown      = "$event.preventDefault()"
        >
        <i
            class           = "sko-rrp-input-icon fa fa-calendar"
            @mouseenter     = "hoverIcon"
            @mouseleave     = "hoverIcon"
            @click          = "clickIcon" >
        </i>

        <!-- coming up -->
        <div
            class           = "sko-rrp-comingup"
            v-show          = "comingup"
        >
            <label>{{ comingupText }}</label>
            <div
                class           = "sko-rrp-comingup-dates container"
            >
                <div
                    v-for           = "comingupdate in getComingUpDates()"
                >
                    {{ comingupdate }}
                </div>
            </div>
        </div>

        <!-- popup -->
        <div
            class           = "sko-rrp-popup"
            :style          = "position"
            ref             = "calendar"
            v-show          = "showPopup"
        >
            <div
                class           = "sko-rrp-popup-body"
            >
                <!-- rrule settings -->
                <div
                    class           = "sko-rrp-popup-rrule container"
                    :style          = "{'width': calendar ? '50%' : '100%'}"
                >
                    <!-- startdate -->
                    <div
                        class           = "form-group"
                    >
                        <label class="sko-rrp-rrule-label" for="rrp_startdate">{{ translation.startdate }}</label>
                        <input id="rrp_startdate" class="sko-rrp-rrule-input" type="date" v-model="rrule.startdate">
                    </div>

                    <!-- enddate -->
                    <div
                        class           = "form-group"
                        v-show          = "endDateInput"
                    >
                        <label class="sko-rrp-rrule-label" for="rrp_enddate">{{ translation.enddate }}</label>
                        <input id="rrp_enddate" class="sko-rrp-rrule-input" type="date" v-model="rrule.enddate">
                    </div>

                    <!-- frequency -->
                    <div
                        class           = "form-group"
                    >
                        <label class="sko-rrp-rrule-label" for="rrp_frequency">{{ translation.frequency }}</label>
                        <select id="rrp_frequency" class="sko-rrp-rrule-input" v-model="rrule.frequency">
                            <option v-for="freq in translation.freqs" :value="freq.key">{{ freq.value }}</option>
                        </select>
                    </div>


                    <!-- frequency daily -->
                    <div
                        class           = "form-group"
                        v-if            = "rrule.frequency == 'DAILY'"
                    >
                        <label class="sko-rrp-rrule-label" for="rrp_interval1">{{ translation.each }}</label>
                        <input id="rrp_interval1" type="number" class="sko-rrp-rrule-interval-input" v-model="rrule.interval">
                        <label for="rrp_interval1">{{ translation.day_plural }}</label>
                    </div>


                    <!-- frequency weekly -->
                    <div
                        class           = "form-group"
                        v-if            = "rrule.frequency == 'WEEKLY'"
                    >
                        <label class="sko-rrp-rrule-label" for="rrp_interval2">{{ translation.each }}</label>
                        <input id="rrp_interval2" type="number" class="sko-rrp-rrule-interval-input" v-model="rrule.interval">
                        <label for="rrp_interval2">{{ translation.week_plural }}</label>
                    </div>

                    <div
                        class           = "form-group"
                        v-if            = "rrule.frequency == 'WEEKLY'"
                    >
                        <label class="sko-rrp-rrule-label" for="rrp_interval2">{{ translation.on }}</label>
                        <div class="sko-rrp-rrule-byweekday btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-light sko-rrp-" v-for="(day, index) in translation.days">
                                <input type="checkbox" :value="day.key"  v-on:focus="clickWeekday($event)"> {{ day.value }}
                            </label>
                        </div>
                    </div>


                    <!-- frequency monthly -->
                    <div
                        class           = "form-group"
                        v-if            = "rrule.frequency == 'MONTHLY'"
                    >
                        <label class="sko-rrp-rrule-label" for="rrp_interval2">{{ translation.each }}</label>
                        <input id="rrp_interval3" type="number" class="sko-rrp-rrule-interval-input" v-model="rrule.interval">
                        <label for="rrp_interval3">{{ translation.month_plural }}</label>
                    </div>

                    <div
                        class           = "form-group"
                        v-if            = "rrule.frequency == 'MONTHLY'"
                    >
                        <input id="rrp_monthly_type_number" type="radio" name="rrp_monthly_type" value="number" v-model="rrule.monthly_type">
                        <label for="rrp_monthly_type_number">{{ translation.each }}</label>

                        <div class="sko-rrp-rrule-bymonthday sko-rrp-rrule-monthly-type-number btn-group-toggle" data-toggle="buttons" :disabled="rrule.monthly_type != 'number'">
                            <label class="btn btn-light" v-for="i in 31">
                                <input type="checkbox" :value="i"  v-on:focus="clickMonthday($event)"> {{ i }}
                            </label>
                        </div>
                    </div>

                    <div
                        class           = "form-group mt-2"
                        v-if            = "rrule.frequency == 'MONTHLY'"
                    >
                        <input id="rrp_monthly_type_ordinal" type="radio" name="rrp_monthly_type" value="ordinal" v-model="rrule.monthly_type">
                        <label for="rrp_monthly_type_ordinal">{{ translation.on }} {{ translation.the }}</label>

                        <div class="sko-rrp-rrule-monthly-type-ordinal" :disabled="rrule.monthly_type != 'ordinal'">
                            <select class="sko-rrp-rrule-bysetpos-input" v-model="rrule.bysetpos">
                                <option v-for="ordinal in translation.ordinals" :value="ordinal.key">{{ ordinal.value }}</option>
                            </select>

                            <select class="sko-rrp-rrule-byday-input" v-model="rrule.byday">
                                <option v-for="day in translation.days" :value="day.key">{{ day.value_full }}</option>
                                <option disabled>──────────</option>
                                <option value="MO,TU,WE,TH,FR,SA,SU">{{ translation.day }}</option>
                                <option value="MO,TU,WE,TH,FR">{{ translation.weekday }}</option>
                                <option value="SA,SU">{{ translation.weekendday }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- frequency yearly -->
                    <div
                        class           = "form-group"
                        v-if            = "rrule.frequency == 'YEARLY'"
                    >
                        <input id="rrp_yearly_type_number" type="radio" name="rrp_yearly_type" value="number" v-model="rrule.yearly_type">
                        <label for="rrp_yearly_type_number">{{ translation.on }}</label>

                        <div class="sko-rrp-rrule-yearly-type-ordinal" :disabled="rrule.yearly_type != 'number'">
                            <select class="sko-rrp-rrule-bymonth-input" v-model="rrule.bymonth">
                                <option v-for="month in translation.months" :value="month.key">{{ month.value_full }}</option>
                            </select>

                            <select class="sko-rrp-rrule-bymonthday-input" v-model="rrule.bymonthday">
                                <option v-for="i in 31" :value="i">{{ i }}</option>
                            </select>
                        </div>
                    </div>

                    <div
                        class           = "form-group"
                        v-if            = "rrule.frequency == 'YEARLY'"
                    >
                        <input id="rrp_yearly_type_ordinal" type="radio" name="rrp_yearly_type" value="ordinal" v-model="rrule.yearly_type">
                        <label for="rrp_yearly_type_ordinal">{{ translation.on }} {{ translation.the }}</label>

                        <div class="sko-rrp-rrule-yearly-type-ordinal" :disabled="rrule.yearly_type != 'ordinal'">
                            <select class="sko-rrp-rrule-bysetpos-input" v-model="rrule.bysetpos">
                                <option v-for="ordinal in translation.ordinals" :value="ordinal.key">{{ ordinal.value }}</option>
                            </select>

                            <select class="sko-rrp-rrule-byday-input" v-model="rrule.byday">
                                <option v-for="day in translation.days" :value="day.key">{{ day.value_full }}</option>
                                <option disabled>──────────</option>
                                <option value="MO,TU,WE,TH,FR,SA,SU">{{ translation.day }}</option>
                                <option value="MO,TU,WE,TH,FR">{{ translation.weekday }}</option>
                                <option value="SA,SU">{{ translation.weekendday }}</option>
                            </select>
                        </div>

                        <div class="sko-rrp-rrule-yearly-type-ordinal" :disabled="rrule.yearly_type != 'ordinal'">
                            <label for="rrp_yearly_type_ordinal">{{ translation.of }}</label>
                            <select class="sko-rrp-rrule-bymonth-input" v-model="rrule.bymonth">
                                <option v-for="month in translation.months" :value="month.key">{{ month.value_full }}</option>
                            </select>
                        </div>
                    </div>
                </div>


                <!-- calendar -->
                <sko-r-rule-picker-calendar-panel
                    class           = "sko-rrp-popup-calendar"
                    :show           = "showPopup"
                    v-show          = "calendar"
                >
                </sko-r-rule-picker-calendar-panel>
            </div>

            <div class="sko-rrp-popup-footer" v-if="confirm">
                <button type="button" class="btn btn-primary sko-rrp-btn sko-rrp-btn-confirm" @click="confirmValue"> {{ confirmText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as Cmp from 'es6lib/functions/compare.es6';
    import SkoRRulePickerCalendarPanel from './sko-rrulepicker-calendarpanel.vue'
    import Languages from './languages_rrulepicker.js'
    import * as RRL from './languages_rrule.js'

    export default {
        //COMPONENTS
        components  : {
            SkoRRulePickerCalendarPanel
        }

        //PROPS
        , props: {
            value: null

            , disabled: {
                type        : Boolean
                , default   : false
            }

            , width: {
                type        : [String, Number]
                , default   : '100%'
            }

            , placeholder: {
                type        : String
                , default   : ''
            }

            , required: {
                type        : Boolean
                , default   : false
            }

            ,lang: {
                type        : String
                , default   : 'en'
            }

            , shortcuts: {
                type        : [Boolean, Array]
                , default   : true
            }

            , disabledDays: {
                type        : Array
                , default   : function() {
                    return []
                }
            }

            , calendar: {
                type        : Boolean
                , default   : true
            }

            , confirm: {
                type        : Boolean
                , default   : true
            }
            , confirmText: {
                type        : String
                , default   : 'OK'
            }

            , comingup: {
                type        : Boolean
                , default   : true
            }
            , comingupOffset: {
                type        : Number
                , default   : 0
            }
            , comingupLimit: {
                type        : Number
                , default   : 5
            }
            , comingupText: {
                type        : String
                , default   : 'Coming up'
            }

            , inputClass: {
                type        : [String, Object]
                , default   : 'form-control sko-rrp-input'
            }

            , startDate: {
                type        : String
                , default   : ''
            }
            , endDate: {
                type        : String
                , default   : ''
            }
            , endDateInput: {
                type        : Boolean
                , default   : true
            }
        }

        //DATA
        , data() {
            return {
                showPopup       : false
                , currentValue  : this.value
                , currentText   : ''
                , position      : null

                , rrule         : {
                    startdate       : ''
                    , enddate       : ''
                    , frequency     : null
                    , interval      : 1
                    , byday         : []
                    , bymonth       : null
                    , bymonthday    : []
                    , bysetpos      : ''

                    , monthly_type  : 'number'
                    , yearly_type   : 'number'

                    , initiated     : false
                }

                , moment        : require('moment')
                , RRule         : require('rrule').RRule
            }
        },


        //CREATED
        created() {
            let that = this;

            that.moment.locale(that.lang);

            that.rrule.startdate    = that.startDate ? that.moment(that.startDate).format('Y-MM-DD') : '';
            that.rrule.enddate      = that.endDate ? that.moment(that.endDate).format('Y-MM-DD') : '';
        }


        //MOUNTED
        , mounted() {
            let that = this;
        }


        //DIRECTIVES
        , directives: {
            clickoutside: {
                bind(el, binding, vnode) {
                    el['@clickoutside'] = e => {
                        if (
                            !el.contains(e.target) &&
                            binding.expression &&
                            vnode.context[binding.expression]
                        ) {
                            binding.value()
                        }
                    }
                    document.addEventListener('click', el['@clickoutside'], true)
                },
                unbind(el) {
                    document.removeEventListener('click', el['@clickoutside'], true)
                }
            }
        }

        //WATCHES
        , watch: {
            showPopup(val) {
                if (val) {
                    this.$nextTick(this.displayPopup)
                }
            }
            , startDate(newValue, oldValue) {
                let that    = this;
                that.rrule.startdate = newValue ? that.moment(newValue).format('Y-MM-DD') : '';
            }
            , endDate(newValue, oldValue) {
                let that    = this;
                that.rrule.enddate = newValue ? that.moment(newValue).format('Y-MM-DD') : '';
            }
        },

        //COMPUTED
        computed: {
            translation() {
                let that = this;

                return Languages[that.lang.substr(0,2)] || Languages['en']
            }

            , innerPlaceholder() {
                let that = this;

                return (
                    that.placeholder || that.translation.placeholder
                )
            }

            , text() {
                let that = this

                that.initRrule();

                return that.getText();
            }
        }

        //METHODS
        , methods: {
            getWidth() {
                let that = this;

                return Cmp.is_numeric(that.width) ? that.width + 'px' : that.width;
            }

            , getRRule() {
                let that = this;

                if (that.rrule.startdate
                &&  that.rrule.frequency) {
                    let frequency   = null;
                    let interval    = 1;
                    let byday       = [];
                    let bymonthday  = [];
                    let bymonth     = null;

                    switch (that.rrule.frequency) {
                        case 'DAILY' :
                            frequency = that.RRule.DAILY
                            interval  = parseInt(that.rrule.interval)
                            break

                        case 'WEEKLY' :
                            frequency = that.RRule.WEEKLY
                            interval  = parseInt(that.rrule.interval)

                            //$.each($('.sko-rrp-rrule-byweekday input:checked'), function (i, elem) {
                            if (Cmp.is_string(that.rrule.byday)) {
                                $.each(that.rrule.byday.split(','), (i, bydaypart) => {
                                    //switch ($(elem).val()) {
                                    switch (bydaypart) {
                                        case 'SU':
                                            byday.push(that.RRule.SU);
                                            break;
                                        case 'MO':
                                            byday.push(that.RRule.MO);
                                            break;
                                        case 'TU':
                                            byday.push(that.RRule.TU);
                                            break;
                                        case 'WE':
                                            byday.push(that.RRule.WE);
                                            break;
                                        case 'TH':
                                            byday.push(that.RRule.TH);
                                            break;
                                        case 'FR':
                                            byday.push(that.RRule.FR);
                                            break;
                                        case 'SA':
                                            byday.push(that.RRule.SA);
                                            break;
                                    }
                                });
                            } else {
                                byday = null;
                            }
                            break;

                        case 'MONTHLY' :
                            frequency = that.RRule.MONTHLY
                            bymonth   = null

                            switch (that.rrule.monthly_type) {
                                case 'number'   :
                                    interval  = parseInt(that.rrule.interval)

                                    if (Cmp.is_string(that.rrule.bymonthday)) {
                                        $.each(that.rrule.bymonthday.split(','), (i, bymonthdaypart) => {
                                            bymonthday.push(parseInt(bymonthdaypart));
                                        })
                                    } else {
                                        bymonthday = that.rrule.bymonthday
                                    }
                                    break;
                                case 'ordinal'  :
                                    interval  = 1

                                    switch (that.rrule.byday) {
                                        case 'SU':
                                            byday.push(that.RRule.SU.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'MO':
                                            byday.push(that.RRule.MO.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'TU':
                                            byday.push(that.RRule.TU.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'WE':
                                            byday.push(that.RRule.WE.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'TH':
                                            byday.push(that.RRule.TH.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'FR':
                                            byday.push(that.RRule.FR.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'SA':
                                            byday.push(that.RRule.SA.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'MO,TU,WE,TH,FR,SA,SU':
                                            byday = [that.RRule.SU.nth(parseInt(that.rrule.bysetpos)), that.RRule.MO.nth(parseInt(that.rrule.bysetpos)), that.RRule.TU.nth(parseInt(that.rrule.bysetpos)), that.RRule.WE.nth(parseInt(that.rrule.bysetpos)), that.RRule.TH.nth(parseInt(that.rrule.bysetpos)), that.RRule.FR.nth(parseInt(that.rrule.bysetpos)), that.RRule.SA.nth(parseInt(that.rrule.bysetpos))]
                                            break;
                                        case 'MO,TU,WE,TH,FR':
                                            byday = [that.RRule.MO.nth(parseInt(that.rrule.bysetpos)), that.RRule.TU.nth(parseInt(that.rrule.bysetpos)), that.RRule.WE.nth(parseInt(that.rrule.bysetpos)), that.RRule.TH.nth(parseInt(that.rrule.bysetpos)), that.RRule.FR.nth(parseInt(that.rrule.bysetpos))]
                                            break;
                                        case 'SA,SU':
                                            byday = [that.RRule.SA.nth(parseInt(that.rrule.bysetpos)), that.RRule.SU.nth(parseInt(that.rrule.bysetpos))]
                                            break;
                                    }
                                    break;
                            }
                            break

                        case 'YEARLY' :
                            frequency = that.RRule.YEARLY
                            interval  = 1
                            bymonth   = that.rrule.bymonth

                            switch (that.rrule.yearly_type) {
                                case 'number'   :
                                    //$.each($('.sko-rrp-rrule-bymonthday input:checked'), function (i, elem) {
                                    if (Cmp.is_string(that.rrule.bymonthday)) {
                                        $.each(that.rrule.bymonthday.split(','), (i, bymonthdaypart) => {
                                            bymonthday.push(parseInt(bymonthdaypart));
                                        })
                                    } else {
                                        bymonthday = that.rrule.bymonthday
                                    }
                                    break;
                                case 'ordinal'  :
                                    switch (that.rrule.byday) {
                                        case 'SU':
                                            byday.push(that.RRule.SU.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'MO':
                                            byday.push(that.RRule.MO.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'TU':
                                            byday.push(that.RRule.TU.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'WE':
                                            byday.push(that.RRule.WE.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'TH':
                                            byday.push(that.RRule.TH.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'FR':
                                            byday.push(that.RRule.FR.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'SA':
                                            byday.push(that.RRule.SA.nth(parseInt(that.rrule.bysetpos)));
                                            break;
                                        case 'MO,TU,WE,TH,FR,SA,SU':
                                            byday = [that.RRule.SU.nth(parseInt(that.rrule.bysetpos)), that.RRule.MO.nth(parseInt(that.rrule.bysetpos)), that.RRule.TU.nth(parseInt(that.rrule.bysetpos)), that.RRule.WE.nth(parseInt(that.rrule.bysetpos)), that.RRule.TH.nth(parseInt(that.rrule.bysetpos)), that.RRule.FR.nth(parseInt(that.rrule.bysetpos)), that.RRule.SA.nth(parseInt(that.rrule.bysetpos))]
                                            break;
                                        case 'MO,TU,WE,TH,FR':
                                            byday = [that.RRule.MO.nth(parseInt(that.rrule.bysetpos)), that.RRule.TU.nth(parseInt(that.rrule.bysetpos)), that.RRule.WE.nth(parseInt(that.rrule.bysetpos)), that.RRule.TH.nth(parseInt(that.rrule.bysetpos)), that.RRule.FR.nth(parseInt(that.rrule.bysetpos))]
                                            break;
                                        case 'SA,SU':
                                            byday = [that.RRule.SA.nth(parseInt(that.rrule.bysetpos)), that.RRule.SU.nth(parseInt(that.rrule.bysetpos))]
                                            break;
                                    }
                                    break;
                            }
                            break
                    }

                    // Create a rule:
                    let rule = {
                        freq            : frequency
                        , interval      : interval
                        , byweekday     : byday
                        , bymonthday    : bymonthday
                        , bymonth       : bymonth
                        , bysetpos      : Cmp.is_numeric(that.rrule.bysetpos) ? parseInt(that.rrule.bysetpos) : 1
                        , dtstart       : that.moment(that.rrule.startdate).toDate()
                    }

                    if (that.rrule.enddate) {
                        rule.until  = that.moment(that.rrule.enddate).toDate();
                    }

                    let rrule = new that.RRule(rule)

                    // Get all occurrence dates (Date instances):
                    //console.log(rule.all());

                    return rrule;
                }

                return false;
            }

            , getText() {
                let that = this;

                if (that.value) {
                    if (!that.rrule.initiated) {
                        that.initRrule(that.value);
                    }

                    let rule = that.getRRule();

                    if (rule) {
                        return rule.toText(that.gettext, that.getLanguage());
                    }
                }
            }

            , getLanguage() {
                let that = this;

                switch (that.lang) {
                    case 'nl'   :
                    case 'nl_NL':
                        return RRL.DUTCH;
                    default     :
                        return RRL.ENGLISH;
                }
            }

            , getComingUpDates() {
                let that = this;
                let rule = that.getRRule();
                let dates= [];
                let count= 0;

                if (that.getText() && rule) {
                    //$.each(rule.all(), function(i, item) {
                    $.each(rule.between(that.moment().add(that.comingupOffset, 'day').startOf('day').toDate(), that.moment().add(1, 'years').toDate()), function(i, item) {
                        dates.push(that.moment(item).format('dddd D MMMM YYYY'));

                        count++;

                        if (count > that.comingupLimit) {
                            return false;
                        }
                    });
                }

                return dates;
            }

            , initRrule (value) {
                let that = this

                if (that.value) {
                    let valueparts = that.value.split(';')

                    $.each(valueparts, (i, valuepart) => {
                        let strparts = valuepart.split('=')

                        if (strparts.length
                        &&  strparts.length == 2) {
                            let strpartkey = strparts[0]
                            let strpartvalue = strparts[1]

                            switch (strpartkey) {
                                case 'FREQ'         :
                                    that.rrule.frequency = strpartvalue
                                    break;
                                case 'INTERVAL'     :
                                    that.rrule.interval = strpartvalue
                                    break;
                                case 'BYDAY'        :
                                    that.rrule.byday = strpartvalue.replace(/[^a-zA-Z]/gi, '')
                                    break;
                                case 'BYSETPOS'     :
                                    that.rrule.bysetpos = strpartvalue

                                    if (strpartvalue) {
                                        that.rrule.monthly_type = 'ordinal'
                                    }
                                    break;
                                case 'BYMONTHDAY'   :
                                    that.rrule.bymonthday = strpartvalue
                                    break;
                            }
                        }
                    });

                    that.rrule.initiated = true;
                }
            }

            , confirmValue() {
                this.updateValue()
                this.closePopup()
                this.$emit('confirm', this.currentValue)
            }

            , updateValue() {
                let that = this

                let rule = that.getRRule();

                if (rule) {
                    that.currentValue = rule.toString();

                    that.$emit('input', that.currentValue)
                }
            }

            , closePopup() {
                this.showPopup = false
            }

            , togglePopup() {
                if (this.showPopup) {
                    this.$refs.input.blur()
                    this.showPopup = false
                } else {
                    this.$refs.input.focus()
                    this.showPopup = true
                }
            }

            , hoverIcon(e) {
                if (this.disabled) {
                    return
                }
            }

            , clickIcon() {
                if (this.disabled) {
                    return
                }
                if (this.showCloseIcon) {
                    this.$emit('input', '')
                } else {
                    this.togglePopup()
                }
            }

            , clickWeekday(e) {
                let that=this;
                let byday = '';
                let comma = '';

                $.each($('.sko-rrp-rrule-byweekday input:checked'), function (i, elem) {
                    byday += comma + $(elem).val()
                    comma = ','
                });
                that.rrule.byday = byday;
            }

            , clickMonthday(e) {
                let that=this;
                let bymonthday  = '';
                let comma       = '';

                $.each($('.sko-rrp-rrule-bymonthday input:checked'), function (i, elem) {
                    bymonthday += comma + $(elem).val()
                    comma = ','
                });
                that.rrule.bymonthday = bymonthday;
            }

            , displayPopup() {
                if (this.disabled) {
                    return
                }

                /*
                const dw = document.documentElement.clientWidth
                const dh = document.documentElement.clientHeight
                const InputRect = this.$el.getBoundingClientRect()
                const PopupRect = this.$refs.calendar.getBoundingClientRect()
                this.position = {}
                if (
                    dw - InputRect.left < PopupRect.width &&
                    InputRect.right < PopupRect.width
                ) {
                    this.position.left = 1 - InputRect.left + 'px'
                } else if (InputRect.left + InputRect.width / 2 <= dw / 2) {
                    this.position.left = 0
                } else {
                    this.position.right = 0
                }
                if (
                    InputRect.top <= PopupRect.height + 1 &&
                    dh - InputRect.bottom <= PopupRect.height + 1
                ) {
                    this.position.top = dh - InputRect.top - PopupRect.height - 1 + 'px'
                } else if (InputRect.top + InputRect.height / 2 <= dh / 2) {
                    this.position.top = '100%'
                } else {
                    this.position.bottom = '100%'
                }
                console.log(InputRect,PopupRect,this.position);
                */
            }

            , gettext(id) {
                let that = this;

                return that.getLanguage().strings[id] || id;
            }

        }
    }
</script>


<style lang="scss">
    .rrp {
        position    : relative;
        color       : #73879c;
        * {
            box-sizing: border-box;
        }
        &.disabled {
        }
    }

    .sko-rrp-input {
        width: 100%;
        padding: 6px 30px 6px 10px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        &:disabled, &.disabled {
        }
    }
    .sko-rrp-input[readonly]:not([disabled]) {
        background-color: transparent !important;
    }
    .sko-rrp-input-icon {
        top: 10px;
        right: 0;
        position: absolute;
        width: 30px;
        text-align: center;
        font-style: normal;
        &::after {
            content: '';
            display: inline-block;
            width: 0;
            height: 100%;
            vertical-align: middle;
        }
    }

    .sko-rrp-input-icon__close::before {
        content: '\2716';
        vertical-align: middle;
    }

    .sko-rrp-comingup {
        margin-top: 1rem;
    }
    .sko-rrp-comingup label {
        color: black;
    }

    .sko-rrp-comingup-dates {
        background-color: #e9ecef;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        min-height: 5rem;
    }

    .sko-rrp-popup {
        position        : absolute;
        height          : auto;
        width           : 500px;
        margin-top      : 1px;
        margin-bottom   : 1px;
        border          : 1px solid #d9d9d9;
        background-color: #fff;
        box-shadow      : 0 6px 12px rgba(0, 0, 0, 0.175);
        top             : 40px;
        z-index         : 5000;
        &.range {
            width: 496px;
        }
    }
    .sko-rrp-popup-body {
        display         : flex;
        height          : 90%
    }

    .sko-rrp-popup-footer {
        clear           : both;
        text-align      : right;
        border-top      : 1px solid rgba(0, 0, 0, 0.05);
    }


    .sko-rrp-popup-rrule {
        font-size: 14px;
        padding: 0.5rem;
        width: 50%;
    }
    .sko-rrp-popup-rrule .form-group {
        margin-bottom: 0px;
    }
    .sko-rrp-popup-rrule .form-group .btn {
    }


    .sko-rrp-popup-calendar {
        width: 50%;
    }

    .sko-rrp-rrule-label {
        width: 35%;
    }
    .sko-rrp-rrule-input {
        width: 60%;
    }

    .sko-rrp-rrule-date-label {
    }
    .sko-rrp-rrule-date-input {
    }

    .sko-rrp-rrule-frequency-label {
    }
    .sko-rrp-rrule-frequency-input {
    }

    .sko-rrp-rrule-interval-label {
    }
    .sko-rrp-rrule-interval-input {
        width: 20%;
    }

    .sko-rrp-rrule-monthly-type-number {
    }
    .sko-rrp-rrule-monthly-type-number[disabled] {
        pointer-events: none;
    }


    .sko-rrp-rrule-monthly-type-ordinal {
        display: flex;
    }
    .sko-rrp-rrule-monthly-type-ordinal[disabled] {
        pointer-events: none;
    }
    .sko-rrp-rrule-monthly-type-ordinal label {
        width: 30%;
    }

    .sko-rrp-rrule-yearly-type-number {
    }
    .sko-rrp-rrule-yearlly-type-number[disabled] {
        pointer-events: none;
    }

    .sko-rrp-rrule-yearly-type-ordinal {
        margin-bottom: 5px;
    }
    .sko-rrp-rrule-yearly-type-ordinal[disabled] {
        pointer-events: none;
    }
    .sko-rrp-rrule-bymonth {
    }
    .sko-rrp-rrule-bymonth .btn {
        font-size: 14px;
        height: 30px;
        padding: 2px;
        width: 30%;
    }

    .sko-rrp-rrule-bymonthday .btn {
        font-size: 14px;
        height: 30px;
        padding: 2px;
        width: 28px;
    }
    select.sko-rrp-rrule-bymonthday  {
        width: 20%;
    }

    .sko-rrp-rrule-bysetpos {
    }
    .sko-rrp-rrule-bysetpos-input {
        width:40%;
    }

    .sko-rrp-rrule-byday{
    }
    .sko-rrp-rrule-byday-input  {
        width:55%;
    }

    .sko-rrp-rrule-bymonth {
    }
    .sko-rrp-rrule-bymonth-input {
        width:55%;
    }

    .sko-rrp-btn {
        line-height: 1;
        margin: 0 5px;
        cursor: pointer;
    }
    .sko-rrp-btn-confirm {
        &:hover {
        }
    }
</style>
