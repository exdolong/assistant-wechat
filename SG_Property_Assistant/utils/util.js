const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 搜索条件筛选
function conditionScreening(curr_index, regionDisplayFlae, callBack) {
  var obj = {};
  var iscurrentMode = false;
  for (var i = 0; i < regionDisplayFlae.length; i++) {
    if (i == curr_index) {
      regionDisplayFlae[curr_index] = !regionDisplayFlae[curr_index];
    } else {
      regionDisplayFlae[i] = false;
    }
    // 判断当前是否有展开
    if (regionDisplayFlae[i].toString() == "true") {
      iscurrentMode = true;
    }
  }
  obj = {
    iscurrentMode: iscurrentMode,
    regionDisplayFlae: regionDisplayFlae,
  };
  callBack(obj);
}

const configure = {
  pathUrl: 'https://api.vickyproperty.yumong.com/api/v1/ma/'
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function unique4(arr) {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        ++i;
      }
    }
    hash.push(arr[i]);
  }
  return hash;
}

function formatMapLngLatAndArray(array) {
  let strMarkers = '';
  for (let index in array) {
    strMarkers += array[index].lng + ',' + array[index].lat + '|'
  }
  strMarkers = strMarkers.substr(0, strMarkers.length - 1);
  return strMarkers;
}

function getAndMapLngLat(array) {
  console.log(formatMapLngLatAndArray(array));
  return `http://api.map.baidu.com/staticimage/v2?ak=A9ce773e870aba291288131e5dd1f500&mcode=666666&center=${array[0].lng},${array[0].lat}&markers=${formatMapLngLatAndArray(array)}&width=800&height=380&zoom=16&markerStyles=-1,http://api.map.baidu.com/images/marker_red.png,-1,2156,2156`;
}

function telephone(string) {
  wx.showActionSheet({
    itemColor: '#333',
    itemList: [string, '呼叫'],
    success(res) {
      if (res.tapIndex) {
        wx.makePhoneCall({
          phoneNumber: string
        })
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  conditionScreening: conditionScreening,
  configure: configure,
  json2Form: json2Form,
  unique4: unique4,
  formatMapLngLatAndArray: formatMapLngLatAndArray,
  getAndMapLngLat: getAndMapLngLat,
  telephone: telephone
}