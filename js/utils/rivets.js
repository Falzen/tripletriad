// Rivets.js + Sightglass.js
// version: 0.9.3
// author: Michael Richards
// license: MIT
(function() {
    function t(t, s, i, h) {
        return new e(t, s, i, h)
    }

    function e(t, e, i, h) {
        this.options = h || {}, this.options.adapters = this.options.adapters || {}, this.obj = t, this.keypath = e, this.callback = i, this.objectPath = [], this.update = this.update.bind(this), this.parse(), s(this.target = this.realize()) && this.set(!0, this.key, this.target, this.callback)
    }

    function s(t) {
        return "object" == typeof t && null !== t
    }

    function i(t) {
        throw new Error("[sightglass] " + t)
    }
    t.adapters = {}, e.tokenize = function(t, e, s) {
        var i, h, a = [],
            o = {
                i: s,
                path: ""
            };
        for (i = 0; i < t.length; i++) h = t.charAt(i), ~e.indexOf(h) ? (a.push(o), o = {
            i: h,
            path: ""
        }) : o.path += h;
        return a.push(o), a
    }, e.prototype.parse = function() {
        var s, h, a = this.interfaces();
        a.length || i("Must define at least one adapter interface."), ~a.indexOf(this.keypath[0]) ? (s = this.keypath[0], h = this.keypath.substr(1)) : ("undefined" == typeof(s = this.options.root || t.root) && i("Must define a default root adapter."), h = this.keypath), this.tokens = e.tokenize(h, a, s), this.key = this.tokens.pop()
    }, e.prototype.realize = function() {
        var t, e = this.obj,
            i = !1;
        return this.tokens.forEach(function(h, a) {
            s(e) ? ("undefined" != typeof this.objectPath[a] ? e !== (t = this.objectPath[a]) && (this.set(!1, h, t, this.update), this.set(!0, h, e, this.update), this.objectPath[a] = e) : (this.set(!0, h, e, this.update), this.objectPath[a] = e), e = this.get(h, e)) : (i === !1 && (i = a), (t = this.objectPath[a]) && this.set(!1, h, t, this.update))
        }, this), i !== !1 && this.objectPath.splice(i), e
    }, e.prototype.update = function() {
        var t, e;
        (t = this.realize()) !== this.target && (s(this.target) && this.set(!1, this.key, this.target, this.callback), s(t) && this.set(!0, this.key, t, this.callback), e = this.value(), this.target = t, (this.value() instanceof Function || this.value() !== e) && this.callback())
    }, e.prototype.value = function() {
        return s(this.target) ? this.get(this.key, this.target) : void 0
    }, e.prototype.setValue = function(t) {
        s(this.target) && this.adapter(this.key).set(this.target, this.key.path, t)
    }, e.prototype.get = function(t, e) {
        return this.adapter(t).get(e, t.path)
    }, e.prototype.set = function(t, e, s, i) {
        var h = t ? "observe" : "unobserve";
        this.adapter(e)[h](s, e.path, i)
    }, e.prototype.interfaces = function() {
        var e = Object.keys(this.options.adapters);
        return Object.keys(t.adapters).forEach(function(t) {
            ~e.indexOf(t) || e.push(t)
        }), e
    }, e.prototype.adapter = function(e) {
        return this.options.adapters[e.i] || t.adapters[e.i]
    }, e.prototype.unobserve = function() {
        var t;
        this.tokens.forEach(function(e, s) {
            (t = this.objectPath[s]) && this.set(!1, e, t, this.update)
        }, this), s(this.target) && this.set(!1, this.key, this.target, this.callback)
    }, "undefined" != typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd ? define([], function() {
        return this.sightglass = t
    }) : this.sightglass = t
}).call(this);
(function() {
    var t, e, i, n, r = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        s = [].slice,
        o = {}.hasOwnProperty,
        u = function(t, e) {
            function i() {
                this.constructor = t
            }
            for (var n in e) o.call(e, n) && (t[n] = e[n]);
            return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
        },
        l = [].indexOf || function(t) {
            for (var e = 0, i = this.length; i > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    t = {
        options: ["prefix", "templateDelimiters", "rootInterface", "preloadData", "handler", "executeFunctions"],
        extensions: ["binders", "formatters", "components", "adapters"],
        "public": {
            binders: {},
            components: {},
            formatters: {},
            adapters: {},
            prefix: "rv",
            templateDelimiters: ["{", "}"],
            rootInterface: ".",
            preloadData: !0,
            executeFunctions: !1,
            iterationAlias: function(t) {
                return "%" + t + "%"
            },
            handler: function(t, e, i) {
                return this.call(t, e, i.view.models)
            },
            configure: function(e) {
                var i, n, r, s;
                null == e && (e = {});
                for (r in e)
                    if (s = e[r], "binders" === r || "components" === r || "formatters" === r || "adapters" === r)
                        for (n in s) i = s[n], t[r][n] = i;
                    else t["public"][r] = s
            },
            bind: function(e, i, n) {
                var r;
                return null == i && (i = {}), null == n && (n = {}), r = new t.View(e, i, n), r.bind(), r
            },
            init: function(e, i, n) {
                var r, s, o;
                if (null == n && (n = {}), null == i && (i = document.createElement("div")), e = t["public"].components[e], s = e.template.call(this, i), s instanceof HTMLElement) {
                    for (; i.firstChild;) i.removeChild(i.firstChild);
                    i.appendChild(s)
                } else i.innerHTML = s;
                return r = e.initialize.call(this, i, n), o = new t.View(i, r), o.bind(), o
            }
        }
    }, window.jQuery || window.$ ? (n = "on" in jQuery.prototype ? ["on", "off"] : ["bind", "unbind"], e = n[0], i = n[1], t.Util = {
        bindEvent: function(t, i, n) {
            return jQuery(t)[e](i, n)
        },
        unbindEvent: function(t, e, n) {
            return jQuery(t)[i](e, n)
        },
        getInputValue: function(t) {
            var e;
            return e = jQuery(t), "checkbox" === e.attr("type") ? e.is(":checked") : e.val()
        }
    }) : t.Util = {
        bindEvent: function() {
            return "addEventListener" in window ? function(t, e, i) {
                return t.addEventListener(e, i, !1)
            } : function(t, e, i) {
                return t.attachEvent("on" + e, i)
            }
        }(),
        unbindEvent: function() {
            return "removeEventListener" in window ? function(t, e, i) {
                return t.removeEventListener(e, i, !1)
            } : function(t, e, i) {
                return t.detachEvent("on" + e, i)
            }
        }(),
        getInputValue: function(t) {
            var e, i, n, r;
            if ("checkbox" === t.type) return t.checked;
            if ("select-multiple" === t.type) {
                for (r = [], i = 0, n = t.length; n > i; i++) e = t[i], e.selected && r.push(e.value);
                return r
            }
            return t.value
        }
    }, t.TypeParser = function() {
        function t() {}
        return t.types = {
            primitive: 0,
            keypath: 1
        }, t.parse = function(t) {
            return /^'.*'$|^".*"$/.test(t) ? {
                type: this.types.primitive,
                value: t.slice(1, -1)
            } : "true" === t ? {
                type: this.types.primitive,
                value: !0
            } : "false" === t ? {
                type: this.types.primitive,
                value: !1
            } : "null" === t ? {
                type: this.types.primitive,
                value: null
            } : "undefined" === t ? {
                type: this.types.primitive,
                value: void 0
            } : "" === t ? {
                type: this.types.primitive,
                value: void 0
            } : isNaN(Number(t)) === !1 ? {
                type: this.types.primitive,
                value: Number(t)
            } : {
                type: this.types.keypath,
                value: t
            }
        }, t
    }(), t.TextTemplateParser = function() {
        function t() {}
        return t.types = {
            text: 0,
            binding: 1
        }, t.parse = function(t, e) {
            var i, n, r, s, o, u, l;
            for (u = [], s = t.length, i = 0, n = 0; s > n;) {
                if (i = t.indexOf(e[0], n), 0 > i) {
                    u.push({
                        type: this.types.text,
                        value: t.slice(n)
                    });
                    break
                }
                if (i > 0 && i > n && u.push({
                        type: this.types.text,
                        value: t.slice(n, i)
                    }), n = i + e[0].length, i = t.indexOf(e[1], n), 0 > i) {
                    o = t.slice(n - e[1].length), r = u[u.length - 1], (null != r ? r.type : void 0) === this.types.text ? r.value += o : u.push({
                        type: this.types.text,
                        value: o
                    });
                    break
                }
                l = t.slice(n, i).trim(), u.push({
                    type: this.types.binding,
                    value: l
                }), n = i + e[1].length
            }
            return u
        }, t
    }(), t.View = function() {
        function e(e, i, n) {
            var s, o, u, l, h, a, p, d, c, f, b, v, m;
            for (this.els = e, this.models = i, null == n && (n = {}), this.update = r(this.update, this), this.publish = r(this.publish, this), this.sync = r(this.sync, this), this.unbind = r(this.unbind, this), this.bind = r(this.bind, this), this.select = r(this.select, this), this.traverse = r(this.traverse, this), this.build = r(this.build, this), this.buildBinding = r(this.buildBinding, this), this.bindingRegExp = r(this.bindingRegExp, this), this.options = r(this.options, this), this.els.jquery || this.els instanceof Array || (this.els = [this.els]), c = t.extensions, h = 0, p = c.length; p > h; h++) {
                if (o = c[h], this[o] = {}, n[o]) {
                    f = n[o];
                    for (s in f) u = f[s], this[o][s] = u
                }
                b = t["public"][o];
                for (s in b) u = b[s], null == (l = this[o])[s] && (l[s] = u)
            }
            for (v = t.options, a = 0, d = v.length; d > a; a++) o = v[a], this[o] = null != (m = n[o]) ? m : t["public"][o];
            this.build()
        }
        return e.prototype.options = function() {
            var e, i, n, r, s;
            for (i = {}, s = t.extensions.concat(t.options), n = 0, r = s.length; r > n; n++) e = s[n], i[e] = this[e];
            return i
        }, e.prototype.bindingRegExp = function() {
            return new RegExp("^" + this.prefix + "-")
        }, e.prototype.buildBinding = function(e, i, n, r) {
            var s, o, u, l, h, a, p;
            return h = {}, p = function() {
                var t, e, i, n;
                for (i = r.match(/((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g), n = [], t = 0, e = i.length; e > t; t++) a = i[t], n.push(a.trim());
                return n
            }(), s = function() {
                var t, e, i, n;
                for (i = p.shift().split("<"), n = [], t = 0, e = i.length; e > t; t++) o = i[t], n.push(o.trim());
                return n
            }(), l = s.shift(), h.formatters = p, (u = s.shift()) && (h.dependencies = u.split(/\s+/)), this.bindings.push(new t[e](this, i, n, l, h))
        }, e.prototype.build = function() {
            var e, i, n, r, s;
            for (this.bindings = [], i = function(e) {
                    return function(n) {
                        var r, s, o, u, l, h, a, p, d, c, f, b, v;
                        if (3 === n.nodeType) {
                            if (l = t.TextTemplateParser, (o = e.templateDelimiters) && (p = l.parse(n.data, o)).length && (1 !== p.length || p[0].type !== l.types.text)) {
                                for (d = 0, f = p.length; f > d; d++) a = p[d], h = document.createTextNode(a.value), n.parentNode.insertBefore(h, n), 1 === a.type && e.buildBinding("TextBinding", h, null, a.value);
                                n.parentNode.removeChild(n)
                            }
                        } else 1 === n.nodeType && (r = e.traverse(n));
                        if (!r)
                            for (v = function() {
                                    var t, e, i, r;
                                    for (i = n.childNodes, r = [], t = 0, e = i.length; e > t; t++) u = i[t], r.push(u);
                                    return r
                                }(), c = 0, b = v.length; b > c; c++) s = v[c], i(s)
                    }
                }(this), s = this.els, n = 0, r = s.length; r > n; n++) e = s[n], i(e);
            this.bindings.sort(function(t, e) {
                var i, n;
                return ((null != (i = e.binder) ? i.priority : void 0) || 0) - ((null != (n = t.binder) ? n.priority : void 0) || 0)
            })
        }, e.prototype.traverse = function(e) {
            var i, n, r, s, o, u, l, h, a, p, d, c, f, b, v, m;
            for (s = this.bindingRegExp(), o = "SCRIPT" === e.nodeName || "STYLE" === e.nodeName, b = e.attributes, p = 0, c = b.length; c > p; p++)
                if (i = b[p], s.test(i.name)) {
                    if (h = i.name.replace(s, ""), !(r = this.binders[h])) {
                        v = this.binders;
                        for (u in v) a = v[u], "*" !== u && -1 !== u.indexOf("*") && (l = new RegExp("^" + u.replace(/\*/g, ".+") + "$"), l.test(h) && (r = a))
                    }
                    r || (r = this.binders["*"]), r.block && (o = !0, n = [i])
                } for (m = n || e.attributes, d = 0, f = m.length; f > d; d++) i = m[d], s.test(i.name) && (h = i.name.replace(s, ""), this.buildBinding("Binding", e, h, i.value));
            return o || (h = e.nodeName.toLowerCase(), this.components[h] && !e._bound && (this.bindings.push(new t.ComponentBinding(this, e, h)), o = !0)), o
        }, e.prototype.select = function(t) {
            var e, i, n, r, s;
            for (r = this.bindings, s = [], i = 0, n = r.length; n > i; i++) e = r[i], t(e) && s.push(e);
            return s
        }, e.prototype.bind = function() {
            var t, e, i, n;
            for (n = this.bindings, e = 0, i = n.length; i > e; e++) t = n[e], t.bind()
        }, e.prototype.unbind = function() {
            var t, e, i, n;
            for (n = this.bindings, e = 0, i = n.length; i > e; e++) t = n[e], t.unbind()
        }, e.prototype.sync = function() {
            var t, e, i, n;
            for (n = this.bindings, e = 0, i = n.length; i > e; e++) t = n[e], "function" == typeof t.sync && t.sync()
        }, e.prototype.publish = function() {
            var t, e, i, n;
            for (n = this.select(function(t) {
                    var e;
                    return null != (e = t.binder) ? e.publishes : void 0
                }), e = 0, i = n.length; i > e; e++) t = n[e], t.publish()
        }, e.prototype.update = function(t) {
            var e, i, n, r, s, o;
            null == t && (t = {});
            for (i in t) n = t[i], this.models[i] = n;
            for (o = this.bindings, r = 0, s = o.length; s > r; r++) e = o[r], "function" == typeof e.update && e.update(t)
        }, e
    }(), t.Binding = function() {
        function e(t, e, i, n, s) {
            this.view = t, this.el = e, this.type = i, this.keypath = n, this.options = null != s ? s : {}, this.getValue = r(this.getValue, this), this.update = r(this.update, this), this.unbind = r(this.unbind, this), this.bind = r(this.bind, this), this.publish = r(this.publish, this), this.sync = r(this.sync, this), this.set = r(this.set, this), this.eventHandler = r(this.eventHandler, this), this.formattedValue = r(this.formattedValue, this), this.parseFormatterArguments = r(this.parseFormatterArguments, this), this.parseTarget = r(this.parseTarget, this), this.observe = r(this.observe, this), this.setBinder = r(this.setBinder, this), this.formatters = this.options.formatters || [], this.dependencies = [], this.formatterObservers = {}, this.model = void 0, this.setBinder()
        }
        return e.prototype.setBinder = function() {
            var t, e, i, n;
            if (!(this.binder = this.view.binders[this.type])) {
                n = this.view.binders;
                for (t in n) i = n[t], "*" !== t && -1 !== t.indexOf("*") && (e = new RegExp("^" + t.replace(/\*/g, ".+") + "$"), e.test(this.type) && (this.binder = i, this.args = new RegExp("^" + t.replace(/\*/g, "(.+)") + "$").exec(this.type), this.args.shift()))
            }
            return this.binder || (this.binder = this.view.binders["*"]), this.binder instanceof Function ? this.binder = {
                routine: this.binder
            } : void 0
        }, e.prototype.observe = function(e, i, n) {
            return t.sightglass(e, i, n, {
                root: this.view.rootInterface,
                adapters: this.view.adapters
            })
        }, e.prototype.parseTarget = function() {
            var e;
            return e = t.TypeParser.parse(this.keypath), e.type === t.TypeParser.types.primitive ? this.value = e.value : (this.observer = this.observe(this.view.models, this.keypath, this.sync), this.model = this.observer.target)
        }, e.prototype.parseFormatterArguments = function(e, i) {
            var n, r, s, o, u, l, h;
            for (e = function() {
                    var i, n, s;
                    for (s = [], i = 0, n = e.length; n > i; i++) r = e[i], s.push(t.TypeParser.parse(r));
                    return s
                }(), o = [], n = l = 0, h = e.length; h > l; n = ++l) r = e[n], o.push(r.type === t.TypeParser.types.primitive ? r.value : ((u = this.formatterObservers)[i] || (u[i] = {}), (s = this.formatterObservers[i][n]) ? void 0 : (s = this.observe(this.view.models, r.value, this.sync), this.formatterObservers[i][n] = s), s.value()));
            return o
        }, e.prototype.formattedValue = function(t) {
            var e, i, n, r, o, u, l, h, a;
            for (h = this.formatters, i = u = 0, l = h.length; l > u; i = ++u) n = h[i], e = n.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g), r = e.shift(), n = this.view.formatters[r], o = this.parseFormatterArguments(e, i), (null != n ? n.read : void 0) instanceof Function ? t = (a = n.read).call.apply(a, [this.model, t].concat(s.call(o))) : n instanceof Function && (t = n.call.apply(n, [this.model, t].concat(s.call(o))));
            return t
        }, e.prototype.eventHandler = function(t) {
            var e, i;
            return i = (e = this).view.handler,
                function(n) {
                    return i.call(t, this, n, e)
                }
        }, e.prototype.set = function(e) {
            var i;
            return e = e instanceof Function && !this.binder["function"] && t["public"].executeFunctions ? this.formattedValue(e.call(this.model)) : this.formattedValue(e), null != (i = this.binder.routine) ? i.call(this, this.el, e) : void 0
        }, e.prototype.sync = function() {
            var t, e;
            return this.set(function() {
                var i, n, r, s, o, u, l;
                if (this.observer) {
                    if (this.model !== this.observer.target) {
                        for (o = this.dependencies, i = 0, r = o.length; r > i; i++) e = o[i], e.unobserve();
                        if (this.dependencies = [], null != (this.model = this.observer.target) && (null != (u = this.options.dependencies) ? u.length : void 0))
                            for (l = this.options.dependencies, n = 0, s = l.length; s > n; n++) t = l[n], e = this.observe(this.model, t, this.sync), this.dependencies.push(e)
                    }
                    return this.observer.value()
                }
                return this.value
            }.call(this))
        }, e.prototype.publish = function() {
            var t, e, i, n, r, o, u, l, h, a, p, d, c;
            if (this.observer) {
                for (l = this.getValue(this.el), o = this.formatters.length - 1, p = this.formatters.slice(0).reverse(), i = h = 0, a = p.length; a > h; i = ++h) n = p[i], e = o - i, t = n.split(/\s+/), r = t.shift(), u = this.parseFormatterArguments(t, e), (null != (d = this.view.formatters[r]) ? d.publish : void 0) && (l = (c = this.view.formatters[r]).publish.apply(c, [l].concat(s.call(u))));
                return this.observer.setValue(l)
            }
        }, e.prototype.bind = function() {
            var t, e, i, n, r, s, o;
            if (this.parseTarget(), null != (r = this.binder.bind) && r.call(this, this.el), null != this.model && (null != (s = this.options.dependencies) ? s.length : void 0))
                for (o = this.options.dependencies, i = 0, n = o.length; n > i; i++) t = o[i], e = this.observe(this.model, t, this.sync), this.dependencies.push(e);
            return this.view.preloadData ? this.sync() : void 0
        }, e.prototype.unbind = function() {
            var t, e, i, n, r, s, o, u, l, h;
            for (null != (o = this.binder.unbind) && o.call(this, this.el), null != (u = this.observer) && u.unobserve(), l = this.dependencies, r = 0, s = l.length; s > r; r++) n = l[r], n.unobserve();
            this.dependencies = [], h = this.formatterObservers;
            for (i in h) {
                e = h[i];
                for (t in e) n = e[t], n.unobserve()
            }
            return this.formatterObservers = {}
        }, e.prototype.update = function(t) {
            var e, i;
            return null == t && (t = {}), this.model = null != (e = this.observer) ? e.target : void 0, null != (i = this.binder.update) ? i.call(this, t) : void 0
        }, e.prototype.getValue = function(e) {
            return this.binder && null != this.binder.getValue ? this.binder.getValue.call(this, e) : t.Util.getInputValue(e)
        }, e
    }(), t.ComponentBinding = function(e) {
        function i(e, i, n) {
            var s, o, u, h, a, p, d, c;
            for (this.view = e, this.el = i, this.type = n, this.unbind = r(this.unbind, this), this.bind = r(this.bind, this), this.locals = r(this.locals, this), this.component = this.view.components[this.type], this["static"] = {}, this.observers = {}, this.upstreamObservers = {}, o = e.bindingRegExp(), d = this.el.attributes || [], a = 0, p = d.length; p > a; a++) s = d[a], o.test(s.name) || (u = this.camelCase(s.name), h = t.TypeParser.parse(s.value), l.call(null != (c = this.component["static"]) ? c : [], u) >= 0 ? this["static"][u] = s.value : h.type === t.TypeParser.types.primitive ? this["static"][u] = h.value : this.observers[u] = s.value)
        }
        return u(i, e), i.prototype.sync = function() {}, i.prototype.update = function() {}, i.prototype.publish = function() {}, i.prototype.locals = function() {
            var t, e, i, n, r, s;
            i = {}, r = this["static"];
            for (t in r) n = r[t], i[t] = n;
            s = this.observers;
            for (t in s) e = s[t], i[t] = e.value();
            return i
        }, i.prototype.camelCase = function(t) {
            return t.replace(/-([a-z])/g, function(t) {
                return t[1].toUpperCase()
            })
        }, i.prototype.bind = function() {
            var e, i, n, r, s, o, u, l, h, a, p, d, c, f, b, v, m, y, g, w;
            if (!this.bound) {
                f = this.observers;
                for (i in f) n = f[i], this.observers[i] = this.observe(this.view.models, n, function(t) {
                    return function(e) {
                        return function() {
                            return t.componentView.models[e] = t.observers[e].value()
                        }
                    }
                }(this).call(this, i));
                this.bound = !0
            }
            if (null != this.componentView) this.componentView.bind();
            else {
                for (this.el.innerHTML = this.component.template.call(this), u = this.component.initialize.call(this, this.el, this.locals()), this.el._bound = !0, o = {}, b = t.extensions, a = 0, d = b.length; d > a; a++) {
                    if (s = b[a], o[s] = {}, this.component[s]) {
                        v = this.component[s];
                        for (e in v) l = v[e], o[s][e] = l
                    }
                    m = this.view[s];
                    for (e in m) l = m[e], null == (h = o[s])[e] && (h[e] = l)
                }
                for (y = t.options, p = 0, c = y.length; c > p; p++) s = y[p], o[s] = null != (g = this.component[s]) ? g : this.view[s];
                this.componentView = new t.View(Array.prototype.slice.call(this.el.childNodes), u, o), this.componentView.bind(), w = this.observers;
                for (i in w) r = w[i], this.upstreamObservers[i] = this.observe(this.componentView.models, i, function(t) {
                    return function(e, i) {
                        return function() {
                            return i.setValue(t.componentView.models[e])
                        }
                    }
                }(this).call(this, i, r))
            }
        }, i.prototype.unbind = function() {
            var t, e, i, n, r;
            i = this.upstreamObservers;
            for (t in i) e = i[t], e.unobserve();
            n = this.observers;
            for (t in n) e = n[t], e.unobserve();
            return null != (r = this.componentView) ? r.unbind.call(this) : void 0
        }, i
    }(t.Binding), t.TextBinding = function(t) {
        function e(t, e, i, n, s) {
            this.view = t, this.el = e, this.type = i, this.keypath = n, this.options = null != s ? s : {}, this.sync = r(this.sync, this), this.formatters = this.options.formatters || [], this.dependencies = [], this.formatterObservers = {}
        }
        return u(e, t), e.prototype.binder = {
            routine: function(t, e) {
                return t.data = null != e ? e : ""
            }
        }, e.prototype.sync = function() {
            return e.__super__.sync.apply(this, arguments)
        }, e
    }(t.Binding), t["public"].binders.text = function(t, e) {
        return null != t.textContent ? t.textContent = null != e ? e : "" : t.innerText = null != e ? e : ""
    }, t["public"].binders.html = function(t, e) {
        return t.innerHTML = null != e ? e : ""
    }, t["public"].binders.show = function(t, e) {
        return t.style.display = e ? "" : "none"
    }, t["public"].binders.hide = function(t, e) {
        return t.style.display = e ? "none" : ""
    }, t["public"].binders.enabled = function(t, e) {
        return t.disabled = !e
    }, t["public"].binders.disabled = function(t, e) {
        return t.disabled = !!e
    }, t["public"].binders.checked = {
        publishes: !0,
        priority: 2e3,
        bind: function(e) {
            return t.Util.bindEvent(e, "change", this.publish)
        },
        unbind: function(e) {
            return t.Util.unbindEvent(e, "change", this.publish)
        },
        routine: function(t, e) {
            var i;
            return t.checked = "radio" === t.type ? (null != (i = t.value) ? i.toString() : void 0) === (null != e ? e.toString() : void 0) : !!e
        }
    }, t["public"].binders.unchecked = {
        publishes: !0,
        priority: 2e3,
        bind: function(e) {
            return t.Util.bindEvent(e, "change", this.publish)
        },
        unbind: function(e) {
            return t.Util.unbindEvent(e, "change", this.publish)
        },
        routine: function(t, e) {
            var i;
            return t.checked = "radio" === t.type ? (null != (i = t.value) ? i.toString() : void 0) !== (null != e ? e.toString() : void 0) : !e
        }
    }, t["public"].binders.value = {
        publishes: !0,
        priority: 3e3,
        bind: function(e) {
            return "INPUT" !== e.tagName || "radio" !== e.type ? (this.event = "SELECT" === e.tagName ? "change" : "input", t.Util.bindEvent(e, this.event, this.publish)) : void 0
        },
        unbind: function(e) {
            return "INPUT" !== e.tagName || "radio" !== e.type ? t.Util.unbindEvent(e, this.event, this.publish) : void 0
        },
        routine: function(t, e) {
            var i, n, r, s, o, u, h;
            if ("INPUT" === t.tagName && "radio" === t.type) return t.setAttribute("value", e);
            if (null != window.jQuery) {
                if (t = jQuery(t), (null != e ? e.toString() : void 0) !== (null != (s = t.val()) ? s.toString() : void 0)) return t.val(null != e ? e : "")
            } else if ("select-multiple" === t.type) {
                if (null != e) {
                    for (h = [], n = 0, r = t.length; r > n; n++) i = t[n], h.push(i.selected = (o = i.value, l.call(e, o) >= 0));
                    return h
                }
            } else if ((null != e ? e.toString() : void 0) !== (null != (u = t.value) ? u.toString() : void 0)) return t.value = null != e ? e : ""
        }
    }, t["public"].binders["if"] = {
        block: !0,
        priority: 4e3,
        bind: function(t) {
            var e, i;
            return null == this.marker ? (e = [this.view.prefix, this.type].join("-").replace("--", "-"), i = t.getAttribute(e), this.marker = document.createComment(" rivets: " + this.type + " " + i + " "), this.bound = !1, t.removeAttribute(e), t.parentNode.insertBefore(this.marker, t), t.parentNode.removeChild(t)) : void 0
        },
        unbind: function() {
            return this.nested ? (this.nested.unbind(), this.bound = !1) : void 0
        },
        routine: function(e, i) {
            var n, r, s, o;
            if (!!i == !this.bound) {
                if (i) {
                    s = {}, o = this.view.models;
                    for (n in o) r = o[n], s[n] = r;
                    return (this.nested || (this.nested = new t.View(e, s, this.view.options()))).bind(), this.marker.parentNode.insertBefore(e, this.marker.nextSibling), this.bound = !0
                }
                return e.parentNode.removeChild(e), this.nested.unbind(), this.bound = !1
            }
        },
        update: function(t) {
            var e;
            return null != (e = this.nested) ? e.update(t) : void 0
        }
    }, t["public"].binders.unless = {
        block: !0,
        priority: 4e3,
        bind: function(e) {
            return t["public"].binders["if"].bind.call(this, e)
        },
        unbind: function() {
            return t["public"].binders["if"].unbind.call(this)
        },
        routine: function(e, i) {
            return t["public"].binders["if"].routine.call(this, e, !i)
        },
        update: function(e) {
            return t["public"].binders["if"].update.call(this, e)
        }
    }, t["public"].binders["on-*"] = {
        "function": !0,
        priority: 1e3,
        unbind: function(e) {
            return this.handler ? t.Util.unbindEvent(e, this.args[0], this.handler) : void 0
        },
        routine: function(e, i) {
            return this.handler && t.Util.unbindEvent(e, this.args[0], this.handler), t.Util.bindEvent(e, this.args[0], this.handler = this.eventHandler(i))
        }
    }, t["public"].binders["each-*"] = {
        block: !0,
        priority: 4e3,
        bind: function(t) {
            var e, i, n, r, s;
            if (null == this.marker) e = [this.view.prefix, this.type].join("-").replace("--", "-"), this.marker = document.createComment(" rivets: " + this.type + " "), this.iterated = [], t.removeAttribute(e), t.parentNode.insertBefore(this.marker, t), t.parentNode.removeChild(t);
            else
                for (s = this.iterated, n = 0, r = s.length; r > n; n++) i = s[n], i.bind()
        },
        unbind: function() {
            var t, e, i, n;
            if (null != this.iterated)
                for (n = this.iterated, e = 0, i = n.length; i > e; e++) t = n[e], t.unbind()
        },
        routine: function(e, i) {
            var n, r, s, o, u, l, h, a, p, d, c, f, b, v, m, y, g, w, k, x;
            if (h = this.args[0], i = i || [], this.iterated.length > i.length)
                for (w = Array(this.iterated.length - i.length), f = 0, m = w.length; m > f; f++) s = w[f], c = this.iterated.pop(), c.unbind(), this.marker.parentNode.removeChild(c.els[0]);
            for (o = b = 0, y = i.length; y > b; o = ++b)
                if (l = i[o], r = {
                        index: o
                    }, r[t["public"].iterationAlias(h)] = o, r[h] = l, null == this.iterated[o]) {
                    k = this.view.models;
                    for (u in k) l = k[u], null == r[u] && (r[u] = l);
                    p = this.iterated.length ? this.iterated[this.iterated.length - 1].els[0] : this.marker, a = this.view.options(), a.preloadData = !0, d = e.cloneNode(!0), c = new t.View(d, r, a), c.bind(), this.iterated.push(c), this.marker.parentNode.insertBefore(d, p.nextSibling)
                } else this.iterated[o].models[h] !== l && this.iterated[o].update(r);
            if ("OPTION" === e.nodeName)
                for (x = this.view.bindings, v = 0, g = x.length; g > v; v++) n = x[v], n.el === this.marker.parentNode && "value" === n.type && n.sync()
        },
        update: function(t) {
            var e, i, n, r, s, o, u;
            e = {};
            for (i in t) n = t[i], i !== this.args[0] && (e[i] = n);
            for (u = this.iterated, s = 0, o = u.length; o > s; s++) r = u[s], r.update(e)
        }
    }, t["public"].binders["class-*"] = function(t, e) {
        var i;
        return i = " " + t.className + " ", !e == (-1 !== i.indexOf(" " + this.args[0] + " ")) ? t.className = e ? "" + t.className + " " + this.args[0] : i.replace(" " + this.args[0] + " ", " ").trim() : void 0
    }, t["public"].binders["*"] = function(t, e) {
        return null != e ? t.setAttribute(this.type, e) : t.removeAttribute(this.type)
    }, t["public"].formatters.call = function() {
        var t, e;
        return e = arguments[0], t = 2 <= arguments.length ? s.call(arguments, 1) : [], e.call.apply(e, [this].concat(s.call(t)))
    }, t["public"].adapters["."] = {
        id: "_rv",
        counter: 0,
        weakmap: {},
        weakReference: function(t) {
            var e, i, n;
            return t.hasOwnProperty(this.id) || (e = this.counter++, Object.defineProperty(t, this.id, {
                value: e
            })), (i = this.weakmap)[n = t[this.id]] || (i[n] = {
                callbacks: {}
            })
        },
        cleanupWeakReference: function(t, e) {
            return Object.keys(t.callbacks).length || t.pointers && Object.keys(t.pointers).length ? void 0 : delete this.weakmap[e]
        },
        stubFunction: function(t, e) {
            var i, n, r;
            return n = t[e], i = this.weakReference(t), r = this.weakmap, t[e] = function() {
                var e, s, o, u, l, h, a, p, d, c;
                u = n.apply(t, arguments), a = i.pointers;
                for (o in a)
                    for (s = a[o], c = null != (p = null != (d = r[o]) ? d.callbacks[s] : void 0) ? p : [], l = 0, h = c.length; h > l; l++) e = c[l], e();
                return u
            }
        },
        observeMutations: function(t, e, i) {
            var n, r, s, o, u, h;
            if (Array.isArray(t)) {
                if (s = this.weakReference(t), null == s.pointers)
                    for (s.pointers = {}, r = ["push", "pop", "shift", "unshift", "sort", "reverse", "splice"], u = 0, h = r.length; h > u; u++) n = r[u], this.stubFunction(t, n);
                if (null == (o = s.pointers)[e] && (o[e] = []), l.call(s.pointers[e], i) < 0) return s.pointers[e].push(i)
            }
        },
        unobserveMutations: function(t, e, i) {
            var n, r, s;
            return Array.isArray(t) && null != t[this.id] && (r = this.weakmap[t[this.id]]) && (s = r.pointers[e]) ? ((n = s.indexOf(i)) >= 0 && s.splice(n, 1), s.length || delete r.pointers[e], this.cleanupWeakReference(r, t[this.id])) : void 0
        },
        observe: function(t, e, i) {
            var n, r, s;
            return n = this.weakReference(t).callbacks, null == n[e] && (n[e] = [], r = Object.getOwnPropertyDescriptor(t, e), (null != r ? r.get : void 0) || (null != r ? r.set : void 0) || (s = t[e], Object.defineProperty(t, e, {
                enumerable: !0,
                get: function() {
                    return s
                },
                set: function(i) {
                    return function(r) {
                        var o, u, h, a, p;
                        if (r !== s && (i.unobserveMutations(s, t[i.id], e), s = r, u = i.weakmap[t[i.id]])) {
                            if (n = u.callbacks, n[e])
                                for (p = n[e].slice(), h = 0, a = p.length; a > h; h++) o = p[h], l.call(n[e], o) >= 0 && o();
                            return i.observeMutations(r, t[i.id], e)
                        }
                    }
                }(this)
            }))), l.call(n[e], i) < 0 && n[e].push(i), this.observeMutations(t[e], t[this.id], e)
        },
        unobserve: function(t, e, i) {
            var n, r, s;
            return (s = this.weakmap[t[this.id]]) && (n = s.callbacks[e]) ? ((r = n.indexOf(i)) >= 0 && (n.splice(r, 1), n.length || (delete s.callbacks[e], this.unobserveMutations(t[e], t[this.id], e))), this.cleanupWeakReference(s, t[this.id])) : void 0
        },
        get: function(t, e) {
            return t[e]
        },
        set: function(t, e, i) {
            return t[e] = i
        }
    }, t.factory = function(e) {
        return t.sightglass = e, t["public"]._ = t, t["public"]
    }, "object" == typeof("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = t.factory(require("sightglass")) : "function" == typeof define && define.amd ? define(["sightglass"], function(e) {
        return this.rivets = t.factory(e)
    }) : this.rivets = t.factory(sightglass)
}).call(this);