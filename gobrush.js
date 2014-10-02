var request = require('request');

// 设置视频栏目信息
var lmid = 82;
var spid = 1861;
var kmid = 3;

var optCookie = "ASP.NET_SessionId=ypebdmh4rxzhivhq5hnsiv1d; CNZZDATA3564992=cnzz_eid%3D1190719382-1410398391-%26ntime%3D1412215370; StdId=220632; IsFullStudyTime=-1; UserId=131793; jdmemberShip=1039; lastLoginTime=2014/10/1 0:14:11; LoginRandom=7091; lastStudyVido=%e3%80%90%e5%9b%bd%e5%a4%96%e3%80%91%e4%ba%a4%e9%80%9a%e5%ae%89%e5%85%a8%e5%ae%a3%e4%bc%a0%e7%89%87%e5%90%88%e9%9b%86; myWebLocation=1";
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
		'realVideoTime': '248',
		'myRecordTime': '265'
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