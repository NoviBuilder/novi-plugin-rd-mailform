const Icon = novi.ui.icon;
const Icons = novi.ui.icons;
const React = novi.react.React;
const Component = novi.react.Component;

export default class Trigger extends Component{
    constructor(){
        super();
    }

    render(){
        return <Icon>{Icons.ICON_MAILFORM}</Icon>;
    }
}