import H12 from "../../library/h12.js";

@Component
class Menu extends H12.Component {

    constructor() {
        super();
    }
    init() {
        this.Set("{q-left}", "100%");
        this.Set("{q-scale}", "0.8");
    }
    render() {
        return <>
            <div class="absolute w-full h-full p-6 z-[95] bg-gray-100 top-0" style="left: {q-left}; scale: {q-scale}; transition: 0.3s;">
                <div class="flex flex-col mt-8">
                    <label class="text-2xl font-bold">quotebook.<label class="text-sm">v1</label></label>
                    <a href="https://github.com/ayushpaultirkey/quotebook" class="text-blue-400 underline">github</a>
                </div>
            </div>
        </>;
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

export default Menu;