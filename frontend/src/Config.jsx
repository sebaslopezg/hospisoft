const Config = (prop) => {
    const configList = {
        urlRoot:'http://localhost:4000/api'
    }
    return configList[prop];
}

export default Config