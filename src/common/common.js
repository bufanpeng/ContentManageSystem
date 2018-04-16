/**
* 项目上的公共方法
* author bufanpeng
* created by 2018.01.19
**/
import axios from 'axios'
import Vue from 'vue'
import {obj} from './urlConfig.js'
axios.defaults.baseURL = obj.defaultsUrl;
axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
const self = new Vue();
export const axiosConfig = {
    defaultsUrl: {baseURL: obj.defaultsUrl}, // 默认URL
};

/**
 * http POST 请求方法
 * @param {Object} options  http请求的参数集合
 *  {
 *      url:     {String}       http请求路径
 *      data:    {Object}       POST发送数据
 *      success: {Function}     http请求成功时执行的方法
 *      error:   {Function}     http请求失败时执行的方法
 *      message: {String}       http请求提示信息
 *      config:  {Object}       axios配置信息
 *      that:    {Object}       vue实例
 *  }
 */
export function axiosPost (options) {
    if (typeof options.url !== "string" || !options.url.length) {
        console.log('url 参数不合法！');
        return false;
    }
    options = Object.assign({
        url: '',
        data: {},
        success: null,
        error: null,
        message: '',
        config: {},
        that: self
    }, options);
    // let newObj = JSON.parse(options.data);
    let newObj = options.data;
    // 统一处理post请求参数为空值是赋值为null(可选)
    for (let k in newObj) {
        if (newObj[k] === '') {
            newObj[k] = null;
        }
    }
    axios.post(options.url, newObj, options.config)
        .then(function(respons) {
            processResponseData(options.that, respons, options.message, options.success);
        })
        .catch(function(error) {
            showMsg('POST请求异常：' + error, 'error');
            options.error && options.error(error);
        });
}

/**
 * http GET 请求方法
 * @param {Object} options  http请求的参数集合
 * {
 *    url:     {String}       http请求路径
 *    success: {Function}     http请求成功时执行的方法
 *    error:   {Function}     http请求失败时执行的方法
 *    message: {String}       http请求提示信息
 *    config:  {Object}       axios配置信息
 *    that:    {Object}       vue实例
 * }
 */
export function axiosGet (options) {
    if (typeof options.url !== "string" || !options.url.length) {
        console.log('url 参数不合法！');
        return false;
    }

    options = Object.assign({
        url: '',
        success: null,
        error: null,
        message: '',
        config: {},
        that: self
    }, options);


    axios.get(options.url, options.config)
        .then(function(respons) {
            processResponseData(options.that, respons, options.message, options.success);
        })
        .catch(function(error) {
            showMsg('GET请求异常：' + error, 'error');
            options.error && options.error(error);
        });
}

const processResponseData = (that, respons, message, callback) => {
    // 后台数据返回成功
    if (respons.data.result) {
        if (message) {
            showMsg(message, 'success')
        }
        callback && callback(respons);
    } else {
        callback && callback(respons);
        // showMsg(respons.data.msg, 'error')
    }
};

export let loginId = getCookie('EmployeeId');

/**
 * 获取cookie
 * @param name  cookie名称
 * @return {string} cookie值
 */
function getCookie(name) {
    let strCookie = document.cookie;
    let arrCookie = strCookie.split(";");
    let cookieVal = {
        name: '朱丹', // 用户名字
        id: 'wzzhudan', // 用户Id QUERY,
        leave: 0, // 审批人级别
        code: '43562653', // 企业编码 
    };

    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");

        if (arr[0] === name) {
            cookieVal = arr[1];
            break;
        }
    }
    return cookieVal;
};

/**
 * 将中国标准时间转成年月日格式，并去掉时分秒
 * 例如：Wed May 03 2017 10:07:16 GMT+0800 (中国标准时间)  ---> 2017-5-3
 * @time {string} 获取的时间戳的值
 */
export function setTime(time, len) {
    len = len || 9
    return new Date(parseInt(new Date(time).getTime())).toLocaleString().substring(0, len);
}
/**
 * 将时间转换成2018-01-11 10:00:00
 * date 为标准时间
 */
export function formatDate (date) {
    if (date !== '') {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        // 小于10的数字自动补0
        let formatTen = function (num) {
          return num > 9 ? (num + "") : ("0" + num);
        };
        return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":"  + formatTen(minute) + ":" + formatTen(second);
    }
    else {
        return '';
    }
}

/**
 * 页面消息提示展示弹窗
 * @param content  展现的信息内容 string
 * @param type     展现的方式  success/warning/info/error
 * @param that     vue的实例
 */
export const showMsg = function(content = '没有可显示的信息！', type) {
    if (type !== 'success' && type !== 'warning' && type !== 'info' && type !== 'error') {
        type = 'warning';
    }
    self.$message({
        message: content,
        type: type,
        duration: 3000,
        showClose: true,
    });
};

/**
 * 解析URL，自动匹配URL中需要转换的字段值
 * @param url         {string} 被解析的包含冒号（：）的url字符串  比如：/fdoh/:fdoId/tree
 * @param data       {object} 包含url中匹配的字段data。 比如：{fdoId: '2'}
 * @return url       {string} 返回匹配好的url  比如 /fdoh/2/tree
 */
export const converUrl = function(url = '', data = {}) {
    let rtnUrl = '';
    if (url.indexOf(':/') > -1) {
        let urlArr = url.split('/');
        for (let i = 1; i < urlArr.length; i++) {
            if (urlArr[i].indexOf(':') > -1) {
                urlArr[i] = data[urlArr[i].replace(':', '')];
            }
        }
        rtnUrl = urlArr.join('/');
    } else {
        rtnUrl = url;
    }
    return rtnUrl;
};

/**
 * 判断传回的数据中有没有null，有则转为空
 * @obj {object} 数据中的对象
 */
export const nullData = function(obj) {
    for (var objAttr in obj) {
        obj[objAttr] = obj[objAttr] == null ? '' : obj[objAttr];
    }
};
/**
 * 如果数据为空字符串 || undefined 则转成null
 */
export const toNull = function(val) {
    return !val ? null : val;
};

/**
 * 清空表单对象，第二个参数可选。
 * 如果第二个参数不为空，则第二个参数里的属性和值将会成为第一个参数要重置的目标值
 * @param {object} source 要清空的源对象
 * @param {object} target 特殊处理的值作为对象传入
 * @return {object} 重置后的对象
 */
export const resetForm = function (source={}, target={}) {
    for (let key in source) {
        source[key] = target[key] ? target[key]: null;
    }
    return source;
};


/**
* 二次确认弹窗
* params {string} info 二次提示的信息
* params {Function} callback 确定后的回调函数
**/
export const confirm = function (info, callback) {
    info = info || '确定后不可修改';
    self.$confirm(info, '提示', {
        closeOnClickModal: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'button-cancel',
        confirmButtonClass: 'button-confirm'
    }).then(() => {
        callback && callback();
    }).catch((error) => {
        showMsg('已取消', 'info');
    });
}

/**
* 数组去重
* params {Array} oldArray 需要去重的数组
* params {string} code 如果是JsonArray的时候可以根据每个对象里的某个字段去重
**/
export const resetArray = function (oldArray, code) {
    let obj = {};
    let newArray = [];
    for (let i = 0, len = oldArray.length;i < len;i++) {
        if (typeof oldArray[i] === 'object') {
            if (obj[oldArray[i][code]] !== 1) {
                newArray.push(oldArray[i][code]);
                obj[oldArray[i][code]] = 1;
            }
        }
        else {
            if (obj[oldArray[i]] !== 1) {
                newArray.push(oldArray[i]);
                obj[oldArray[i]] = 1;
            }
        }
    }
    return newArray;
}

/**
* 解析collection.json
* params {Array} 要解析的数据结构
* return {Array} 解析后的数据
*/
export const resetCollection = function (oldArray) {
    let data = [];
    let arr = []
    for (let [index, item] of oldArray.entries()) {
        var obj = new Object();
        for (let [key, val] of item.data.entries()) {
            obj[val.name] = val['value']
        }
        data.push(obj);
    }
    return data
}