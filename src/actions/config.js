//   ACTION::CONFIG

export const getAConfig = (configs, target) => (async) => {
    try {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('actions/config :: getAConfig (\n' + configs + '\n)');
    } catch (err) {
        console.log('actions/config.js getAConfig err\n', err);
    }
    //================================================
    console.log('target:', target);
    console.log(Object.values(configs).filter((cfg) => cfg.setting === target));

    // let settings = configs.map((cfg) => {
    // //console.log('settings:\n', settings);
    // console.log('typeof settings: ', typeof settings);
    let result = configs.filter((c) => c.config === target);
    let response = result[0];
    console.log('config:', response.config);
    console.log('label:', response.label);
    console.log('setting:', response.setting);
    return response;
};
export const configIsSet = (configs, target) => (async) => {
    let result = configs.filter((c) => c.config === target);
    let response = result[0];
    console.log(response.setting);
    return response.setting;
};
