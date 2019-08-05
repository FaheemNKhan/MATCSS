"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+csharp+markup-templating+json+php */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-([\w-]+)\b/i,
      t = 0,
      n = _self.Prism = {
    manual: _self.Prism && _self.Prism.manual,
    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
    util: {
      encode: function encode(e) {
        return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      },
      type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      },
      objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", {
          value: ++t
        }), e.__id;
      },
      clone: function clone(e, t) {
        var r = n.util.type(e);

        switch (t = t || {}, r) {
          case "Object":
            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
            var a = {};
            t[n.util.objId(e)] = a;

            for (var l in e) {
              e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
            }

            return a;

          case "Array":
            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
            var a = [];
            return t[n.util.objId(e)] = a, e.forEach(function (e, r) {
              a[r] = n.util.clone(e, t);
            }), a;
        }

        return e;
      }
    },
    languages: {
      extend: function extend(e, t) {
        var r = n.util.clone(n.languages[e]);

        for (var a in t) {
          r[a] = t[a];
        }

        return r;
      },
      insertBefore: function insertBefore(e, t, r, a) {
        a = a || n.languages;
        var l = a[e];

        if (2 == arguments.length) {
          r = arguments[1];

          for (var i in r) {
            r.hasOwnProperty(i) && (l[i] = r[i]);
          }

          return l;
        }

        var o = {};

        for (var s in l) {
          if (l.hasOwnProperty(s)) {
            if (s == t) for (var i in r) {
              r.hasOwnProperty(i) && (o[i] = r[i]);
            }
            o[s] = l[s];
          }
        }

        return n.languages.DFS(n.languages, function (t, n) {
          n === a[e] && t != e && (this[t] = o);
        }), a[e] = o;
      },
      DFS: function DFS(e, t, r, a) {
        a = a || {};

        for (var l in e) {
          e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l), "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, a)));
        }
      }
    },
    plugins: {},
    highlightAll: function highlightAll(e, t) {
      n.highlightAllUnder(document, e, t);
    },
    highlightAllUnder: function highlightAllUnder(e, t, r) {
      var a = {
        callback: r,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      n.hooks.run("before-highlightall", a);

      for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];) {
        n.highlightElement(l, t === !0, a.callback);
      }
    },
    highlightElement: function highlightElement(t, r, a) {
      for (var l, i, o = t; o && !e.test(o.className);) {
        o = o.parentNode;
      }

      o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
      var s = t.textContent,
          u = {
        element: t,
        language: l,
        grammar: i,
        code: s
      };
      if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (n.hooks.run("before-highlight", u), u.element.textContent = u.code, n.hooks.run("after-highlight", u)), n.hooks.run("complete", u), void 0;

      if (n.hooks.run("before-highlight", u), r && _self.Worker) {
        var g = new Worker(n.filename);
        g.onmessage = function (e) {
          u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
        }, g.postMessage(JSON.stringify({
          language: u.language,
          code: u.code,
          immediateClose: !0
        }));
      } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
    },
    highlight: function highlight(e, t, a) {
      var l = {
        code: e,
        grammar: t,
        language: a
      };
      return n.hooks.run("before-tokenize", l), l.tokens = n.tokenize(l.code, l.grammar), n.hooks.run("after-tokenize", l), r.stringify(n.util.encode(l.tokens), l.language);
    },
    matchGrammar: function matchGrammar(e, t, r, a, l, i, o) {
      var s = n.Token;

      for (var u in r) {
        if (r.hasOwnProperty(u) && r[u]) {
          if (u == o) return;
          var g = r[u];
          g = "Array" === n.util.type(g) ? g : [g];

          for (var c = 0; c < g.length; ++c) {
            var h = g[c],
                f = h.inside,
                d = !!h.lookbehind,
                m = !!h.greedy,
                p = 0,
                y = h.alias;

            if (m && !h.pattern.global) {
              var v = h.pattern.toString().match(/[imuy]*$/)[0];
              h.pattern = RegExp(h.pattern.source, v + "g");
            }

            h = h.pattern || h;

            for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
              var w = t[b];
              if (t.length > e.length) return;

              if (!(w instanceof s)) {
                if (m && b != t.length - 1) {
                  h.lastIndex = k;

                  var _ = h.exec(e);

                  if (!_) break;

                  for (var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A) {
                    x += t[A].length, j >= x && (++b, k = x);
                  }

                  if (t[b] instanceof s) continue;
                  I = A - b, w = e.slice(k, x), _.index -= k;
                } else {
                  h.lastIndex = 0;

                  var _ = h.exec(w),
                      I = 1;
                }

                if (_) {
                  d && (p = _[1] ? _[1].length : 0);

                  var j = _.index + p,
                      _ = _[0].slice(p),
                      P = j + _.length,
                      N = w.slice(0, j),
                      S = w.slice(P),
                      C = [b, I];

                  N && (++b, k += N.length, C.push(N));
                  var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                  if (C.push(E), S && C.push(S), Array.prototype.splice.apply(t, C), 1 != I && n.matchGrammar(e, t, r, b, k, !0, u), i) break;
                } else if (i) break;
              }
            }
          }
        }
      }
    },
    tokenize: function tokenize(e, t) {
      var r = [e],
          a = t.rest;

      if (a) {
        for (var l in a) {
          t[l] = a[l];
        }

        delete t.rest;
      }

      return n.matchGrammar(e, r, t, 0, 0, !1), r;
    },
    hooks: {
      all: {},
      add: function add(e, t) {
        var r = n.hooks.all;
        r[e] = r[e] || [], r[e].push(t);
      },
      run: function run(e, t) {
        var r = n.hooks.all[e];
        if (r && r.length) for (var a, l = 0; a = r[l++];) {
          a(t);
        }
      }
    }
  },
      r = n.Token = function (e, t, n, r, a) {
    this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length, this.greedy = !!a;
  };

  if (r.stringify = function (e, t, a) {
    if ("string" == typeof e) return e;
    if ("Array" === n.util.type(e)) return e.map(function (n) {
      return r.stringify(n, t, e);
    }).join("");
    var l = {
      type: e.type,
      content: r.stringify(e.content, t, a),
      tag: "span",
      classes: ["token", e.type],
      attributes: {},
      language: t,
      parent: a
    };

    if (e.alias) {
      var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
      Array.prototype.push.apply(l.classes, i);
    }

    n.hooks.run("wrap", l);
    var o = Object.keys(l.attributes).map(function (e) {
      return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"';
    }).join(" ");
    return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">";
  }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
    var t = JSON.parse(e.data),
        r = t.language,
        a = t.code,
        l = t.immediateClose;
    _self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close();
  }, !1), _self.Prism) : _self.Prism;
  var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
  return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism;
}();

"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, {
            pattern: /(^|[^\\])["']/,
            lookbehind: !0
          }]
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
    inside: {
      rule: /@[\w-]+/
    }
  },
  url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^{}\s][^{};]*?(?=\s*\{)/,
  string: {
    pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  important: /\B!important\b/i,
  "function": /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
    lookbehind: !0,
    inside: Prism.languages.css,
    alias: "language-css",
    greedy: !0
  }
}), Prism.languages.insertBefore("inside", "attr-value", {
  "style-attr": {
    pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
    inside: {
      "attr-name": {
        pattern: /^\s*style/i,
        inside: Prism.languages.markup.tag.inside
      },
      punctuation: /^\s*=\s*['"]|['"]\s*$/,
      "attr-value": {
        pattern: /.+/i,
        inside: Prism.languages.css
      }
    },
    alias: "language-css"
  }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  "boolean": /\b(?:true|false)\b/,
  "function": /[a-z0-9_]+(?=\()/i,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  "function": /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: !0,
    greedy: !0
  },
  "function-variable": {
    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
    alias: "function"
  },
  constant: /\b[A-Z][A-Z\d_]*\b/
}), Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /\${[^}]+}/,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\${|}$/,
            alias: "punctuation"
          },
          rest: null
        }
      },
      string: /[\s\S]+/
    }
  }
}), Prism.languages.javascript["template-string"].inside.interpolation.inside.rest = Prism.languages.javascript, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
    lookbehind: !0,
    inside: Prism.languages.javascript,
    alias: "language-javascript",
    greedy: !0
  }
}), Prism.languages.js = Prism.languages.javascript;
Prism.languages.csharp = Prism.languages.extend("clike", {
  keyword: /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
  string: [{
    pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
    greedy: !0
  }, {
    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
    greedy: !0
  }],
  "class-name": [{
    pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
    inside: {
      punctuation: /\./
    }
  }, {
    pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
    lookbehind: !0,
    inside: {
      punctuation: /\./
    }
  }, {
    pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
    lookbehind: !0,
    inside: {
      punctuation: /\./
    }
  }, {
    pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
    lookbehind: !0,
    inside: {
      punctuation: /\./
    }
  }],
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i
}), Prism.languages.insertBefore("csharp", "class-name", {
  "generic-method": {
    pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
    inside: {
      "function": /^\w+/,
      "class-name": {
        pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
        inside: {
          punctuation: /\./
        }
      },
      keyword: Prism.languages.csharp.keyword,
      punctuation: /[<>(),.:]/
    }
  },
  preprocessor: {
    pattern: /(^\s*)#.*/m,
    lookbehind: !0,
    alias: "property",
    inside: {
      directive: {
        pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
        lookbehind: !0,
        alias: "keyword"
      }
    }
  }
}), Prism.languages.dotnet = Prism.languages.csharp;
Prism.languages["markup-templating"] = {}, Object.defineProperties(Prism.languages["markup-templating"], {
  buildPlaceholders: {
    value: function value(e, t, n, a) {
      e.language === t && (e.tokenStack = [], e.code = e.code.replace(n, function (n) {
        if ("function" == typeof a && !a(n)) return n;

        for (var r = e.tokenStack.length; -1 !== e.code.indexOf("___" + t.toUpperCase() + r + "___");) {
          ++r;
        }

        return e.tokenStack[r] = n, "___" + t.toUpperCase() + r + "___";
      }), e.grammar = Prism.languages.markup);
    }
  },
  tokenizePlaceholders: {
    value: function value(e, t) {
      if (e.language === t && e.tokenStack) {
        e.grammar = Prism.languages[t];

        var n = 0,
            a = Object.keys(e.tokenStack),
            r = function r(o) {
          if (!(n >= a.length)) for (var i = 0; i < o.length; i++) {
            var g = o[i];

            if ("string" == typeof g || g.content && "string" == typeof g.content) {
              var c = a[n],
                  s = e.tokenStack[c],
                  l = "string" == typeof g ? g : g.content,
                  p = l.indexOf("___" + t.toUpperCase() + c + "___");

              if (p > -1) {
                ++n;

                var f,
                    u = l.substring(0, p),
                    _ = new Prism.Token(t, Prism.tokenize(s, e.grammar, t), "language-" + t, s),
                    k = l.substring(p + ("___" + t.toUpperCase() + c + "___").length);

                if (u || k ? (f = [u, _, k].filter(function (e) {
                  return !!e;
                }), r(f)) : f = _, "string" == typeof g ? Array.prototype.splice.apply(o, [i, 1].concat(f)) : g.content = f, n >= a.length) break;
              }
            } else g.content && "string" != typeof g.content && r(g.content);
          }
        };

        r(e.tokens);
      }
    }
  }
});
Prism.languages.json = {
  property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
  string: {
    pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    greedy: !0
  },
  number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  punctuation: /[{}[\]);,]/,
  operator: /:/g,
  "boolean": /\b(?:true|false)\b/i,
  "null": /\bnull\b/i
}, Prism.languages.jsonp = Prism.languages.json;
!function (e) {
  e.languages.php = e.languages.extend("clike", {
    keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
    constant: /\b[A-Z0-9_]{2,}\b/,
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: !0
    }
  }), e.languages.insertBefore("php", "string", {
    "shell-comment": {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0,
      alias: "comment"
    }
  }), e.languages.insertBefore("php", "keyword", {
    delimiter: {
      pattern: /\?>|<\?(?:php|=)?/i,
      alias: "important"
    },
    variable: /\$+(?:\w+\b|(?={))/i,
    "package": {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    }
  }), e.languages.insertBefore("php", "operator", {
    property: {
      pattern: /(->)[\w]+/,
      lookbehind: !0
    }
  }), e.languages.insertBefore("php", "string", {
    "nowdoc-string": {
      pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
      greedy: !0,
      alias: "string",
      inside: {
        delimiter: {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            punctuation: /^<<<'?|[';]$/
          }
        }
      }
    },
    "heredoc-string": {
      pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
      greedy: !0,
      alias: "string",
      inside: {
        delimiter: {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            punctuation: /^<<<"?|[";]$/
          }
        },
        interpolation: null
      }
    },
    "single-quoted-string": {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      greedy: !0,
      alias: "string"
    },
    "double-quoted-string": {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      greedy: !0,
      alias: "string",
      inside: {
        interpolation: null
      }
    }
  }), delete e.languages.php.string;
  var n = {
    pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
    lookbehind: !0,
    inside: {
      rest: e.languages.php
    }
  };
  e.languages.php["heredoc-string"].inside.interpolation = n, e.languages.php["double-quoted-string"].inside.interpolation = n, e.hooks.add("before-tokenize", function (n) {
    if (/(?:<\?php|<\?)/gi.test(n.code)) {
      var i = /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi;
      e.languages["markup-templating"].buildPlaceholders(n, "php", i);
    }
  }), e.hooks.add("after-tokenize", function (n) {
    e.languages["markup-templating"].tokenizePlaceholders(n, "php");
  });
}(Prism);
/* 
*	Waves Effect
*
*/

!function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define([], function () {
    return t.Waves = e.call(t), t.Waves;
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e.call(t) : t.Waves = e.call(t);
}("object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) ? global : void 0, function () {
  "use strict";

  function t(t) {
    return null !== t && t === t.window;
  }

  function e(e) {
    return t(e) ? e : 9 === e.nodeType && e.defaultView;
  }

  function n(t) {
    var e = _typeof(t);

    return "function" === e || "object" === e && !!t;
  }

  function o(t) {
    return n(t) && t.nodeType > 0;
  }

  function a(t) {
    var e = f.call(t);
    return "[object String]" === e ? d(t) : n(t) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(e) && t.hasOwnProperty("length") ? t : o(t) ? [t] : [];
  }

  function i(t) {
    var n,
        o,
        a = {
      top: 0,
      left: 0
    },
        i = t && t.ownerDocument;
    return n = i.documentElement, void 0 !== t.getBoundingClientRect && (a = t.getBoundingClientRect()), o = e(i), {
      top: a.top + o.pageYOffset - n.clientTop,
      left: a.left + o.pageXOffset - n.clientLeft
    };
  }

  function r(t) {
    var e = "";

    for (var n in t) {
      t.hasOwnProperty(n) && (e += n + ":" + t[n] + ";");
    }

    return e;
  }

  function s(t, e, n) {
    if (n) {
      n.classList.remove("waves-rippling");
      var o = n.getAttribute("data-x"),
          a = n.getAttribute("data-y"),
          i = n.getAttribute("data-scale"),
          s = n.getAttribute("data-translate"),
          u = 350 - (Date.now() - Number(n.getAttribute("data-hold")));
      u < 0 && (u = 0), "mousemove" === t.type && (u = 150);
      var c = "mousemove" === t.type ? 2500 : v.duration;
      setTimeout(function () {
        var t = {
          top: a + "px",
          left: o + "px",
          opacity: "0",
          "-webkit-transition-duration": c + "ms",
          "-moz-transition-duration": c + "ms",
          "-o-transition-duration": c + "ms",
          "transition-duration": c + "ms",
          "-webkit-transform": i + " " + s,
          "-moz-transform": i + " " + s,
          "-ms-transform": i + " " + s,
          "-o-transform": i + " " + s,
          transform: i + " " + s
        };
        n.setAttribute("style", r(t)), setTimeout(function () {
          try {
            e.removeChild(n);
          } catch (t) {
            return !1;
          }
        }, c);
      }, u);
    }
  }

  function u(t) {
    if (!1 === h.allowEvent(t)) return null;

    for (var e = null, n = t.target || t.srcElement; n.parentElement;) {
      if (!(n instanceof SVGElement) && n.classList.contains("waves-effect")) {
        e = n;
        break;
      }

      n = n.parentElement;
    }

    return e;
  }

  function c(t) {
    var e = u(t);

    if (null !== e) {
      if (e.disabled || e.getAttribute("disabled") || e.classList.contains("disabled")) return;

      if (h.registerEvent(t), "touchstart" === t.type && v.delay) {
        var n = !1,
            o = setTimeout(function () {
          o = null, v.show(t, e);
        }, v.delay),
            a = function a(_a) {
          o && (clearTimeout(o), o = null, v.show(t, e)), n || (n = !0, v.hide(_a, e)), r();
        },
            i = function i(t) {
          o && (clearTimeout(o), o = null), a(t), r();
        };

        e.addEventListener("touchmove", i, !1), e.addEventListener("touchend", a, !1), e.addEventListener("touchcancel", a, !1);

        var r = function r() {
          e.removeEventListener("touchmove", i), e.removeEventListener("touchend", a), e.removeEventListener("touchcancel", a);
        };
      } else v.show(t, e), m && (e.addEventListener("touchend", v.hide, !1), e.addEventListener("touchcancel", v.hide, !1)), e.addEventListener("mouseup", v.hide, !1), e.addEventListener("mouseleave", v.hide, !1);
    }
  }

  var l = l || {},
      d = document.querySelectorAll.bind(document),
      f = Object.prototype.toString,
      m = "ontouchstart" in window,
      v = {
    duration: 750,
    delay: 200,
    show: function show(t, e, n) {
      if (2 === t.button) return !1;
      e = e || this;
      var o = document.createElement("div");
      o.className = "waves-ripple waves-rippling", e.appendChild(o);
      var a = i(e),
          s = 0,
          u = 0;
      "touches" in t && t.touches.length ? (s = t.touches[0].pageY - a.top, u = t.touches[0].pageX - a.left) : (s = t.pageY - a.top, u = t.pageX - a.left), u = u >= 0 ? u : 0, s = s >= 0 ? s : 0;
      var c = "scale(" + e.clientWidth / 100 * 3 + ")",
          l = "translate(0,0)";
      n && (l = "translate(" + n.x + "px, " + n.y + "px)"), o.setAttribute("data-hold", Date.now()), o.setAttribute("data-x", u), o.setAttribute("data-y", s), o.setAttribute("data-scale", c), o.setAttribute("data-translate", l);
      var d = {
        top: s + "px",
        left: u + "px"
      };
      o.classList.add("waves-notransition"), o.setAttribute("style", r(d)), o.classList.remove("waves-notransition"), d["-webkit-transform"] = c + " " + l, d["-moz-transform"] = c + " " + l, d["-ms-transform"] = c + " " + l, d["-o-transform"] = c + " " + l, d.transform = c + " " + l, d.opacity = "1";
      var f = "mousemove" === t.type ? 2500 : v.duration;
      d["-webkit-transition-duration"] = f + "ms", d["-moz-transition-duration"] = f + "ms", d["-o-transition-duration"] = f + "ms", d["transition-duration"] = f + "ms", o.setAttribute("style", r(d));
    },
    hide: function hide(t, e) {
      for (var n = (e = e || this).getElementsByClassName("waves-rippling"), o = 0, a = n.length; o < a; o++) {
        s(t, e, n[o]);
      }

      m && (e.removeEventListener("touchend", v.hide), e.removeEventListener("touchcancel", v.hide)), e.removeEventListener("mouseup", v.hide), e.removeEventListener("mouseleave", v.hide);
    }
  },
      p = {
    input: function input(t) {
      var e = t.parentNode;

      if ("i" !== e.tagName.toLowerCase() || !e.classList.contains("waves-effect")) {
        var n = document.createElement("i");
        n.className = t.className + " waves-input-wrapper", t.className = "waves-button-input", e.replaceChild(n, t), n.appendChild(t);
        var o = window.getComputedStyle(t, null),
            a = o.color,
            i = o.backgroundColor;
        n.setAttribute("style", "color:" + a + ";background:" + i), t.setAttribute("style", "background-color:rgba(0,0,0,0);");
      }
    },
    img: function img(t) {
      var e = t.parentNode;

      if ("i" !== e.tagName.toLowerCase() || !e.classList.contains("waves-effect")) {
        var n = document.createElement("i");
        e.replaceChild(n, t), n.appendChild(t);
      }
    }
  },
      h = {
    touches: 0,
    allowEvent: function allowEvent(t) {
      var e = !0;
      return /^(mousedown|mousemove)$/.test(t.type) && h.touches && (e = !1), e;
    },
    registerEvent: function registerEvent(t) {
      var e = t.type;
      "touchstart" === e ? h.touches += 1 : /^(touchend|touchcancel)$/.test(e) && setTimeout(function () {
        h.touches && (h.touches -= 1);
      }, 500);
    }
  };
  return l.init = function (t) {
    var e = document.body;
    "duration" in (t = t || {}) && (v.duration = t.duration), "delay" in t && (v.delay = t.delay), m && (e.addEventListener("touchstart", c, !1), e.addEventListener("touchcancel", h.registerEvent, !1), e.addEventListener("touchend", h.registerEvent, !1)), e.addEventListener("mousedown", c, !1);
  }, l.attach = function (t, e) {
    t = a(t), "[object Array]" === f.call(e) && (e = e.join(" ")), e = e ? " " + e : "";

    for (var n, o, i = 0, r = t.length; i < r; i++) {
      o = (n = t[i]).tagName.toLowerCase(), -1 !== ["input", "img"].indexOf(o) && (p[o](n), n = n.parentElement), -1 === n.className.indexOf("waves-effect") && (n.className += " waves-effect" + e);
    }
  }, l.ripple = function (t, e) {
    var n = (t = a(t)).length;
    if (e = e || {}, e.wait = e.wait || 0, e.position = e.position || null, n) for (var o, r, s, u = {}, c = 0, l = {
      type: "mousedown",
      button: 1
    }; c < n; c++) {
      if (o = t[c], r = e.position || {
        x: o.clientWidth / 2,
        y: o.clientHeight / 2
      }, s = i(o), u.x = s.left + r.x, u.y = s.top + r.y, l.pageX = u.x, l.pageY = u.y, v.show(l, o), e.wait >= 0 && null !== e.wait) {
        var d = {
          type: "mouseup",
          button: 1
        };
        setTimeout(function (t, e) {
          return function () {
            v.hide(t, e);
          };
        }(d, o), e.wait);
      }
    }
  }, l.calm = function (t) {
    for (var e = {
      type: "mouseup",
      button: 1
    }, n = 0, o = (t = a(t)).length; n < o; n++) {
      v.hide(e, t[n]);
    }
  }, l.displayEffect = function (t) {
    l.init(t);
  }, l;
});
/* 
*	Core JS
*
*/

var CM = {
  $: function $(arg) {
    return document.querySelector(arg);
  },
  $$: function $$(arg) {
    return document.querySelectorAll(arg);
  },
  ready: function ready(callback) {
    if (document.readyState != 'loading') {
      callback();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') {
          callback();
        }
      });
    }
  },
  openSideNav: function openSideNav() {
    CM.$('#site-drawer-overlay').classList.add('is-active');
    CM.$('#site-drawer').classList.toggle('is-active');
  },
  closeSideNav: function closeSideNav() {
    CM.$('#site-drawer-overlay').classList.remove('is-active');
    CM.$('#site-drawer').classList.remove('is-active');
  },
  sideNavSetup: function sideNavSetup() {
    var items = CM.$$(".smooth .expansion-panel-header");
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var angle = this.parentElement.querySelector('.smooth .expansion-panel-header .arrow') || null;
        this.nextElementSibling.classList.toggle('is-active');
        angle && angle.classList.toggle('f-active');

        if (this.nextElementSibling.style.height) {
          this.nextElementSibling.style.height = null;
          this.classList.remove('is-active');
        } else {
          this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight + 'px';
          this.classList.add('is-active');
        }
      });
    });
  },
  toggleExpansionPanel: function toggleExpansionPanel(component) {
    component ? function () {
      var angle = CM.$(component).parentElement.querySelector('.smooth .expansion-panel-header .arrow');
      CM.$(component).nextElementSibling.classList.toggle('is-active');
      angle.classList.toggle('f-active');

      if (CM.$(component).nextElementSibling.style.height) {
        CM.$(component).classList.remove('is-active');
        CM.$(component).nextElementSibling.style.height = null;
      } else {
        CM.$(component).classList.add('is-active');
        CM.$(component).nextElementSibling.style.height = CM.$(component).nextElementSibling.scrollHeight + 'px';
      }
    }() : function () {
      CM.error('ID provided is not valid');
    }();
  },
  addRippleToDrawer: function addRippleToDrawer() {
    var dl = document.querySelectorAll('#site-drawer .list-item');
    Array.from(dl).forEach(function (l) {
      l.classList.add('waves-effect');
    });
  },
  scrollSetup: function scrollSetup() {
    window.addEventListener('scroll', function (e) {
      var st = window.pageYOffset || this.document.documentElement.scrollTop;

      if (document.documentElement.scrollTop > 400 || document.body.scrollTop > 400) {
        CM.$('#btnTop').classList.add('active');
      } else {
        CM.$('#btnTop').classList.remove('active');
      }
    });
    CM.$('#btnTop').addEventListener('click', function () {
      CM.$('#site-wrapper').scrollIntoView({
        behavior: 'smooth'
      });
    });
  },
  activateLink: function activateLink(el) {
    var allLinks = CM.$$("#site-drawer .list-item-title");

    for (var i = 0; i < allLinks.length; i++) {
      if (allLinks[i].textContent == el) {
        allLinks[i].parentElement.parentElement.classList.add('is-active');
        break;
      }
    }
  },
  selectText: function selectText(element) {
    var doc = document,
        text = element,
        range,
        selection;

    if (doc.body.createTextRange) {
      //ms
      range = doc.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      //all others
      selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  },
  initCodeCopy: function initCodeCopy() {
    var btnCopy = document.querySelectorAll('.btnCopy'),
        that = this,
        max = btnCopy.length;

    for (var i = 0; i < max; i++) {
      btnCopy[i].onclick = function () {
        that.selectText(this.nextElementSibling);
      };
    }
  }
};
var app = new Vue({
  el: '#site-wrapper',
  data: {
    vDrawerActive: false,
    vDark: false
  },
  methods: {
    backToTop: function backToTop() {
      CM.$('#site-wrapper').scrollIntoView(true);
    },
    applyDarkTheme: function applyDarkTheme() {
      this.vDark = true;
    },
    toggleTheme: function toggleTheme() {
      if (!this.vDark) {
        document.body.setAttribute('id', 'dark');
        this.applyDarkTheme();
      } else {
        document.body.removeAttribute('id', 'dark');
        this.vDark = false;
      }
    }
  }
});
CM.ready(function () {
  CM.sideNavSetup();
  Waves.init({
    duration: 1000
  });
  CM.addRippleToDrawer();
  CM.scrollSetup();
  CM.initCodeCopy();
});