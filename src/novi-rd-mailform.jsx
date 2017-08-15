const React = novi.react.React;
import RDMailformEditor from "./RDMailformEditor";
import RDMailformSettings from "./RDMailformSettings";
import Config from "./Config";

const Plugin = {
    name: "novi-plugin-rd-mailform",
    title: "Novi RD Mailform",
    description: "Novi RD Mailform description",
    version: "1.0.2",
    dependencies: {
    },
    defaults: {
        querySelector: '.rd-mailform',
        configLocation: 'bat/rd-mailform.config.json'
    },
    ui: {
        editor: [RDMailformEditor],
        settings: <RDMailformSettings />,
    },
};

novi.plugins.register(Plugin);
const settings = novi.plugins.settings.get("novi-plugin-rd-mailform");
novi.files.getProjectFile({path: settings.configLocation})
    .then(response =>{
        if (!response || !response.data) return null;
        Config.set(response.data);
    });