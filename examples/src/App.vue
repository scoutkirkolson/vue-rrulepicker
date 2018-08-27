<template>
    <div>
        <section class="hero is-primary is-bold">
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

        <section>
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <label for="rrulepicker1">Pick frequency</label>
                        <sko-r-rule-picker
                            :comingup       = "true"
                            comingup-text   = "Coming up"
                            :comingup-offset= "7"
                            :confirm        = "false"
                            :calendar       = "false"
                            id              = "rrulepicker1"
                            :input-class    = "{
                                'form-control'          : true
                                , 'form-field-required' : true
                            }"
                            lang            = "en"
                            :required       = "true"
                            start-date      = "2018-07-01"
                            v-model         = "rrule"
                        ></sko-r-rule-picker>
                    </div>

                    <div class="col-md-4">
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
                rrule: ''
            };
        }

        , components: {skoRRulePicker}
    }
</script>