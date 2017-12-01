const React = novi.react.React;
import RDMailformEditor from "./RDMailformEditor";
import RDMailformSettings from "./RDMailformSettings";
import Config from "./Config";
const Language = novi.language;
const Plugin = {
    name: "novi-plugin-rd-mailform",
    title: "Novi RD Mailform",
    description: "Novi RD Mailform description",
    version: "1.0.3",
    dependencies: {
        novi: "0.8.6"
    },
    defaults: {
        querySelector: '.rd-mailform',
        configLocation: 'bat/rd-mailform.config.json'
    },
    ui: {
        editor: [RDMailformEditor],
        settings: <RDMailformSettings />,
    },
    onLanguageChange: onLanguageChange
};

function onLanguageChange(plugin){
    let messages = Language.getDataByKey("novi-plugin-rd-mailform");
    plugin.ui.editor[0].title = messages.editor.title;
    plugin.ui.editor[0].tooltip = messages.editor.tooltip;
    plugin.ui.editor[0].header[1] = <span>{messages.editor.header}</span>;
    return plugin;
}

novi.plugins.register(Plugin);

const settings = novi.plugins.settings.get("novi-plugin-rd-mailform");
novi.files.getProjectFile({path: settings.configLocation})
    .then(response =>{
        if (!response || !response.data) return null;
        Config.set(response.data);
    });