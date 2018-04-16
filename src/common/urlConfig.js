export const obj = getUrlConfig();

/*
* 动态配置正式环境和预生产环境的接口访问路径
*/
function getUrlConfig() {
    /******************************** 路径配置 ******************************/
    let url = {
        defaultsUrl: 'http://myadmin.tjbolaimei.com/index.php/', // 正常线上的默认url (rest)
    };

    return url;
}