/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
YAHOO.util.Attribute = function (b, a) {
    if (a) {
        this.owner = a;
        this.configure(b, true);
    }
};
YAHOO.util.Attribute.INVALID_VALUE = {};
YAHOO.util.Attribute.prototype = {
    name: undefined,
    value: null,
    owner: null,
    readOnly: false,
    writeOnce: false,
    _initialConfig: null,
    _written: false,
    method: null,
    setter: null,
    getter: null,
    validator: null,
    getValue: function () {
        var a = this.value;
        if (this.getter) {
            a = this.getter.call(this.owner, this.name, a);
        }
        return a;
    },
    setValue: function (f, b) {
        var e, a = this.owner,
            c = this.name,
            g = YAHOO.util.Attribute.INVALID_VALUE,
            d = {
                type: c,
                prevValue: this.getValue(),
                newValue: f
            };
        if (this.readOnly || (this.writeOnce && this._written)) {
            return false;
        }
        if (this.validator && !this.validator.call(a, f)) {
            return false;
        }
        if (!b) {
            e = a.fireBeforeChangeEvent(d);
            if (e === false) {
                return false;
            }
        }
        if (this.setter) {
            f = this.setter.call(a, f, this.name);
            if (f === undefined) {}
            if (f === g) {
                return false;
            }
        }
        if (this.method) {
            if (this.method.call(a, f, this.name) === g) {
                return false;
            }
        }
        this.value = f;
        this._written = true;
        d.type = c;
        if (!b) {
            this.owner.fireChangeEvent(d);
        }
        return true;
    },
    configure: function (b, c) {
        b = b || {};
        if (c) {
            this._written = false;
        }
        this._initialConfig = this._initialConfig || {};
        for (var a in b) {
            if (b.hasOwnProperty(a)) {
                this[a] = b[a];
                if (c) {
                    this._initialConfig[a] = b[a];
                }
            }
        }
    },
    resetValue: function () {
        return this.setValue(this._initialConfig.value);
    },
    resetConfig: function () {
        this.configure(this._initialConfig, true);
    },
    refresh: function (a) {
        this.setValue(this.value, a);
    }
};
(function () {
    var a = YAHOO.util.Lang;
    YAHOO.util.AttributeProvider = function () {};
    YAHOO.util.AttributeProvider.prototype = {
        _configs: null,
        get: function (c) {
            this._configs = this._configs || {};
            var b = this._configs[c];
            if (!b || !this._configs.hasOwnProperty(c)) {
                return null;
            }
            return b.getValue();
        },
        set: function (d, e, b) {
            this._configs = this._configs || {};
            var c = this._configs[d];
            if (!c) {
                return false;
            }
            return c.setValue(e, b);
        },
        getAttributeKeys: function () {
            this._configs = this._configs;
            var c = [],
                b;
            for (b in this._configs) {
                if (a.hasOwnProperty(this._configs, b) && !a.isUndefined(this._configs[b])) {
                    c[c.length] = b;
                }
            }
            return c;
        },
        setAttributes: function (d, b) {
            for (var c in d) {
                if (a.hasOwnProperty(d, c)) {
                    this.set(c, d[c], b);
                }
            }
        },
        resetValue: function (c, b) {
            this._configs = this._configs || {};
            if (this._configs[c]) {
                this.set(c, this._configs[c]._initialConfig.value, b);
                return true;
            }
            return false;
        },
        refresh: function (e, c) {
            this._configs = this._configs || {};
            var f = this._configs;
            e = ((a.isString(e)) ? [e] : e) || this.getAttributeKeys();
            for (var d = 0, b = e.length; d < b; ++d) {
                if (f.hasOwnProperty(e[d])) {
                    this._configs[e[d]].refresh(c);
                }
            }
        },
        register: function (b, c) {
            this.setAttributeConfig(b, c);
        },
        getAttributeConfig: function (c) {
            this._configs = this._configs || {};
            var b = this._configs[c] || {};
            var d = {};
            for (c in b) {
                if (a.hasOwnProperty(b, c)) {
                    d[c] = b[c];
                }
            }
            return d;
        },
        setAttributeConfig: function (b, c, d) {
            this._configs = this._configs || {};
            c = c || {};
            if (!this._configs[b]) {
                c.name = b;
                this._configs[b] = this.createAttribute(c);
            } else {
                this._configs[b].configure(c, d);
            }
        },
        configureAttribute: function (b, c, d) {
            this.setAttributeConfig(b, c, d);
        },
        resetAttributeConfig: function (b) {
            this._configs = this._configs || {};
            this._configs[b].resetConfig();
        },
        subscribe: function (b, c) {
            this._events = this._events || {};
            if (!(b in this._events)) {
                this._events[b] = this.createEvent(b);
            }
            YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments);
        },
        on: function () {
            this.subscribe.apply(this, arguments);
        },
        addListener: function () {
            this.subscribe.apply(this, arguments);
        },
        fireBeforeChangeEvent: function (c) {
            var b = "before";
            b += c.type.charAt(0).toUpperCase() + c.type.substr(1) + "Change";
            c.type = b;
            return this.fireEvent(c.type, c);
        },
        fireChangeEvent: function (b) {
            b.type += "Change";
            return this.fireEvent(b.type, b);
        },
        createAttribute: function (b) {
            return new YAHOO.util.Attribute(b, this);
        }
    };
    YAHOO.augment(YAHOO.util.AttributeProvider, YAHOO.util.EventProvider);
})();
(function () {
    var b = YAHOO.util.Dom,
        d = YAHOO.util.AttributeProvider,
        c = {
            mouseenter: true,
            mouseleave: true
        };
    var a = function (e, f) {
        this.init.apply(this, arguments);
    };
    a.DOM_EVENTS = {
        "click": true,
        "dblclick": true,
        "keydown": true,
        "keypress": true,
        "keyup": true,
        "mousedown": true,
        "mousemove": true,
        "mouseout": true,
        "mouseover": true,
        "mouseup": true,
        "mouseenter": true,
        "mouseleave": true,
        "focus": true,
        "blur": true,
        "submit": true,
        "change": true
    };
    a.prototype = {
        DOM_EVENTS: null,
        DEFAULT_HTML_SETTER: function (g, e) {
            var f = this.get("element");
            if (f) {
                f[e] = g;
            }
            return g;
        },
        DEFAULT_HTML_GETTER: function (e) {
            var f = this.get("element"),
                g;
            if (f) {
                g = f[e];
            }
            return g;
        },
        appendChild: function (e) {
            e = e.get ? e.get("element") : e;
            return this.get("element").appendChild(e);
        },
        getElementsByTagName: function (e) {
            return this.get("element").getElementsByTagName(e);
        },
        hasChildNodes: function () {
            return this.get("element").hasChildNodes();
        },
        insertBefore: function (e, f) {
            e = e.get ? e.get("element") : e;
            f = (f && f.get) ? f.get("element") : f;
            return this.get("element").insertBefore(e, f);
        },
        removeChild: function (e) {
            e = e.get ? e.get("element") : e;
            return this.get("element").removeChild(e);
        },
        replaceChild: function (e, f) {
            e = e.get ? e.get("element") : e;
            f = f.get ? f.get("element") : f;
            return this.get("element").replaceChild(e, f);
        },
        initAttributes: function (e) {},
        addListener: function (j, i, k, h) {
            h = h || this;
            var e = YAHOO.util.Event,
                g = this.get("element") || this.get("id"),
                f = this;
            if (c[j] && !e._createMouseDelegate) {
                return false;
            }
            if (!this._events[j]) {
                if (g && this.DOM_EVENTS[j]) {
                    e.on(g, j, function (m, l) {
                        if (m.srcElement && !m.target) {
                            m.target = m.srcElement;
                        }
                        if ((m.toElement && !m.relatedTarget) || (m.fromElement && !m.relatedTarget)) {
                            m.relatedTarget = e.getRelatedTarget(m);
                        }
                        if (!m.currentTarget) {
                            m.currentTarget = g;
                        }
                        f.fireEvent(j, m, l);
                    }, k, h);
                }
                this.createEvent(j, {
                    scope: this
                });
            }
            return YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments);
        },
        on: function () {
            return this.addListener.apply(this, arguments);
        },
        subscribe: function () {
            return this.addListener.apply(this, arguments);
        },
        removeListener: function (f, e) {
            return this.unsubscribe.apply(this, arguments);
        },
        addClass: function (e) {
            b.addClass(this.get("element"), e);
        },
        getElementsByClassName: function (f, e) {
            return b.getElementsByClassName(f, e, this.get("element"));
        },
        hasClass: function (e) {
            return b.hasClass(this.get("element"), e);
        },
        removeClass: function (e) {
            return b.removeClass(this.get("element"), e);
        },
        replaceClass: function (f, e) {
            return b.replaceClass(this.get("element"), f, e);
        },
        setStyle: function (f, e) {
            return b.setStyle(this.get("element"), f, e);
        },
        getStyle: function (e) {
            return b.getStyle(this.get("element"), e);
        },
        fireQueue: function () {
            var f = this._queue;
            for (var g = 0, e = f.length; g < e; ++g) {
                this[f[g][0]].apply(this, f[g][1]);
            }
        },
        appendTo: function (f, g) {
            f = (f.get) ? f.get("element") : b.get(f);
            this.fireEvent("beforeAppendTo", {
                type: "beforeAppendTo",
                target: f
            });
            g = (g && g.get) ? g.get("element") : b.get(g);
            var e = this.get("element");
            if (!e) {
                return false;
            }
            if (!f) {
                return false;
            }
            if (e.parent != f) {
                if (g) {
                    f.insertBefore(e, g);
                } else {
                    f.appendChild(e);
                }
            }
            this.fireEvent("appendTo", {
                type: "appendTo",
                target: f
            });
            return e;
        },
        get: function (e) {
            var g = this._configs || {}, f = g.element;
            if (f && !g[e] && !YAHOO.lang.isUndefined(f.value[e])) {
                this._setHTMLAttrConfig(e);
            }
            return d.prototype.get.call(this, e);
        },
        setAttributes: function (l, h) {
            var f = {}, j = this._configOrder;
            for (var k = 0, e = j.length; k < e; ++k) {
                if (l[j[k]] !== undefined) {
                    f[j[k]] = true;
                    this.set(j[k], l[j[k]], h);
                }
            }
            for (var g in l) {
                if (l.hasOwnProperty(g) && !f[g]) {
                    this.set(g, l[g], h);
                }
            }
        },
        set: function (f, h, e) {
            var g = this.get("element");
            if (!g) {
                this._queue[this._queue.length] = ["set", arguments];
                if (this._configs[f]) {
                    this._configs[f].value = h;
                }
                return;
            }
            if (!this._configs[f] && !YAHOO.lang.isUndefined(g[f])) {
                this._setHTMLAttrConfig(f);
            }
            return d.prototype.set.apply(this, arguments);
        },
        setAttributeConfig: function (e, f, g) {
            this._configOrder.push(e);
            d.prototype.setAttributeConfig.apply(this, arguments);
        },
        createEvent: function (f, e) {
            this._events[f] = true;
            return d.prototype.createEvent.apply(this, arguments);
        },
        init: function (f, e) {
            this._initElement(f, e);
        },
        destroy: function () {
            var e = this.get("element");
            YAHOO.util.Event.purgeElement(e, true);
            this.unsubscribeAll();
            if (e && e.parentNode) {
                e.parentNode.removeChild(e);
            }
            this._queue = [];
            this._events = {};
            this._configs = {};
            this._configOrder = [];
        },
        _initElement: function (g, f) {
            this._queue = this._queue || [];
            this._events = this._events || {};
            this._configs = this._configs || {};
            this._configOrder = [];
            f = f || {};
            f.element = f.element || g || null;
            var i = false;
            var e = a.DOM_EVENTS;
            this.DOM_EVENTS = this.DOM_EVENTS || {};
            for (var h in e) {
                if (e.hasOwnProperty(h)) {
                    this.DOM_EVENTS[h] = e[h];
                }
            }
            if (typeof f.element === "string") {
                this._setHTMLAttrConfig("id", {
                    value: f.element
                });
            }
            if (b.get(f.element)) {
                i = true;
                this._initHTMLElement(f);
                this._initContent(f);
            }
            YAHOO.util.Event.onAvailable(f.element, function () {
                if (!i) {
                    this._initHTMLElement(f);
                }
                this.fireEvent("available", {
                    type: "available",
                    target: b.get(f.element)
                });
            }, this, true);
            YAHOO.util.Event.onContentReady(f.element, function () {
                if (!i) {
                    this._initContent(f);
                }
                this.fireEvent("contentReady", {
                    type: "contentReady",
                    target: b.get(f.element)
                });
            }, this, true);
        },
        _initHTMLElement: function (e) {
            this.setAttributeConfig("element", {
                value: b.get(e.element),
                readOnly: true
            });
        },
        _initContent: function (e) {
            this.initAttributes(e);
            this.setAttributes(e, true);
            this.fireQueue();
        },
        _setHTMLAttrConfig: function (e, g) {
            var f = this.get("element");
            g = g || {};
            g.name = e;
            g.setter = g.setter || this.DEFAULT_HTML_SETTER;
            g.getter = g.getter || this.DEFAULT_HTML_GETTER;
            g.value = g.value || f[e];
            this._configs[e] = new YAHOO.util.Attribute(g, this);
        }
    };
    YAHOO.augment(a, d);
    YAHOO.util.Element = a;
})();
YAHOO.register("element", YAHOO.util.Element, {
    version: "2.9.0",
    build: "2800"
});