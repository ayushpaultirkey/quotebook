import H12 from "../../library/h12.js";

@Component
class QuoteCreate extends H12.Component {

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
        return <>
            <div class="absolute w-full h-full p-6 z-[95] bg-gray-100 top-0" style="right: {q-right}; scale: {q-scale}; transition: 0.3s;">
                <div class="flex flex-col mt-8 space-y-4">
                    <label class="text-2xl font-bold">Create</label>
                    <textarea id="content" placeholder="Write your quote here" class="p-2 h-32 border border-solid border-gray-300 rounded-lg outline-0 shadow-sm bg-white text-sm resize-none"></textarea>
                    <input id="author" type="text" placeholder="by (optional)" class="p-2 border border-solid border-gray-300 rounded-lg outline-0 shadow-sm bg-white text-sm" />
                    <div>
                        <button onclick="{q-create}" class="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 transition-colors border border-solid border-blue-500 rounded-lg text-left text-sm py-2 px-6 shadow-sm shadow-blue-400">{q-button}</button>
                        <button onclick="{q-hide}" class="ml-2 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 transition-colors border border-solid border-gray-500 rounded-lg text-left text-sm py-2 px-6 shadow-sm">Cancel</button>
                    </div>
                </div>
            </div>
        </>;
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

export default QuoteCreate;