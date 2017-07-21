class Config{
    constructor(){
        this.config = {}
    }

    set(config){
        this.config = config;
    }

    get(){
        return this.config
    }
}

const config = new Config();

export default config;