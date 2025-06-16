const Config = (prop) => {
    const configList = {
        //urlRoot:'http://localhost:4000/api'
        //urlRoot:'http://168.231.112.194:4000/api'
        //urlRoot: 'http://192.168.1.120:4000/api'
        urlRoot: 'http://187.33.157.164:4000/api' // Remoto en clouding
    }
    return configList[prop];
}

export default Config