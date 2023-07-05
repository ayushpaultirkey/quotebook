let Method = {};
Method.List = {};
class Component {
    constructor() {
        this.id = `c-${Math.random().toString(36).slice(6)}`,
        this.parent = {},
        this.child = {},
        this.binding = {
            "@e": {}
        },
        this.root = null,
        this.wait = !0,
        this.args = {}
    }
    async init() {}
    async render() {
        return document.createElement("div")
    }
    Unique(t="", e={}) {
        this.root.querySelectorAll(`[${t}]`).forEach(i=>{
            let n = "x" + Math.random().toString(36).slice(6);
            e[i.getAttribute(t)] = i,
            i.setAttribute(t, n)
        }
        )
    }
    async _cx(t=null, e="") {
        if (!(t instanceof Object))
            return document.createTextNode("");
        {
            let i = new t;
            return e instanceof Object && void 0 !== (e = void 0 !== e.args ? e.args : e).id && (i.id = e.id),
            i.parent[this.id] = this,
            i.args = e,
            this.child[i.id] = i,
            await i._init(null, e)
        }
    }
    _nx(t=null, e="", i={}) {
        let n = "x" + Math.random().toString(36).slice(6)
          , r = null
          , a = !1;
        if ("t" === t)
            -1 == e.indexOf("{") ? r = document.createTextNode(e) : ((r = document.createElement("span")).innerText = e,
            r.classList.add(n),
            this._bx(e, `.${n}`, 2));
        else {
            for (let s in r = document.createElement(t),
            i) {
                let o = i[s];
                if (o instanceof Object) {
                    for (let l in o) {
                        let d = (r.hasAttribute(l) ? r.getAttribute(l) : "") + o[l].toString();
                        -1 !== d.indexOf("{") && (_bax.bind(this)(d, l, n),
                        a = !0),
                        r.setAttribute(l, d)
                    }
                    continue
                }
                -1 !== (o = (r.hasAttribute(s) ? r.getAttribute(s) : "") + o.toString()).indexOf("{") && (_bax.bind(this)(o, s, n),
                a = !0),
                r.setAttribute(s, o)
            }
            e instanceof Array ? e.forEach(t=>{
                r.appendChild(t)
            }
            ) : (r.innerHTML = e,
            -1 !== e.indexOf("{") && (this._bx.bind(this)(e, `.${n}`, 2),
            a = !0)),
            a && r.classList.add(n)
        }
        return r
    }
    _bx(t, e, i, n={}) {
        void 0 === this.binding[t] && (this.binding[t] = {
            value: t,
            e: []
        }),
        void 0 === this.binding["@e"][e] && (this.binding["@e"][e] = {}),
        1 == i && ("class" == n.attr && (n.data += ` ${e.replace(/\./g, "")}`),
        void 0 === this.binding["@e"][e][n.attr] && (this.binding["@e"][e][n.attr] = {},
        this.binding["@e"][e][n.attr]["@value"] = n.data,
        this.binding["@e"][e][n.attr]["@key"] = []),
        this.binding["@e"][e][n.attr]["@key"].push(t),
        delete n.data),
        this.binding[t].e.push({
            type: i,
            node: e,
            ...n
        })
    }
    Set(t="", e="") {
        let i = this.binding[t.replace("++", "")];
        if (void 0 !== i) {
            let n = i.e;
            for (var r = 0, a = n.length; r < a; r++) {
                let s = n[r];
                if (1 == s.type) {
                    let o = s.node
                      , l = this.binding["@e"][o]
                      , d = this.root.classList.contains(o.replace(".", "")) ? this.root : this.root.querySelector(o);
                    if (void 0 === l || void 0 === l[s.attr] || null == d)
                        continue;
                    let h = l[s.attr]["@value"]
                      , c = l[s.attr]["@key"];
                    if ("function" == typeof e) {
                        let u = `e-${Math.random().toString(36).slice(6)}`;
                        Method.List[u] = {
                            event: e.bind(this),
                            e: o[r].selector
                        },
                        e = `hxh.List["${u}"].event();`
                    }
                    h = h.replace(RegExp(t.replace("++", ""), "g"), e),
                    c.forEach(t=>{
                        h = h.replace(RegExp(t, "g"), this.binding[t].value)
                    }
                    ),
                    d.setAttribute(s.attr, h)
                } else if (2 == s.type) {
                    let f = this.root.classList.contains(s.node.replace(".", "")) ? this.root : this.root.querySelector(s.node);
                    if (null == f)
                        continue;
                    let b = t.indexOf("++");
                    e instanceof Element ? (-1 !== b ? f.insertAdjacentElement(0 == b ? "afterbegin" : "beforeend", e) : (f.childNodes.forEach(t=>t.remove()),
                    f.appendChild(e)),
                    e = e.outerHTML) : -1 !== b ? (f.insertAdjacentHTML(0 == b ? "afterbegin" : "beforeend", e),
                    e = i.value + e) : f.innerHTML = e
                }
            }
            i.value = e
        }
    }
    Get(t) {
        let e = this.binding[t];
        return void 0 !== e ? e.value : null
    }
    Style(t={}) {
        let e = "";
        for (var i in t)
            e += `${i}:${t[i]};`;
        return e
    }
    async _init(t=null, e={}) {
        if (this.root = "function" == typeof this.warp ? await this.warp() : await this.render(),
        this.wait ? await this.init(e) : this.init(e),
        null == t)
            return this.root;
        document.querySelector(t).appendChild(this.root)
    }
}
function _bax(t, e, i) {
    let n = t.match(/{\w\S+?}/gm);
    if (null !== n) {
        let r = [];
        n.forEach(n=>{
            r.includes(n) || (this._bx(n, `.${i}`, 1, {
                data: t,
                attr: e
            }),
            r.push(n))
        }
        )
    }
}
Component.Render = async function(t=null, e={}, i="") {
    let n = new t;
    await n._init(i, e)
}
window.hxc = Component;
window.hxh = Method;

class Menu extends Component {

    constructor() {
        super();
    }
    init() {
        this.Set("{q-left}", "100%");
        this.Set("{q-scale}", "0.8");
    }
    render() {
        return this._nx("div",[this._nx("div",[this._nx("label",[this._nx("t",`quotebook.`),this._nx("label",`v1`,{"class":"text-sm"})],{"class":"text-2xl font-bold"}),this._nx("a",`github`,{"href":"https://github.com/ayushpaultirkey/quotebook","class":"text-blue-400 underline"})],{"class":"flex flex-col mt-8"})],{"class":"absolute w-full h-full p-6 z-[95] bg-gray-100 top-0","style":"left: {q-left}; scale: {q-scale}; transition: 0.3s;"});
    }
    Show() {
        this.Set("{q-left}", "0%");
        this.Set("{q-scale}", "1");
    }
    Hide() {
        this.Set("{q-left}", "100%");
        this.Set("{q-scale}", "0.8");
    }

}

class QuoteCreate extends Component {

    constructor() {
        super();
    }
    init() {
        this.Set("{q-right}", "100%;");
        this.Set("{q-scale}", "0.8");
        this.Set("{q-hide}", this.Hide);
        this.Set("{q-create}", this.Create);
        this.Set("{q-button}", "Create");
    }
    render() {
        return this._nx("div",[this._nx("div",[this._nx("label",`Create`,{"class":"text-2xl font-bold"}),this._nx("textarea",[],{"id":"content","placeholder":"Write your quote here","class":"p-2 h-32 border border-solid border-gray-300 rounded-lg outline-0 shadow-sm bg-white text-sm resize-none"}),this._nx("input",[],{"id":"author","type":"text","placeholder":"by (optional)","class":"p-2 border border-solid border-gray-300 rounded-lg outline-0 shadow-sm bg-white text-sm"}),this._nx("div",[this._nx("button",[this._nx("t",`{q-button}`)],{"onclick":"{q-create}","class":"bg-blue-400 hover:bg-blue-500 active:bg-blue-600 transition-colors border border-solid border-blue-500 rounded-lg text-left text-sm py-2 px-6 shadow-sm shadow-blue-400"}),this._nx("button",`Cancel`,{"onclick":"{q-hide}","class":"ml-2 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 transition-colors border border-solid border-gray-500 rounded-lg text-left text-sm py-2 px-6 shadow-sm"})])],{"class":"flex flex-col mt-8 space-y-4"})],{"class":"absolute w-full h-full p-6 z-[95] bg-gray-100 top-0","style":"right: {q-right}; scale: {q-scale}; transition: 0.3s;"});
    }
    Show() {
        this.Set("{q-right}", "0%");
        this.Set("{q-scale}", "1");
    }
    Hide() {
        this.Set("{q-right}", "100%");
        this.Set("{q-scale}", "0.8");
    }

    async Create() {

        let _content = document.getElementById("content").value;
        let _author = document.getElementById("author").value;
        this.Set("{q-button}", "Creating");

        if(_author.length == 0 || _author == null) {
            _author = "anonymous";
        };

        if(_content.length == 0 || _content == null) {
            alert("Enter content")
        }
        else {
            let _response = await fetch(`/quote/create?content=${_content}&author=${_author}`);
            let _json = await _response.json();
            if(_json.success) {
                alert("Quote created !")
            }
            else {
                alert("Unable to create quote");
            }
        };

        this.Set("{q-button}", "Create");

    }

}

class NavigationButton extends Component {

    constructor() {
        super();
    }
    init() {
        this.Set("{q-menu}", this.ToggleMenuAndCreate);
    }
    render() {
        return this._nx("div",[this._nx("button",[this._nx("i",[],{"class":"fa fa-bars mr-2 text-sm"}),this._nx("t",`MENU`)],{"onclick":"{q-menu}","class":"hover:text-blue-400 active:text-blue-500 transition-colors"})],{"class":"absolute right-4 top-4 z-[100]"});
    }

    ToggleMenuAndCreate() {

        let _create = this.parent["quotebook"].child["quote-create"];
        let _menu = this.parent["quotebook"].child["menu"];

        if(_create.Get("{q-right}") == "0%") {
            _create.Hide();
        };

        if(_menu.Get("{q-left}") == "0%") {
            _menu.Hide();
        }
        else {
            _menu.Show();
        };

    }

}

class QuoteDisplay extends Component {

    constructor() {
        super();
    }
    init() {

        this.Set("{q-create-visible}", this.ShowQuoteCreate);
        this.Set("{q-author}", "");
        this.Set("{q-content}", "");
        this.Set("{q-random}", this.Load);
        this.Set("{q-copy}", this.Copy);
        this.Set("{q-visible}", "hidden");
        this.Set("{q-loading}", "visible");
        this.Set("{q-message}", "loading...");

        this.Load();

    }
    render() {
        return this._nx("div",[this._nx("div",[this._nx("div",[this._nx("label",[this._nx("t",`{q-content}`)],{"id":"block"}),this._nx("div",[this._nx("label",[this._nx("t",`by @`),this._nx("t",`{q-author}`)],{"id":"author"})],{"class":"text-sm font-bold"})],{"class":"{q-visible}"}),this._nx("div",[this._nx("label",[this._nx("t",`{q-message}`)],{"class":"text-sm font-bold"})],{"class":"{q-loading}"})],{"class":"h-full flex justify-center items-center p-10 pb-0"}),this._nx("div",[this._nx("div",[this._nx("button",[],{"onclick":"{q-create-visible}","class":"fa fa-plus w-10 h-10 hover:text-blue-500 active:text-blue-600 transition-colors"}),this._nx("button",[],{"onclick":"{q-random}","class":"fa fa-dice w-10 h-10 hover:text-blue-500 active:text-blue-600 transition-colors"}),this._nx("button",[],{"onclick":"{q-copy}","class":"fa fa-copy w-10 h-10 hover:text-blue-500 active:text-blue-600 transition-colors"})],{"class":"text-center space-x-2"})],{"class":"p-10 pt-0 select-none"})],{"class":"w-full h-full flex flex-col"});
    }

    ShowContent(_content = "") {

        this.Set("{q-content}", "");
        let _index = 0;

        let _interval = setInterval(() => {
            if(_index == _content.length) {
                clearInterval(_interval);
                console.log("STOPPED")
            }
            else {
                this.Set("{q-content}++", _content[_index]);
                _index++;
            }
        }, 15);

    }

    ShowQuoteCreate() {
        this.parent["quotebook"].child["quote-create"].Show();
    }

    async Load() {

        this.Set("{q-visible}", "hidden");
        this.Set("{q-loading}", "visible");
        this.Set("{q-message}", "loading...");

        let _response = await fetch("/quote/random");
        let _json = await _response.json();

        if(_json.success && _json.data.length > 0) {
            this.ShowContent(_json.data[0].q_content.substring(1, _json.data[0].q_content.length - 1));
            this.Set("{q-author}", _json.data[0].q_author.substring(1, _json.data[0].q_author.length - 1));

            this.Set("{q-visible}", "visible");
            this.Set("{q-loading}", "hidden");
        }
        else {
            this.Set("{q-message}", "Unable to load quotes, try again later");
        }

    }
    Copy() {
        navigator.clipboard.writeText(this.Get("{q-content}"));
    }

}

class App extends Component {

    constructor() {
        super();
        this.id = "quotebook";
    }
    async init() {


    }
    async render() {
        return this._nx("div",[this._nx("div",[await this._cx(Menu,{ id: 'menu' }),await this._cx(NavigationButton,{ id: 'navigation-button' }),await this._cx(QuoteCreate,{ id: 'quote-create' }),await this._cx(QuoteDisplay,{ id: 'quote-display' })],{"class":"w-full h-full"})],{"class":"bg-white w-full h-full flex justify-center items-center"});
    }

}

Component.Render(App,{}, ".app");