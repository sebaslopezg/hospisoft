const Config = (prop) => {
    const configList = {
        //urlRoot:'http://localhost:4000/api'
        //urlRoot:'http://168.231.112.194:4000/api'
        urlRoot: 'http://192.168.1.120:4000/api'
    }
    return configList[prop];
}

export default Config