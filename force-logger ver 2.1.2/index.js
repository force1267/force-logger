module.exports = (function(dirToMasterFile, optionalStartTime) {
    var jsop = require("jsop")
    var mf
    if (dirToMasterFile) {
        mf = jsop(dirToMasterFile + "/masterLog.json")
    } else {
        dirToMasterFile = ""
        mf = jsop("masterLog.json")
    }
    if (!mf.start) {
        mf.start = new Date()
        mf.tags = ["default"]
        mf.logNum = 0
        mf.logFiles = []
    }
    var includes = function(arr, val) {
        var isGood = false
        arr.forEach(function(i) {
            if (i == val) {
                isGood = true
            }
        })
        return isGood
    }
    return (function() {
        var thisLog = {
            num: mf.logNum,
            start: (optionalStartTime ? optionalStartTime : new Date())
        }
        mf.logFiles.push(thisLog)
        var logFile = jsop(dirToMasterFile + "/logs/log." + mf.logNum + ".json")
        logFile.thisLog = thisLog
        logFile.logs = []
        mf.logNum++;
        var ml = {}
        ml.log = function(options, optionalShow) {
            var log = {}
            log.time = (options.time ? options.time : new Date())
            log.id = (log.time.getTime() + "" + mf.logNum) - 1 + 1
            log.info = (options.info ? options.info : {})
            log.msg = (options.msg ? options.msg : "")
            log.tags = (options.tags ? options.tags : ["default"])
            log.tags.forEach(function(t) {
                var isSaved = false
                console.log("isSaved:" + isSaved)
                mf.tags.forEach(function(tag) {
                    if (t == tag) {
                        isSaved = true
                    }
                })
                if (!isSaved) {
                    mf.tags.push(t)
                }
            })
            if (optionalShow) {
                console.log(log.msg)
            }
            logFile.logs.push(log)
            return true
        }
        ml.search = function(options) {
                var from = new Date((options.from ? options.from : logFile.thisLog.start)).getTime()
                var to = new Date((options.to ? options.to : new Date().toString())).getTime()
                var tags = (options.tags ? options.tags : ["default"])
                var nots = (options.nots ? options.nots : [])
                var logs = []
                var tmpStart = 0
                var tmpEnd = undefined
                var tmpFile = []
                    //prepare logs from logFiles in time range
                mf.logFiles.forEach(function(lf) {
                    if (new Date(lf.start).getTime() <= from) {
                        tmpStart = lf.num
                    } else if (new Date(lf.start).getTime() >= to && tmpEnd === undefined) {
                        tmpEnd = lf.num - 1
                    }
                })
                if (tmpEnd === undefined) {
                    tmpEnd = logFile.thisLog.num
                }
                for (i = tmpStart; i <= tmpEnd; i++) {
                    tmpFile[i] = jsop(dirToMasterFile + "/logs/log." + i + ".json")
                    tmpFile[i].logs.forEach(function(l) {
                        if (new Date(l.time).getTime() >= from && new Date(l.time).getTime() <= to) {
                            logs.push(l)
                        }
                    })
                }
                var res = []
                logs.forEach(function(l) {
                    var isGoodWithNots = true
                    var isGoodWithTags = false
                    nots.forEach(function(n) {
                        if (includes(l.tags, n)) {
                            isGoodWithNots = false
                        }
                    })
                    if (isGoodWithNots) {
                        tags.forEach(function(t) {
                            if (includes(l.tags, t)) {
                                isGoodWithTags = true
                            }
                        })
                    }
                    if (isGoodWithNots && isGoodWithTags) {
                        res.push(l)
                    }
                })
                return res
            } //to be continued...
        ml.getTags = function() {
            return mf.tags
        }
        ml.getMasterLog = function() {
            return mf
        }
        ml.setDefaultTags = function(tags) {
            mf.tags = ("default," + tags.toString()).split(",")
            return true
        }
        return ml
    })()
})