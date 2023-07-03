import H12 from "../../library/h12.js";

@Component
class NavigationButton extends H12.Component {

    constructor() {
        super();
    }
    init() {
        this.Set("{q-menu}", this.ToggleMenuAndCreate);
    }
    render() {
        return <>
            <div class="absolute right-4 top-4 z-[100]">
                <button onclick="{q-menu}" class="hover:text-blue-400 active:text-blue-500 transition-colors"><i class="fa fa-bars mr-2 text-sm"></i>MENU</button>
            </div>
        </>;
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

export default NavigationButton;