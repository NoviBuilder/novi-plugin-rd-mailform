const React = novi.react.React;
const Icons = novi.ui.icons;
import Trigger from "./editor/Trigger";
import Body from "./editor/Body";
import Config from "./Config";
const messages = novi.language.getDataByKey("novi-plugin-rd-mailform");

const EditorItem = {
    trigger: <Trigger/>,
    tooltip: messages.editor.tooltip,
    header: [Icons.ICON_MAILFORM, <span>{messages.editor.header}</span>],
    body: [<Body/>],
    closeIcon: "submit",
    onSubmit: onSubmitAction,
    width: 360,
    height: 130,
    title: messages.editor.title
};


export default EditorItem;

function onSubmitAction(headerStates, bodyStates) {
    let state = bodyStates[0];
    let newConfig = {
        recipientEmail: state.recipientEmail,
        useSmtp: state.useSmtp,
        host: state.host,
        port: state.port,
        username: state.username,
        password: state.password,
    };

    if( novi.utils.lodash.isEqual(newConfig, state.initValue) ) return;

    const settings = novi.plugins.settings.get("novi-plugin-rd-mailform");

    novi.files.saveProjectFile({path: settings.configLocation, content: JSON.stringify(newConfig)}).then((response)=>{
        if (!response) return;

        if (response.data || response.demoMode){
            Config.set(newConfig);
        }
    });
}