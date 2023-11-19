// Copyright 2017-2020, Chris Youderian, chris@bootstrapformbuilder.com
var helper = function() {
        function e(e, i) {
            if (!i) return !1;
            for (var l = i.length; l--;)
                if (i[l] === e) return !0;
            return !1
        }
        return {
            min: function(e) {
                return Math.min.apply(Math, e)
            },
            max: function(e) {
                return Math.max.apply(Math, e)
            },
            clone: function e(i) {
                if ("object" != typeof i || null === i) return i;
                var l = i.constructor();
                for (var n in i) l[n] = e(i[n]);
                return l
            },
            indent: function(i) {
                var l = document.createElement("div");
                return l.innerHTML = i.trim(),
                    function i(l, n) {
                        for (var t, o = new Array(1 + n++).join("  "), d = new Array(n - 1).join("  "), a = 0; a < l.children.length; a++) {
                            t = document.createTextNode("\n" + o);
                            var c = l.children[a].nodeName,
                                s = l.children[a].className,
                                r = l.lastElementChild == l.children[a],
                                p = (l.children[a].innerHTML, e(c, ["LABEL", "BUTTON", "OPTION", "SPAN"]) || "input-group-addon" == s);
                            p && (l.children[a], l.children[a].innerHTML = l.children[a].innerHTML.trim()), l.insertBefore(t, l.children[a]), i(l.children[a], n), r && (t = document.createTextNode("\n" + d), l.appendChild(t))
                        }
                        return l
                    }(l, 0).innerHTML
            },
            indentStr: function(e, i) {
                for (var l = "", n = Array(i + 1).join(" "), t = e.split("\n"), o = 0; o < t.length; o++) {
                    var d = o < t.length - 1 ? "\n" : "";
                    l += n + t[o] + d
                }
                return l
            },
            isFunction: function(e) {
                return e && "[object Function]" === {}.toString.call(e)
            },
            x_in_array: e,
            fade_in: function(e) {
                e.style.opacity = 0;
                var i = function() {
                    e.style.opacity = +e.style.opacity + .01, +e.style.opacity < 1 && (window.requestAnimationFrame && requestAnimationFrame(i) || setTimeout(i, 16))
                };
                i()
            },
            download_html: function(e, i) {
                var l = window.document.createElement("a");
                l.href = window.URL.createObjectURL(new Blob([i], {
                    type: "html"
                })), l.download = e, document.body.appendChild(l), l.click(), l.remove()
            },
            replaceProperties: function(e, i) {
                for (var l in e) delete e[l];
                for (var l in i) e[l] = i[l]
            },
            ready: function(e, i) {
                "loading" != e.readyState ? i() : e.addEventListener ? e.addEventListener("DOMContentLoaded", i) : e.attachEvent("onreadystatechange", function() {
                    "loading" != e.readyState && i()
                })
            },
            getInternetExplorerVersion: function() {
                var e = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var i = navigator.userAgent;
                    null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(i) && (e = parseFloat(RegExp.$1))
                } else "Netscape" == navigator.appName && (i = navigator.userAgent, null != new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(i) && (e = parseFloat(RegExp.$1)));
                return e
            }
        }
    }(),
    RootMixin = {
        methods: {
            get_root: function() {
                return this.$root.fields ? this.$root : this.$root.children[0].context
            }
        },
        data: function() {
            return {
                app: this.get_root()
            }
        }
    },
    AddonMixin = {
        methods: {
            prepend: function(e) {
                return "no" != e.prepend
            },
            prepend_raw: function(e) {
                return "icon" == e.prepend ? '<i class="fa ' + e.prepend_icon + '"></i>' : e.prepend_text
            },
            append: function(e) {
                return "no" != e.append
            },
            icp_class: function(e) {
                return "icp-4"
            },
            append_raw: function(e) {
                return "icon" == e.append ? '<i class="fa ' + e.append_icon + '"></i>' : e.append_text
            },
            addon: function(e) {
                return this.append(e) || this.prepend(e)
            }
        }
    },
    options_subfield = {
        props: ["field"],
        mixins: [RootMixin],
        methods: {
            test: function() {
                alert("test")
            },
            removeField: function(e) {
                var i = this.app,
                    l = i.fields;
                l.forEach(function(i, n) {
                    e == i && l.splice(n, 1)
                }), i.selected = !1
            },
            moveField: function(e, i) {
                for (var l = this.app, n = l.fields, t = 0; t < n.length; t++) {
                    if (e == n[t]) {
                        var o = "up" == i ? t - 1 : t + 1;
                        if (o < 0) return;
                        return n.splice(t, 1), n.splice(o, 0, e), void l.selectField(e)
                    }
                }
            }
        },
        template: '\n  <div class="editor-field-options vertical-center"  v-bind:class="{selected: app.isSelected(field)}">\n    <div class="options-holder" v-if="app.isSelected(field)">\n      <i class="fa field-option move-field" aria-hidden="true">&#xf256</i>  \n      <i v-on:click="moveField(field, \'down\');" class="fa field-option move-field-down" aria-hidden="true">&#xf063</i>\n      <i v-on:click="moveField(field, \'up\');" class="fa field-option move-field-up" aria-hidden="true">&#xf062</i>\n      <i v-on:click="removeField(field);" class="fa field-option remove-field" aria-hidden="true">&#xf057</i>    \n    </div>\n  </div>\n'
    };
Vue.component("options-subfield", options_subfield);
var help_block = {
    props: ["field"],
    mixins: [RootMixin],
    template: '\n    <span v-if="field.help && app.bootstrap_3" :id="field.id+\'HelpBlock\'" class="help-block">{{field.help}}</span>    \n    <span v-else-if="field.help" :id="field.id+\'HelpBlock\'" class="form-text text-muted">\n      {{field.help}}\n    </span>      \n    '
};
Vue.component("help-block", help_block);
var text_field_3 = {
        components: {
            "field-input-group": {
                components: {
                    "field-input": {
                        props: ["field"],
                        mixins: [RootMixin],
                        template: '\n            <input class="form-control" :id="field.id" :name="field.id" :placeholder="field.placeholder" type="text" :aria-describedby="app.describedBy(field)" :required="field.required"  />\n          '
                    }
                },
                props: ["field"],
                mixins: [AddonMixin],
                template: '\n        <div v-if="addon(field)" class="input-group">\n          <div v-if="prepend(field)" class="input-group-addon" v-html="prepend_raw(field)"></div>\n          <field-input :field="field"></field-input>\n          <div v-if="append(field)" class="input-group-addon" v-html="append_raw(field)"></div>\n        </div>\n        <field-input v-else :field="field"></field-input>\n\n      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div class="form-group">\n      <template v-if="app.label_horizontal">\n        <label v-if="field.display_label" class="control-label" :class="app.lbl_class_left" :for="field.id">{{ field.title }}</label>       \n        <label :class="app.lbl_class_left" v-else></label>\n        <div :class="app.lbl_class_right">   \n          <field-input-group :field="field"></field-input-group>\n          <help-block :field="field"></help-block>\n        </div> \n      </template>\n      <template v-else>\n        <label class="control-label" :for="field.id">{{ field.title }}</label>\n        <field-input-group :field="field"></field-input-group>\n        <help-block :field="field"></help-block>\n      </template>\n    </div>    \n  '
    },
    text_field_4 = {
        components: {
            "field-input-group": {
                components: {
                    "field-input": {
                        props: ["field"],
                        mixins: [RootMixin],
                        template: '\n          <input class="form-control" :id="field.id" :name="field.id" :placeholder="field.placeholder" type="text" :aria-describedby="app.describedBy(field)" :required="field.required"  />                          \n          '
                    }
                },
                props: ["field"],
                mixins: [AddonMixin],
                template: '\n        <div v-if="addon(field)" class="input-group">\n          <div v-if="prepend(field)" class="input-group-addon" v-html="prepend_raw(field)"></div>\n          <field-input :field="field"></field-input>\n          <div v-if="append(field)" class="input-group-addon append" v-html="append_raw(field)"></div>  \n        </div>\n        <field-input :field="field" v-else></field-input>\n      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div class="form-group"  v-bind:class="{row: app.label_horizontal}">\n      <label v-if="app.label_horizontal && field.display_label" :class="[app.lbl_class_left, \'col-form-label\']" :for="field.id">{{ field.title }}</label>\n      <label v-else-if="field.display_label" :for="field.id">{{ field.title }}</label>\n      <label :class="app.lbl_class_left" v-else></label>\n      <div v-if="app.label_horizontal" :class="[app.lbl_class_right]">\n        <field-input-group :field="field"></field-input-group>\n        <help-block :field="field"></help-block>\n      </div> \n      <template v-else>\n        <field-input-group :field="field"></field-input-group>\n        <help-block :field="field"></help-block>        \n      </template>\n    </div>    \n  '
    },
    text_field_413 = {
        components: {
            "field-input-group": {
                components: {
                    "field-input": {
                        props: ["field"],
                        mixins: [RootMixin],
                        template: '\n          <input class="form-control" :id="field.id" :name="field.id" :placeholder="field.placeholder" type="text" :aria-describedby="app.describedBy(field)" :required="field.required"  />                          \n          '
                    }
                },
                props: ["field"],
                mixins: [AddonMixin],
                template: '\n        <div v-if="addon(field)" class="input-group">\n          <div v-if="prepend(field)" class="input-group-prepend">\n            <div v-html="prepend_raw(field)" class="input-group-text"></div>\n          </div>\n          <field-input :field="field"></field-input>\n          <div v-if="append(field)" class="input-group-append">\n            <div v-html="append_raw(field)" class="input-group-text"></div>\n          </div>          \n        </div>\n        <field-input :field="field" v-else></field-input>\n      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div class="form-group"  v-bind:class="{row: app.label_horizontal}">\n      <label v-if="app.label_horizontal && field.display_label" :class="[app.lbl_class_left, \'col-form-label\']" :for="field.id">{{ field.title }}</label>\n      <label v-else-if="field.display_label" :for="field.id">{{ field.title }}</label>\n      <label :class="app.lbl_class_left" v-else></label>\n      <div v-if="app.label_horizontal" :class="[app.lbl_class_right]">\n        <field-input-group :field="field"></field-input-group>\n        <help-block :field="field"></help-block>\n      </div> \n      <template v-else>\n        <field-input-group :field="field"></field-input-group>\n        <help-block :field="field"></help-block>        \n      </template>\n    </div>    \n  '
    },
    text_field = {
        props: ["field"],
        mixins: [RootMixin],
        components: {
            "text-field-3": text_field_3,
            "text-field-4": text_field_4,
            "text-field-413": text_field_413
        },
        template: '\n      <text-field-3 v-if="app.settings.bootstrap_version==\'3\'" :field="field"></text-field-3>\n      <text-field-4 v-else-if="app.settings.bootstrap_version==\'4\'" :field="field"></text-field-4>\n      <text-field-413 v-else :field="field"></text-field-413>\n    '
    },
    textarea_field_3 = {
        components: {
            "field-input": {
                props: ["field"],
                mixins: [RootMixin],
                template: '\n        <textarea class="form-control" :id="field.id" :name="field.id" :cols="field.cols" :rows="field.rows" :aria-describedby="app.describedBy(field)" :required="field.required"></textarea>\n      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div class="form-group">\n      <label v-if="field.display_label" class="control-label" :class="app.lbl_class_left" :for="field.id">\n        {{ field.title }}\n      </label>\n      <label :class="app.lbl_class_left" v-else></label>\n      <div v-if="app.label_horizontal" :class="app.lbl_class_right">\n        <field-input :field="field"></field-input>\n        <help-block :field="field"></help-block>\n      </div>\n      <template v-else>\n        <field-input :field="field"></field-input>\n        <help-block :field="field"></help-block>\n      </template>\n    </div>\n  '
    },
    textarea_field_4 = {
        components: {
            "field-input": {
                props: ["field"],
                mixins: [RootMixin],
                template: '\n        <textarea class="form-control" :id="field.id" :name="field.id" :cols="field.cols" :rows="field.rows" :aria-describedby="app.describedBy(field)" :required="field.required"></textarea>\n      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div class="form-group"  v-bind:class="{row: app.label_horizontal}">\n      <label v-if="app.label_horizontal && field.display_label" :class="[app.lbl_class_left, \'col-form-label\']" :for="field.id">{{ field.title }}</label>\n      <label v-else-if="field.display_label" :for="field.id">{{ field.title }}</label>\n      <label :class="app.lbl_class_left" v-else></label>\n      \n      <div v-if="app.label_horizontal" :class="app.lbl_class_right">\n        <field-input :field="field"></field-input>\n        <help-block :field="field"></help-block>\n      </div>\n      <template v-else>\n        <field-input :field="field"></field-input>\n        <help-block :field="field"></help-block>\n      </template>\n    </div>\n  '
    },
    textarea_field = {
        props: ["field"],
        mixins: [RootMixin],
        components: {
            "textarea-field-3": textarea_field_3,
            "textarea-field-4": textarea_field_4
        },
        template: '\n      <textarea-field-3 v-if="app.bootstrap_3" :field="field"></textarea-field-3>\n      <textarea-field-4 v-else :field="field"></textarea-field-4>\n    '
    },
    select_field_3 = {
        components: {
            "field-input": {
                props: ["field"],
                mixins: [RootMixin],
                template: '\n      <select class="select form-control" :id="field.id" :name="field.id" :multiple="field.multiple" :aria-describedby="app.describedBy(field)" :required="field.required">\n        <option v-for="choice in field.choices" :value="choice.value">\n          {{choice.title}}\n        </option>\n      </select>      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div class="form-group">\n      <label v-if="field.display_label" class="control-label" :class="app.lbl_class_left" :for="field.id">\n        {{ field.title }}\n      </label>\n      <label :class="app.lbl_class_left" v-else></label>\n\n      \n      <div v-if="app.label_horizontal" :class="app.lbl_class_right">\n        <field-input :field="field"></field-input>\n        <help-block :field="field"></help-block>\n      </div>\n      <template v-else>\n        <field-input :field="field"></field-input>\n        <help-block :field="field"></help-block>\n      </template>\n    </div>\n  '
    },
    select_field_4 = {
        components: {
            "field-input": {
                props: ["field"],
                mixins: [RootMixin],
                methods: {
                    className: function() {
                        return this.app.settings.bs4.custom ? "custom-select" : "form-control"
                    }
                },
                template: '\n      <select :class="className()" :id="field.id" :name="field.id" :multiple="field.multiple" :aria-describedby="app.describedBy(field)" :required="field.required">\n        <option v-for="choice in field.choices" :value="choice.value">\n          {{choice.title}}\n        </option>\n      </select>      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div class="form-group"  v-bind:class="{row: app.label_horizontal}">\n      <label v-if="app.label_horizontal && field.display_label" :class="[app.lbl_class_left, \'col-form-label\']" :for="field.id">{{ field.title }}</label>\n      <label v-else-if="field.display_label" :for="field.id">{{ field.title }}</label>\n      <label :class="app.lbl_class_left" v-else></label>      \n      \n      <div v-if="app.label_horizontal" :class="app.lbl_class_right">\n        <field-input :field="field"></field-input>\n        <help-block :field="field"></help-block>\n      </div>\n      <template v-else>\n        <div v-if="app.settings.bs4.custom">\n          <field-input :field="field"></field-input>\n          <help-block :field="field"></help-block>\n        </div>\n        <template v-else>\n          <field-input :field="field"></field-input>\n          <help-block :field="field"></help-block>        \n        </template>\n      </template>\n    </div>\n  '
    },
    select_field = {
        props: ["field"],
        mixins: [RootMixin],
        components: {
            "select-field-3": select_field_3,
            "select-field-4": select_field_4
        },
        template: '\n      <select-field-3 v-if="app.bootstrap_3" :field="field"></select-field-3>\n      <select-field-4 v-else :field="field"></select-field-4>\n    '
    },
    checkradio_field_3 = {
        components: {
            "checkradio-input": {
                props: ["field", "choice"],
                mixins: [RootMixin],
                computed: {
                    isChecked: function() {
                        return helper.x_in_array(this.choice.value, this.field.checked_choices)
                    }
                },
                template: '       \n        <input v-if="field.type ==\'checkbox\'" type="checkbox" :name="field.id" :value="choice.value" v-model="field.checked_choices" :checked-workaround="isChecked" />\n        <input v-else type="radio" :name="field.id" :value="choice.value" />\n      '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n  <div class="form-group">\n    <label v-if="field.display_label" class="control-label" :class="app.lbl_class_left" :for="field.id" >\n      {{ field.title }}\n    </label>\n    <label :class="app.lbl_class_left" v-else></label>\n    <div :class="app.lbl_class_right">\n      <template v-for="choice in field.choices">\n        <template v-if="!field.inline">\n          <div class="checkbox">\n            <label class="checkbox">\n              <checkradio-input :field="field" :choice="choice"></checkradio-input>\n              {{choice.title}}\n            </label> \n          </div>\n        </template>\n        <template v-else>\n          <label :class="field.type+\'-inline\'">\n              <checkradio-input :field="field" :choice="choice"></checkradio-input>\n              {{choice.title}}\n          </label>     \n        </template>\n      </template>\n      <help-block :field="field"></help-block>\n    </div>\n  </div>\n    '
    },
    checkradio_field_4_input = {
        props: ["field", "choice"],
        mixins: [RootMixin],
        methods: {
            className: function() {
                return this.app.settings.bs4.custom ? "custom-control-input" : "form-check-input"
            }
        },
        computed: {
            isChecked: function() {
                return helper.x_in_array(this.choice.value, this.field.checked_choices)
            }
        },
        template: '\n      <input v-if="field.type ==\'checkbox\'" :name="field.id" :value="choice.value" type="checkbox" :class="className()"  v-model="field.checked_choices" :checked-workaround="isChecked" :aria-describedby="app.describedBy(field)" :required="field.required">               \n      <input v-else :name="field.id" :value="choice.value" type="radio" :class="className()"  v-model="field.checked_choices" :checked-workaround="isChecked" :aria-describedby="app.describedBy(field)" :required="field.required">               \n  '
    },
    checkradio_field_4 = {
        components: {
            "checkradio-input": checkradio_field_4_input,
            "custom-checkbox": {
                props: ["field", "choice"],
                mixins: [RootMixin],
                computed: {
                    labelClass: function() {
                        return "custom-" + this.field.type
                    }
                },
                components: {
                    "checkradio-input": checkradio_field_4_input
                },
                template: '\n            <label :class="[\'custom-control\', labelClass]">\n              <checkradio-input :field="field" :choice="choice"></checkradio-input>\n              <span class="custom-control-indicator"></span>\n              <span class="custom-control-description">{{ choice.title }}</span>\n            </label>              \n          '
            },
            "checkradio-label": {
                props: ["field"],
                mixins: [RootMixin],
                template: '\n          <label v-if="field.display_label" :class="[app.lbl_class_left, {\'col-form-label\': (app.label_horizontal & !field.inline)}]">\n            {{ field.title }}\n          </label> \n          <div v-else-if="app.label_horizontal" :class="[app.lbl_class_left]"></div>\n        '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div v-if="app.settings.bs4.custom" :class="[\'form-group\', {\'row\': app.label_horizontal}]">\n    \n      <checkradio-label :field="field"></checkradio-label>\n      \n      <div :class="app.lbl_class_right">\n        <template v-for="choice in field.choices">\n          <div v-if="!field.inline" class="custom-controls-stacked">\n            <custom-checkbox :field="field" :choice="choice"></custom-checkbox>\n          </div>\n          <custom-checkbox v-else :field="field" :choice="choice"></custom-checkbox>\n        </template>\n        <help-block :field="field"></help-block>\n      </div>\n      \n    </div>\n    \n    \n    <div v-else :class="[\'form-group\', {\'row\': app.label_horizontal}]">\n\n      <checkradio-label :field="field"></checkradio-label>\n\n      <div :class="app.lbl_class_right">\n        <div v-for="choice in field.choices"  :class="[\'form-check\', {\'form-check-inline\': field.inline}]">\n            <label class="form-check-label">\n                <checkradio-input :field="field" :choice="choice"></checkradio-input>\n                {{choice.title}}\n            </label> \n        </div>  \n        <help-block :field="field"></help-block>\n      </div>\n    </div>\n  '
    },
    checkradio_field_413_input = {
        props: ["field", "choice", "index"],
        mixins: [RootMixin],
        methods: {
            className: function() {
                return this.app.settings.bs4.custom ? "custom-control-input" : "form-check-input"
            }
        },
        computed: {
            isChecked: function() {
                return helper.x_in_array(this.choice.value, this.field.checked_choices)
            }
        },
        template: '\n      <input v-if="field.type ==\'checkbox\'" :name="field.id" :id="field.id+\'_\'+index" :value="choice.value" type="checkbox" :class="className()"  v-model="field.checked_choices" :checked-workaround="isChecked" :aria-describedby="app.describedBy(field)" :required="field.required">               \n      <input v-else :name="field.id" :value="choice.value" :id="field.id+\'_\'+index" type="radio" :class="className()"  v-model="field.checked_choices" :checked-workaround="isChecked" :aria-describedby="app.describedBy(field)" :required="field.required">               \n  '
    },
    checkradio_field_413 = {
        components: {
            "checkradio-input": checkradio_field_413_input,
            "custom-checkbox": {
                props: ["field", "choice", "index"],
                mixins: [RootMixin],
                computed: {
                    labelClass: function() {
                        return "custom-" + this.field.type
                    }
                },
                components: {
                    "checkradio-input": checkradio_field_413_input
                },
                template: '\n            <div :class="[\'custom-control\', labelClass, {\'custom-control-inline\': field.inline}]">\n              <checkradio-input :field="field" :choice="choice" :id="field.id+\'_\'+index"></checkradio-input>\n              <label class="custom-control-label" :for="field.id+\'_\'+index">{{ choice.title }}</label>\n            </div>              \n          '
            },
            "checkradio-label": {
                props: ["field"],
                mixins: [RootMixin],
                template: '\n          <label v-if="field.display_label" :class="[app.lbl_class_left, {\'col-form-label\': (app.label_horizontal & !field.inline)}]">\n            {{ field.title }}\n          </label> \n          <div v-else-if="app.label_horizontal" :class="[app.lbl_class_left]"></div>\n        '
            }
        },
        props: ["field"],
        mixins: [RootMixin],
        template: '\n    <div v-if="app.settings.bs4.custom" :class="[\'form-group\', {\'row\': app.label_horizontal}]">\n    \n      <checkradio-label :field="field"></checkradio-label>\n      \n      <div :class="app.lbl_class_right">\n        <template v-for="(choice, index) in field.choices">\n          <div v-if="!field.inline" class="custom-controls-stacked">\n            <custom-checkbox :field="field" :choice="choice" :index="index"></custom-checkbox>\n          </div>\n          <custom-checkbox v-else :field="field" :choice="choice" :index="index"></custom-checkbox>\n        </template>\n        <help-block :field="field"></help-block>\n      </div>\n      \n    </div>\n    \n    \n    <div v-else :class="[\'form-group\', {\'row\': app.label_horizontal}]">\n\n      <checkradio-label :field="field"></checkradio-label>\n\n      <div :class="app.lbl_class_right">\n        <div v-for="(choice, index) in field.choices"  :class="[\'form-check\', {\'form-check-inline\': field.inline}]">\n            <checkradio-input :field="field" :choice="choice" :index="index"></checkradio-input>\n            <label class="form-check-label" :for="field.id+\'_\'+index">\n                {{choice.title}}\n            </label> \n        </div>  \n        <help-block :field="field"></help-block>\n      </div>\n    </div>\n  '
    },
    checkradio_field = {
        props: ["field"],
        mixins: [RootMixin],
        components: {
            "checkradio-field-3": checkradio_field_3,
            "checkradio-field-4": checkradio_field_4,
            "checkradio-field-413": checkradio_field_413
        },
        template: '\n      <checkradio-field-3 v-if="app.bootstrap_3" :field="field"></checkradio-field-3>\n      <checkradio-field-4 v-else-if="app.settings.bootstrap_version==\'4\'" :field="field"></checkradio-field-4>\n      <checkradio-field-413 v-else :field="field"></checkradio-field-413>\n    '
    },
    current_field = {
        props: ["field"],
        mixins: [RootMixin],
        components: {
            "text-field": text_field,
            "textarea-field": textarea_field,
            "select-field": select_field,
            "checkradio-field": checkradio_field
        },
        template: '\n    <transition name="message" mode="out-in">\n      <text-field v-if="field.type == \'text\'" :field="field"></text-field>\n      <textarea-field v-else-if="field.type == \'textarea\'" :field="field"></textarea-field>\n      <select-field v-else-if="field.type == \'select\'" :field="field"></select-field>\n      <checkradio-field v-else-if="field.type == \'checkbox\' || field.type == \'radio\'" :field="field"></checkradio-field>\n    </transition>\n\n    '
    },
    GenericMixin = {
        props: ["field"],
        components: {
            "current-field": current_field
        },
        mixins: [RootMixin],
        methods: {},
        template: '\n    <div v-if="editor" @click="app.selectField(field)" class="editor-field-wrapper">\n      <div class="editor-field" v-bind:class="{selected: app.isSelected(field)}">\n        <current-field :field="field"></current-field>\n      </div>\n      <options-subfield :field="field"></options-subfield>\n    </div> \n    <current-field v-else :field="field"></current-field>       \n  '
    },
    SubmitMixin = {
        mixins: [RootMixin],
        components: {
            "submit-group": {
                mixins: [RootMixin],
                components: {
                    "the-button": {
                        mixins: [RootMixin],
                        template: '\n           <button class="btn btn-primary" name="submit" type="submit">\n            {{ app.settings.submit.title }}\n           </button>'
                    }
                },
                template: '\n        <div :class="[\'form-group\', {\'row\': app.label_horizontal}]">\n          <div v-if="app.label_horizontal" :class="[app.lbl_class_left_as_offset, app.lbl_class_right]">\n            <the-button></the-button>\n          </div>\n          <the-button v-else></the-button>\n        </div>         \n      '
            }
        },
        template: '\n    <div v-if="editor" class="editor-field-wrapper">\n      <div class="editor-field">\n        <submit-group></submit-group>\n      </div>\n    </div>\n    <submit-group v-else></submit-group>\n  '
    },
    generic_submit_editor = {
        mixins: [SubmitMixin],
        data: function() {
            return {
                editor: !0
            }
        }
    },
    generic_submit_preview = {
        mixins: [SubmitMixin],
        data: function() {
            return {
                editor: !1
            }
        }
    },
    generic_field_editor = {
        mixins: [GenericMixin],
        props: ["field"],
        data: function() {
            return {
                editor: !0
            }
        }
    },
    generic_field_preview = {
        mixins: [GenericMixin],
        data: function() {
            return {
                editor: !1
            }
        }
    },
    addable_field = {
        props: ["field"],
        template: '\n  <div style="float: left">\n    <button class="btn btn-default">{{field.title}}</button>\n  </div>  \n  ',
        methods: {}
    },
    field_options = {
        props: ["field"],
        template: '\n    <form class="customizable-field-options" v-bind:class="{selected: this.$root.isSelected(field)}" v-if="this.$root.isSelected(field)">\n      <div class="form-group">\n        <label class="control-label">Title</label>\n        <input class="form-control" v-model="field.title">   \n      </div>  \n      <div class="form-group">\n        <label class="control-label">Unique <span class="mono">id</span> and <span class="mono">name</span></label>\n        <input class="form-control" v-model="field.id">   \n      </div>      \n      <div v-if="hasKey(\'placeholder\')" class="form-group">\n        <label class="control-label">Placeholder</label>\n        <input class="form-control" type="text" v-model="field.placeholder">   \n      </div>\n      <div v-if="hasKey(\'prepend\')" class="row">\n        <div class="col-sm-12">\n          <label class="control-label">Prepend</label>\n        </div>      \n        <div class="form-group col-sm-4">\n          <select class="select form-control" name="prepend" v-model="field.prepend">\n            <option value="no">No</option>\n            <option value="text">Text</option>\n            <option value="icon">Icon</option>\n          </select>      \n        </div>\n        <div v-if="field.prepend==\'text\'" class="form-group col-sm-8">\n          <input class="form-control" type="text" v-model="field.prepend_text"> \n        </div>\n        <div class="form-group col-sm-8 icon-picker-container" :class="{hidden: field.prepend!=\'icon\'}" >\n          <div class="input-group iconpicker-container">\n            <span :class="{\'hidden\': !field.prepend_icon}" class="input-group-addon"><i class="fa"></i></span>          \n            <input placeholder="Click to choose icon" class="form-control icp icp-prepend iconpicker-element iconpicker-input" :value="field.prepend_icon" type="text">  \n          </div>          \n        </div>        \n      </div>         \n      <div  v-if="hasKey(\'append\')" class="row">\n        <div class="col-sm-12">\n          <label class="control-label">Append</label>\n        </div>      \n        <div class="form-group col-sm-4">\n          <select class="select form-control" name="append" v-model="field.append">\n            <option value="no">No</option>\n            <option value="text">Text</option>\n            <option value="icon">Icon</option>\n          </select>      \n        </div>\n        <div v-if="field.append==\'text\'" class="form-group col-sm-8">\n          <input class="form-control" type="text" v-model="field.append_text"> \n        </div>\n        <div class="form-group col-sm-8 icon-picker-container" :class="{hidden: field.append!=\'icon\'}" >\n          <div class="input-group iconpicker-container">\n            <input placeholder="Click to choose icon" class="form-control icp icp-append iconpicker-element iconpicker-input" :value="field.append_icon" type="text">  \n            <span :class="{\'hidden\': !field.append_icon}" class="input-group-addon"><i class="fa"></i></span>\n          </div>          \n        </div>        \n      </div>   \n      <div v-if="hasKey(\'help\')" class="form-group">\n        <label class="control-label">Help text (instructions)</label>\n        <input class="form-control" type="text" v-model="field.help"> \n      </div>           \n      <div v-if="hasKey(\'rows\')" class="form-group">\n        <label class="control-label">Rows</label>\n        <input class="form-control" type="text" v-model="field.rows">   \n      </div>      \n      <div v-if="hasKey(\'inline\')" class="form-group">\n        <label class="control-label">\n          <input type="checkbox" v-model="field.inline">\n          Display inline?\n        </label>  \n      </div>     \n      <div v-if="hasKey(\'display_label\')" class="form-group">\n        <label class="control-label">\n          <input type="checkbox" v-model="field.display_label">\n          Display label?\n        </label>  \n      </div>    \n      <div v-if="hasKey(\'required\')" class="form-group">\n        <label class="control-label">\n          <input type="checkbox" v-model="field.required">\n          Required field?\n        </label>  \n      </div>          \n      <div v-if="hasKey(\'multiple\')" class="form-group">\n        <label class="control-label">\n          <input type="checkbox" v-model="field.multiple">\n          Allow multiple selections?\n        </label>  \n      </div>         \n      <div v-if="hasKey(\'choices\')" class="form-group">\n        <div>\n          <label class="control-label">Choices:</label>\n        </div>        \n        <div class="choice-grandparent">\n          <div class="choice-parent text-center">\n            <em>Title</em>\n          </div>  \n          <div class="choice-parent text-center">\n            <em>Value</em>\n          </div> \n          <div class="choice-parent-check text-center">\n            <i v-if="field.type==\'checkbox\'" class="fa fa-check-square"></i> \n          </div>          \n          <div class="choice-add-remove"></div>\n        </div>\n        <div v-for="choice in field.choices" class="choice-grandparent">\n          <div class="choice-parent">\n            <input class="form-control cursor-pointer" placeholder="Title" type="text" v-model="choice.title">\n          </div>\n          <div class="choice-parent">\n            <input class="form-control cursor-pointer" placeholder="Value" type="text" v-model="choice.value">\n          </div>\n          <div class="choice-parent-check text-center">\n            <label v-if="field.type==\'checkbox\'" class="control-label"><input type="checkbox" :value="choice.value" v-model="field.checked_choices"></label>\n          </div>          \n          <div class="choice-add-remove">\n            <i @click="removeChoice(choice)"class="fa fa-minus-square-o remove-choice cursor-pointer" aria-hidden="true"></i>       \n          </div>  \n        </div>\n        <div class="choice-grandparent">\n          <div class="choice-parent"></div>\n          <div class="choice-parent"></div>\n          <div class="choice-parent-check"></div>                   \n          <div class="choice-add-remove add-choice cursor-pointer" style="height: 34px; padding-top: 10px;">\n            <i @click="addChoice()" class="fa fa-plus-square-o" aria-hidden="true"></i>       \n          </div>   \n        </div>\n      </div>      \n    </form>\n    <p v-else>After you create a field, you can edit it here.</p>\n  ',
        methods: {
            hasKey: function(e) {
                return this.field.hasOwnProperty(e)
            },
            removeChoice: function(e) {
                var i = this.field.choices;
                i.forEach(function(l, n) {
                    e == l && i.splice(n, 1)
                })
            },
            addChoice: function() {
                this.field.choices.push({
                    value: "",
                    title: "",
                    initial: !1
                })
            },
            chooseIcon: function(e) {
                console.log(e)
            }
        }
    },
    form_settings = {
        mixins: [RootMixin],
        props: ["settings"],
        template: '\n    <form>\n      <div class="form-group">\n        <label class="control-label">Bootstrap Version</label>\n        <select class="form-control" v-model="settings.bootstrap_version">\n          <option value="3">Bootstrap 3 (3.3.7)</option>\n          <option value="4">Bootstrap 4 (4.0.0)</option>\n          <option value="413">Bootstrap 4 (4.1.3)</option>\n        </select>\n      </div>    \n      <div v-if="!app.bootstrap_3" class="form-group">\n        <label class="control-label">\n          <input type="checkbox" v-model="app.settings.bs4.custom">\n          Use Custom/Shiny Inputs\n        </label>  \n      </div>       \n      <div class="form-group">\n        <label class="control-label">Label Orientation</label>\n        <select class="form-control" v-model="settings.label_orientation.value">\n          <option value="vertical">Vertical (above input)</option>\n          <option value="horizontal">Horizontal (left of input)</option>\n        </select>\n      </div>\n      <div class="form-group" v-if="app.label_horizontal">\n        <label class="control-label">Label Width</label>\n        <select class="form-control" v-model="settings.label_orientation.left">\n          <option value="2">17% (2/12th)</option>\n          <option value="3">25% (3/12th)</option>\n          <option value="4">33% (4/12th)</option>\n          <option value="5">42% (5/12th)</option>\n          <option value="6">50% (6/12th)</option>\n        </select>\n      </div>\n      <div class="form-group">\n        <label class="control-label">Submit Button Title</label>\n        <input class="form-control" type="text" v-model="settings.submit.title"> \n      </div>\n      <div class="form-group">\n        <label class="control-label">\n          <input type="checkbox" v-model="app.settings.requirements.font_awesome">\n          Include Font Awesome CDN\n        </label>  \n      </div>          \n    </form>    \n  ',
        methods: {}
    },
    code_preview = {
        props: [],
        mixins: [RootMixin],
        components: {
            "generic-field-preview": generic_field_preview,
            "generic-submit-preview": generic_submit_preview
        },
        template: '\n    <div>\n      <div id="code-preview-head">\n          <link v-if="app.settings.bootstrap_version==3" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />      \n          <link v-else-if="app.settings.bootstrap_version==4" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"> \n          <link v-else rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">\n          <link v-if="app.settings.requirements.font_awesome" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />    \n      </div>\n      <div id="code-preview-form">\n        <form :class="{\'form-horizontal\': app.use_form_horizontal_class}">\n          <generic-field-preview :field="field" v-for="field in app.fields" :key="field.id" ></generic-field-preview>\n          <generic-submit-preview v-if="!app.noFields()"></generic-submit-preview>\n        </form>\n      </div>\n    </div>\n  '
    };
Vue.component("pre-dynamic", {
    template: '\n      <div>\n        <pre><code id="code-destination" class="language-html"></code></pre>\n      </div>\n    ',
    components: {
        "generic-field-preview": generic_field_preview,
        "code-preview": code_preview
    },
    methods: {},
    data: function() {
        return {
            fields: this.$root.fields,
            settings: this.$root.settings
        }
    },
    mounted: function() {
        setTimeout(function() {
            app.updateCodePreview(), app.updateIframeHeight()
        }, 10)
    },
    watch: {
        $data: {
            handler: function(e, i) {
                Vue.nextTick(function() {
                    app.updateCodePreview(), app.updateIframeHeight(), app.save()
                })
            },
            deep: !0
        }
    }
}), document.body.ondrop = function(e) {
    e.preventDefault(), e.stopPropagation()
}, Vue.component("virtual-iframe", {
    render(e) {
        return e("iframe", {
            on: {
                load: this.renderChildren
            }
        })
    },
    beforeUpdate() {
        this.iApp && (this.iApp.children = Object.freeze(this.$slots.default))
    },
    props: ["app"],
    methods: {
        renderChildren() {
            const e = this.$slots.default,
                i = this.$el.contentDocument.body,
                l = document.createElement("DIV");
            i.appendChild(l);
            const n = new Vue({
                name: "iApp",
                data: {
                    children: Object.freeze(e)
                },
                render(e) {
                    return e("div", this.children)
                }
            });
            n.$mount(l), this.iApp = n
        }
    }
}), Vue.component("iframe-child", {
    template: "<div>\n      <slot/>\n  </div>",
    props: [],
    methods: {
        log: _.debounce(function() {}, 200)
    },
    mounted() {
        this.$nextTick(() => {
            this.$el.ownerDocument.defaultView.addEventListener("resize", this.log)
        })
    },
    beforeDestroy() {
        this.$el.ownerDocument.defaultView.removeEventListener("resize", this.log)
    }
});
var data = {
        clipboard: {
            all: "",
            form: "",
            head: ""
        },
        uiv: {
            modal: {
                download: !1,
                share: !1
            },
            tooltip: {
                copy_success: !1
            },
            tabs: {
                left: 0
            }
        },
        tweeted: !1,
        tweet: "https://twitter.com/intent/tweet?status=Just created a form with the Bootstrap Form Builder by @cyouderian. Supports versions 3 and 4.  Check it out at: https://bootstrapformbuilder.com.",
        settings: {
            bootstrap_version: 413,
            label_orientation: {
                value: "horizontal",
                left: 4
            },
            submit: {
                title: "Submit"
            },
            bs4: {
                custom: !0
            },
            requirements: {
                font_awesome: !0
            }
        },
        addable_fields: [{
            title: "Text Field",
            type: "text",
            id: "text",
            placeholder: "",
            prepend: "no",
            prepend_text: "",
            prepend_icon: "",
            append: "no",
            append_text: "",
            append_icon: "",
            display_label: !0,
            help: "",
            required: !1
        }, {
            title: "Text Area",
            type: "textarea",
            id: "textarea",
            cols: 40,
            rows: 5,
            display_label: !0,
            help: "",
            required: !1
        }, {
            title: "Select",
            type: "select",
            id: "select",
            choices: [{
                title: "Rabbit",
                value: "rabbit"
            }, {
                title: "Duck",
                value: "duck"
            }, {
                title: "Fish",
                value: "fish"
            }],
            display_label: !0,
            help: "",
            required: !1,
            multiple: !1,
            help: ""
        }, {
            title: "Radio Buttons",
            type: "radio",
            id: "radio",
            choices: [{
                title: "Rabbit",
                value: "rabbit"
            }, {
                title: "Duck",
                value: "duck"
            }, {
                title: "Fish",
                value: "fish"
            }],
            inline: !0,
            display_label: !0,
            required: !1,
            help: ""
        }, {
            title: "Checkboxes",
            type: "checkbox",
            id: "checkbox",
            choices: [{
                title: "Rabbit",
                value: "rabbit"
            }, {
                title: "Duck",
                value: "duck"
            }, {
                title: "Fish",
                value: "fish"
            }],
            inline: !0,
            display_label: !0,
            help: "",
            required: !1,
            checked_choices: ["rabbit"]
        }],
        fields: [{
            title: "Text Field",
            type: "text",
            id: "text",
            placeholder: "",
            prepend: "icon",
            prepend_text: "",
            prepend_icon: "fa-address-card",
            append: "no",
            append_text: "",
            append_icon: "",
            display_label: !0,
            help: "",
            required: !1
        }],
        dragging: !1,
        selected: !1
    },
    saved_string = sessionStorage.saved;
if (saved_string) {
    var saved = JSON.parse(saved_string);
    data.fields = saved.fields, data.settings = saved.settings
}
var app = new Vue({
    el: "#app",
    components: {
        "generic-field-editor": generic_field_editor,
        "generic-submit-editor": generic_submit_editor,
        "addable-field": addable_field,
        "field-options": field_options,
        "form-settings": form_settings,
        "code-preview": code_preview
    },
    mixins: [],
    data: data,
    watch: {
        bootstrap_version: function() {
            var e = document.getElementById("editor-iframe");
            helper.fade_in(e)
        }
    },
    computed: {
        supported: function() {
            return helper.getInternetExplorerVersion() < 0
        },
        prefix: function() {
            return this.bootstrap_3 ? "col-xs-" : "col-"
        },
        lbl_class_left: function() {
            if (!this.label_horizontal) return !1;
            var e = this.settings.label_orientation.left;
            return this.prefix + e
        },
        lbl_class_left_as_offset: function() {
            if (!this.label_horizontal) return !1;
            var e = this.settings.label_orientation.left;
            return (this.bootstrap_3 ? this.prefix : "") + "offset-" + e
        },
        lbl_class_right: function() {
            if (!this.label_horizontal) return !1;
            var e = 12 - this.settings.label_orientation.left;
            return this.prefix + e
        },
        label_horizontal: function() {
            return "horizontal" == this.settings.label_orientation.value
        },
        use_form_horizontal_class: function() {
            return !(!this.label_horizontal || !this.bootstrap_3)
        },
        bootstrap_3: function() {
            return "3" == this.settings.bootstrap_version
        },
        bootstrap_version: function() {
            return this.settings.bootstrap_version
        },
        fields_exist: function() {
            return this.fields.length > 0
        }
    },
    methods: {
        updateCodePreview: function() {
            function e(e) {
                return e.replace(new RegExp("<", "g"), "&lt;").replace(/^\s+|\s+$/g, "").replace(new RegExp(' class=""', "g"), "").replace(new RegExp('checked-workaround="true"', "g"), 'checked="checked"').replace(new RegExp("[ ]*&lt;!----\x3e[ ]*", "g"), "").replace(new RegExp(' placeholder=""', "g"), "")
            }

            function i(e) {
                return e.replace(new RegExp("&lt;", "g"), "<")
            }
            var l = document.getElementById("preview-iframe"),
                n = l.contentDocument || l.contentWindow.document,
                t = this;
            helper.ready(n, function() {
                setTimeout(function() {
                    if (!(!location.hostname.match("bootstrapformbuilder.com") && !location.hostname.match("192.168.195.10"))) {
                        n.getElementById("code-preview-form");
                        var l = n.getElementById("code-preview-form").innerHTML,
                            o = e(helper.indent(l)),
                            d = n.getElementById("code-preview-head").innerHTML,
                            a = e(helper.indent(d)),
                            c = document.getElementById("code-destination"),
                            s = a + "\n\n" + o;
                        c.innerHTML = s, t.clipboard.all = i(s), t.clipboard.head = i(a), t.clipboard.form = i(o), Prism.highlightElement(c)
                    }
                }, 300)
            })
        },
        tabClicked: function(e) {
            0 === e && this.updateIframeHeight()
        },
        updateIframeHeight: function() {
            var e = document.getElementById("editor-iframe"),
                i = e.contentDocument || e.contentWindow.document;
            helper.ready(i, function() {
                setTimeout(function() {
                    var l = i.body.firstChild.offsetHeight;
                    e.style.height = l + 100 + "px"
                }, 300)
            })
        },
        save: function() {
            var e = {};
            e.fields = this.fields, e.settings = this.settings;
            var i = JSON.stringify(e);
            sessionStorage.saved = i
        },
        downloadHtml: function() {
            this.tweeted || (this.uiv.modal.download = !0);
            var e = document.getElementById("preview-iframe"),
                i = (e.contentDocument || e.contentWindow.document, '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta http-equiv="content-type" content="text/html; charset=UTF-8">\n    <meta charset="utf-8">\n    <title>Form</title>\n' + helper.indentStr(this.$root.clipboard.head, 4) + "\n  </head>\n  <body>\n" + helper.indentStr(this.$root.clipboard.form, 4) + "\n  </body>\n</html>\n");
            helper.download_html("form.html", i)
        },
        initIconPicker: function(e) {
            $(".icp-prepend").off(), $(".icp-append").off(), $.iconpicker.batch(".icp", "destroy");
            $(".icp").iconpicker({
                placement: "right",
                hideOnSelect: !0,
                templates: {
                    search: '<input type="search" class="form-control iconpicker-search" placeholder="Search..." />'
                }
            });

            function i(i, l) {
                var n = i.iconpickerValue;
                "append" == l ? e.append_icon = n : e.prepend_icon = n
            }
            $(".icp-prepend").on("iconpickerSelected", function(e) {
                return i(e, "prepend"), !1
            }), $(".icp-append").on("iconpickerSelected", function(e) {
                return i(e, "append"), !1
            })
        },
        copySuccess: function() {
            var e = this;
            e.uiv.tooltip.copy_success = !0, setTimeout(function() {
                e.uiv.tooltip.copy_success = !1
            }, 1e3)
        },
        copyFail: function() {
            alert("Your browser doesn't support copying. Press Ctrl+C to copy manually.")
        },
        allGone: function() {
            this.noFields() && (this.uiv.tabs.left = 0)
        },
        clickAddable: function(e) {
            var i = this,
                l = i.addable_fields[e.oldIndex];
            setTimeout(function() {
                if (!i.dragging) {
                    i.fields.push(l);
                    var e = i.fields.length - 1;
                    i.generateField(e);
                    var n = i.fields[e];
                    i.selectField(n)
                }
            }, 100)
        },
        selectField: function(e) {
            this.selected = e, this.uiv.tabs.left = 1, this.allGone();
            var i = this;
            setTimeout(function() {
                i.initIconPicker(e)
            }, 10)
        },
        exists: function(e) {
            for (var i = this.fields, l = 0; l < i.length; l++) {
                if (e == i[l]) return !0
            }
            return !1
        },
        isSelected: function(e) {
            return !!this.exists(e) && this.selected == e
        },
        decodeHtml: function(e) {
            var i = document.createElement("textarea");
            return i.innerHTML = e, i.value
        },
        describedBy: function(e) {
            return !!e.help && e.id + "HelpBlock"
        },
        generateField: function(e) {
            var i = helper.clone(this.fields[e]);
            this.fields[e] = i, i.id = function(e, i) {
                e.current_field = !0;
                for (var l = [], n = 0; n < i.length; n++) {
                    var t = i[n];
                    t.current_field || l.push(t.id)
                }
                for (var o = 0; o < 100;) {
                    var d = o > 0 ? e.type + o : e.type;
                    if (o++, !helper.x_in_array(d, l)) return d
                }
                return console.log("Can't get unique id"), ""
            }(i, this.fields), i.current_field = !1
        },
        createField: function(e) {
            this.generateField(e.newIndex);
            var i = this.fields[e.newIndex];
            this.selectField(i)
        },
        noFields: function() {
            return !(this.fields.length > 0)
        }
    }
});