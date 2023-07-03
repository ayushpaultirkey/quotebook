import H12 from "../../library/h12.js";

@Component
class QuoteDisplay extends H12.Component {

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
        return <>
            <div class="w-full h-full flex flex-col">

                <div class="h-full flex justify-center items-center p-10 pb-0">
                    <div class="{q-visible}">
                        <label id="block">{q-content}</label>
                        <div class="text-sm font-bold">
                            <label id="author">by @{q-author}</label>
                        </div>
                    </div>
                    <div class="{q-loading}">
                        <label class="text-sm font-bold">{q-message}</label>
                    </div>
                </div>

                <div class="p-10 pt-0 select-none">
                    <div class="text-center space-x-2">
                        <button onclick="{q-create-visible}" class="fa fa-plus w-10 h-10 hover:text-blue-500 active:text-blue-600 transition-colors"></button>
                        <button onclick="{q-random}" class="fa fa-dice w-10 h-10 hover:text-blue-500 active:text-blue-600 transition-colors"></button>
                        <button onclick="{q-copy}" class="fa fa-copy w-10 h-10 hover:text-blue-500 active:text-blue-600 transition-colors"></button>
                    </div>
                </div>

            </div>
        </>;
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

export default QuoteDisplay;