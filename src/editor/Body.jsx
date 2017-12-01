import Config from "../Config";

const Input = novi.ui.input;
const Switcher = novi.ui.switcher;
const React = novi.react.React;
const Component = novi.react.Component;
const Language = novi.language;
export default class Body extends Component {
    constructor(props) {
        super(props);

        const config = Config.get();
        let {recipientEmail, useSmtp, host, port, username, password} = config;

        this.state = {
            recipientEmail,
            useSmtp,
            host,
            port,
            username,
            password,

            initValue: config,
            element: props.element
        };

        this.style = `
        .rd-mailform-wrap{
            padding: 20px 12px 0;
            display: flex;
            flex-direction: column;
            height: calc(100% - 20px);
            color: #6E778A;
        }
        
        .rd-mailform-switcher{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
        }
        
        .rd-mailform-group{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
        }
        
        .rd-mailfrom-group-item + .rd-mailfrom-group-item{
            margin-left: 15px;
        }        
        `;

        this._handleSwitcherChange = this._handleSwitcherChange.bind(this);
        this._renderSmtpSettings = this._renderSmtpSettings.bind(this);
        this._changeBodyHeight = this._changeBodyHeight.bind(this);
        this._changeBodyHeight(useSmtp);
        this.messages = Language.getDataByKey("novi-plugin-rd-mailform");
    }


    render() {
        return (
            <div className="rd-mailform-wrap">
                <style>{this.style}</style>
                <p className="novi-label" style={{"marginTop": 0}}>
                    {this.messages.editor.body.emailAddress}
                </p>
                <Input onChange={this._handleInputChange.bind(this, "recipientEmail")} value={this.state.recipientEmail}/>
                <div className="rd-mailform-switcher">
                    <p className="novi-label" style={{"margin": 0}}>
                        {this.messages.editor.body.smtpUse}
                    </p>
                    <Switcher isActive={this.state.useSmtp} onChange={this._handleSwitcherChange}/>
                </div>
                {this._renderSmtpSettings()}
            </div>
        )
    }

    _renderSmtpSettings(){
        if (!this.state.useSmtp) return null;
        return(
            <div>
                <div className="rd-mailform-group">
                    <div className="rd-mailfrom-group-item" style={{"width": "60%"}}>
                        <p className="novi-label" style={{"marginTop": 0}}>
                            {this.messages.editor.body.host}
                        </p>
                        <Input disabled={this.state.useSmtp ? null : "disabled"} onChange={this._handleInputChange.bind(this, "host")} value={this.state.host}/>
                    </div>

                    <div className="rd-mailfrom-group-item" style={{"width": "40%"}}>
                        <p className="novi-label" style={{"marginTop": 0}}>
                            {this.messages.editor.body.port}
                        </p>
                        <Input disabled={this.state.useSmtp ? null : "disabled"} onChange={this._handleInputChange.bind(this, "port")} value={this.state.port}/>
                    </div>
                </div>

                <div className="rd-mailform-group">
                    <div className="rd-mailfrom-group-item">
                        <p className="novi-label" style={{"marginTop": 0}}>
                            {this.messages.editor.body.userName}
                        </p>
                        <Input disabled={this.state.useSmtp ? null : "disabled"} onChange={this._handleInputChange.bind(this, "username")} value={this.state.username}/>
                    </div>

                    <div className="rd-mailfrom-group-item">
                        <p className="novi-label" style={{"marginTop": 0}}>
                            {this.messages.editor.body.pass}
                        </p>
                        <Input disabled={this.state.useSmtp ? null : "disabled"} type="password" onChange={this._handleInputChange.bind(this, "password")} value={this.state.password}/>
                    </div>
                </div>
            </div>
        )
    }

    _handleSwitcherChange(isActive){
        this.setState({
            useSmtp: isActive
        });
        this._changeBodyHeight(isActive);

    }

    _changeBodyHeight(isActive){
        if (isActive){
            novi.editor.setBodyHeight(280)
        }
        else{
            novi.editor.setBodyHeight(130)
        }
    }
    _handleInputChange(propertyName, e) {
        let value = e.target.value;
        let newState = {};
        newState[propertyName] = value;
        this.setState(newState);
    }
}