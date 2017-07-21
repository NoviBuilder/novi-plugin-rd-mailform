import Config from "./Config";
const React = novi.react.React;
const Component = novi.react.Component;
const Input = novi.ui.input;
const Button = novi.ui.button;

export default class ImageSettings extends Component {
    constructor(props) {
        super();

        this.state = {
            querySelector: props.settings.querySelector,
            configLocation: props.settings.configLocation
        };
        this.initConfigLocation = props.settings.configLocation;
        this.saveSettings = this.saveSettings.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            querySelector: props.settings.querySelector,
            configLocation: props.settings.configLocation
        })
    }

    render() {
        return (
            <div>
                <span style={{letterSpacing: "0,0462em"}}>RD Mailform Plugin</span>
                <div style={{fontSize: 13, color: "#6E778A", marginTop: 21}}>Apply this plugin to elements which are matching selector:</div>
                    <Input style={{marginTop: 10, width: 340}} value={this.state.querySelector} onChange={this.onInputChange.bind(this, "querySelector")}/>
                <div style={{fontSize: 13, color: "#6E778A", marginTop: 21}}>Path to RD Mailform configuration file:</div>
                <Input style={{marginTop: 10, width: 340}} value={this.state.configLocation} onChange={this.onInputChange.bind(this, "configLocation")}/>
                <div style={{marginTop: 30}}>
                <Button type="primary"  messages={{textContent: "Save Settings"}} onClick={this.saveSettings} />
                </div>
            </div>
        );
    }

    onInputChange(propertyName, e) {
        let value = e.target.value;
        let newState = {};
        newState[propertyName] = value;
        this.setState(newState);
    }

    saveSettings(){
        novi.plugins.settings.update("novi-plugin-rd-mailform", this.state);
        if (this.state.configLocation !== this.initConfigLocation){
            this.initConfigLocation = this.state.configLocation;
            novi.files.getProjectFile({path: this.state.configLocation}).then(response =>{
                if (!response.data) return null;
                Config.set(response.data);
            });
        }
    }
}