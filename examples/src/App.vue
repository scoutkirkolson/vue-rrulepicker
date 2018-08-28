<template>
    <div>
        <section class="hero is-primary is-bold mb-2">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Scout Kirk Olson's Vue2 RRulepicker component
                    </h1>
                    <h2 class="subtitle">
                    Input field component to select recurring rules using Vue.js v2
                    </h2>
                </div>
            </div>
        </section>

        <section class="container">
            <div class="card">
                <div class="card-header">
                    Simple RRulepicker with coming up dates
                </div>

                <div class="container row">
                    <div class="col-md-4 p-2">
                        <label for="rrulepicker1">Pick frequency</label>
                        <sko-r-rule-picker
                            id              = "rrulepicker1"
                            input-class     = "form-control"
                            v-model         = "rrule1"
                        ></sko-r-rule-picker>
                        <br />
                    </div>

                    <div class="col-md-8 p-2">
                        <label>Code</label>
                        <pre>
                            <code>
&lt;sko-r-rule-picker
    :input-class    = "form-control"
    start-date      = "2018-07-01"
    v-model         = "rrule"
&gt;&lt;/sko-r-rule-picker&gt;
                            </code>
                        </pre>
                    </div>

                    <div class="w-100 p-2">
                        <label >RRule</label>
                        <input class="form-control" v-model="rrule1" readonly>
                    </div>
                </div>
            </div>


            <div class="card mt-5">
                <div class="card-header">
                    RRulepicker with some options
                </div>

                <div class="container row">
                    <div class="col-md-4 p-2">
                        <label for="rrulepicker2">Pick frequency</label>
                        <sko-r-rule-picker
                            :comingup       = "true"
                            comingup-text   = "Next 3 dates"
                            :comingup-limit = "3"
                            icon-class      = "fa fa-calendar"
                            id              = "rrulepicker2"
                            input-class     = "form-control"
                            lang            = "nl"
                            :required       = "true"
                            required-class  = "form-control-required"
                            start-date      = "2018-07-01"
                            v-model         = "rrule2"
                        ></sko-r-rule-picker>
                        <br />
                    </div>

                    <div class="col-md-8 p-2">
                        <label>Code</label>
                        <pre>
                            <code>
&lt;sko-r-rule-picker
    :comingup       = "true"
    comingup-text   = "Next 3 dates"
    :comingup-limit = "3"
    icon-class      = "fa fa-calendar"
    id              = "rrulepicker2"
    :input-class    = "form-control"
    lang            = "nl"
    :required       = "true"
    required-class  = "form-control-required"
    start-date      = "2018-07-01"
    v-model         = "rrule2"
&gt;&lt;/sko-r-rule-picker&gt;
                            </code>
                        </pre>

                        <pre>
                            <code>
&lt;style type="text/css"&gt;
    .form-control-required {
        background-color: palevioletred !important;
    }
&lt;/style&gt;
                            </code>
                        </pre>
                    </div>

                    <div class="w-100 p-2">
                        <label >RRule</label>
                        <input class="form-control" v-model="rrule2" readonly>
                    </div>

                </div>

            </div>

        </section>
    </div>
</template>

<script>
    import skoRRulePicker from '../../src/sko-rrulepicker.vue'

    export default {
        data: function() {
            return {
                rrule1      : ''
                , rrule2    : ''
            };
        }

        , components: {skoRRulePicker}
    }
</script>

<style type="text/css">
    .form-control-required {
        background-color: palevioletred !important;
    }
</style>