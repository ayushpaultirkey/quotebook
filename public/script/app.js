import H12 from "./../library/h12.js";
import Menu from "./component/menu.js";
import QuoteCreate from "./component/quote-create.js";
import NavigationButton from "./component/navigation-button.js";
import QuoteDisplay from "./component/quote-display.js";

@Component
class App extends H12.Component {

    constructor() {
        super();
        this.id = "quotebook";
    }
    async init() {


    }
    async render() {
        return <>
            <div class="bg-white w-full h-full flex justify-center items-center">
                
                <div class="w-full h-full">
                    <Menu args={{ id: "menu" }} />
                    <NavigationButton args={{ id: "navigation-button" }} />
                    <QuoteCreate args={{ id: "quote-create" }} />
                    <QuoteDisplay args={{ id: "quote-display" }} />
                </div>

            </div>
        </>;
    }

}

H12.Component.Render(<App args />, ".app");