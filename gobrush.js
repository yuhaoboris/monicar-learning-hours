var request = require('request');

// 设置视频栏目信息
var lmid = 82;
var spid = 1861;
var kmid = 3;

// 设置视频时间信息，此处根据实际情况填写
var videoTime = 248;
var recordTime = 265;

var optCookie = ""; // 此处填写站点cookie值
var optHost = 'www.monicar.cn';
var optOrigin = 'http://www.monicar.cn';
var optXReq = 'XMLHttpRequest';
var optAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
var optContType = 'application/x-www-form-urlencoded; charset=UTF-8';
var optReferer = 'http://www.monicar.cn/StudentManage/TheorTrain';
var optMethod = 'POST';

// 设置Add请求头
var addOptions = {
	url: 'http://www.monicar.cn/StudentManage/AddXxgj',
	headers: {
		'Host': optHost,
		'Content-Length': '24',
		'Origin': optOrigin,
		'X-Requested-With': optXReq,
		'User-Agent': optAgent,
		'Content-Type': optContType,
		'Referer': optReferer,
		'cookie': optCookie
	},
	qs: {
		'lmid': lmid,
		'spid': spid,
		'kmid': kmid
	},
	method: optMethod
}
// 设置Edit请求头
var editOptions = {
	url: 'http://www.monicar.cn/StudentManage/EditXxgj',
	headers: {
		'Host': optHost,
		'Content-Length': '61',
		'Origin': optOrigin,
		'X-Requested-With': optXReq,
		'User-Agent': optAgent,
		'Content-Type': optContType,
		'Referer': optReferer,
		'cookie': optCookie
	},
	qs: {
		'lmid': lmid,
		'spid': spid,
		'myFlag': '1',
		'realVideoTime': videoTime,
		'myRecordTime': recordTime
	},
	method: optMethod
}

// Add请求
function addRecord() {
	request(addOptions, function(err, res, body) {
		if(!err && res.statusCode == 200) {
			// 请求成功
			var resMsg = JSON.parse(body);
			if(resMsg.msg == 1) {
				console.log('======================');
				console.log('#Add record succeed!');
			} else {
				console.log('======================');
				console.log('!Add record failed!');
				console.log('#Trying to add record again.');
			}
		} else {
			console.log(err.stack);
		}
	});
}

// Edit请求
function editRecord() {
	request(editOptions, function(err, res, body) {
		if(!err && res.statusCode == 200) {
			// 请求成功
			var resMsg = JSON.parse(body);
			if(resMsg.msg == 1) {
				console.log('#Edit record succeed!');
			} else if(resMsg.msg == -1) {
				clearInterval(t2);
				console.log('#Finished!');
				console.log('======================');
				return false;
			} else {
				console.log('!Edit record failed!');
			}
		} else {
			console.log(err.stack);
		}
	});
}

// 开刷
function goBrush() {
	addRecord();
	var t1 = setTimeout(editRecord, 1000);
}

// 5秒一次
var t2 = setInterval(goBrush, 5000);