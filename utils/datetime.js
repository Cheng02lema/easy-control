/**
 * 倒计时格式化
 * @param secondSub
 */
export function formatTotalDateSub (secondSub) {
  let days = Math.floor(secondSub / (24 * 3600));     // 计算出小时数
  let leave1 = secondSub % (24*3600) ;                // 计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / 3600);              // 计算相差分钟数
  let leave2 = leave1 % (3600);                       // 计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / 60);              // 计算相差秒数
  let leave3 = leave2 % 60;                           // 计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3);
  return days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + ' 秒';
}


export function stringToDate(dateString){
  if (dateString) {
    var arr1 = dateString.split(" ");
    var sdate = arr1[0].split('-');
    var date = new Date(sdate[0], sdate[1]-1, sdate[2]);
    return date;
  }
}

/**
 * @param {number} time 字符串 2017-12-15 10:30:00
 * @param {string} option  不填
 * @returns {string}  短时间返回 刚刚 ，分钟前 小时前 ，大于1小时返回年月日时分秒
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 日期格式化
 * @param secondSub
 */
export function dateFormat(originVal)
{
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

export function dateFormat2(originVal)
{
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  // yyyy-mm-dd hh:mm:ss
  return `${y}${m}${d}`
}


/**
 * 计算时间差，单位秒
 * @param startDateStr
 * @param endDateStr
 */
export function calcTotalSecond(startDateStr, endDateStr) {
  var date1 = new Date(startDateStr);             // 开始时间
  var date2 = new Date(endDateStr);               // 结束时间
  var timeSub = date2.getTime() - date1.getTime();  // 时间差毫秒
  return timeSub / 1000;
}

/**
 * 根据时间计算星期
 * @param startDateStr
 * @param endDateStr
 */
export function getweekday(dateStr){
  var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");

  var week = weekArray[new Date(dateStr).getDay()];//注意此处必须是先new一个Date

  return week;

}



function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}


export function getNowFormatDate(date) {
 //  var date = new Date()
 // var seperator1 = "-";
 //  var year = date.getFullYear();
 //  var month = date.getMonth() + 1;
 //  var strDate = date.getDate();
 //  if (month >= 1 && month <= 9) {
 //    month = "0" + month;
 //  }
 //  if (strDate >= 0 && strDate <= 9) {
 //    strDate = "0" + strDate;
 //  }
// var currentdate = year + seperator1 + month + seperator1 + strDate;
 //var currentdate = year + month +  strDate;
 return date.replace("-"," ");

}

export function getNowFormatDate2() {
  var date = new Date()
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
 var currentdate = year + month +  strDate;
  return currentdate;
}

//获取几天前、几天后的日期
// console.log("半年前："+GetDateByTimeSpan(-180));
// console.log("三月前："+GetDateByTimeSpan(-90));
// console.log("一月前："+GetDateByTimeSpan(-30));
// console.log("昨天："+GetDateByTimeSpan(-1));
// console.log("今天："+GetDateByTimeSpan(0));
// console.log("明天："+GetDateByTimeSpan(1));
// console.log("后天："+GetDateByTimeSpan(2));
// console.log("一月后："+GetDateByTimeSpan(30));
// console.log("三月后："+GetDateByTimeSpan(90));
// console.log("半年后："+GetDateByTimeSpan(180));
export function GetDateByTimeSpan(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
  var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
  return y+"-"+m+"-"+d;

}






