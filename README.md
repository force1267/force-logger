# force-logger
Simple but powerful logger system on JSON (save and search)
-------------------------------------------------------------

__Install :__
npm install force-logger

Create masterLog's dir (any name)

Create masterLog's/Logs dir (name must be logs)

flog = require("force-logger")("dirToMasterLog's folder" ,optionalStartTime : Javascript Date())

__New log :__

options = {

  time : optional Javascript Date() // default is now
  
  ,info : optional object // with any information in it
  
  ,msg : optional string
  
  ,tags : optional array // of strings. default is ["default"]
  
}

flog.log(options)

// your log is now saved inside latest logfile inside masterlog's/logs dir

__Search in saved logs :__

options = {

  from : optional Javascript Date() // default is require("force-logger")()'s time
  
  ,to : optional Javascript Date() // default is now
  
  ,tags : optional array // of strings. default is ["default"]
  
  ,nots : optional array // of srtings. default is []
  
}

flog.search(options)

// returns an array of saved log objects that have one of options.tags and non of options.nots between options.from to options.to

_search will be updated with more features_

__Work with tags__

flog.getTags()

// returns array of tags used in project

flog.setDefaultTags(tags:array)

// sets default tag array. returns true. use this to set all tags used in project. (also new tags will be added automaticaly)

__Use masterLog.json__

flog.getMasterFile()

// returns masterLog.json object (readable and writable). any change to this object will change the file.

see https://www.npmjs.com/package/jsop , https://github.com/typicode/jsop

masterLog.json = {

start : javascript Date()

,tags : array //of strings. default tags

,logNum : number //of logs

,logFiles = [

start : javascript Date()

num : number //of this log

]

}


_Change log:_

2.1.2:

-search returns an array of saved log objects that have _one_ of options.tags (instead of _all_)

-added flog.setDefaultTags(tags:array) , sets masterLog.json default tag array. returns true. use this to set all tags used in project. (also new tags will be added automaticaly)

-added flog.getTags() , returns array of tags used in project

-added flog.getMasterFile() , returns masterLog.json object (readable and writable). any change to this object will change the file.
see https://www.npmjs.com/package/jsop , https://github.com/typicode/jsop

1.1.2:

-bugFix

-Does the job correctly

1.1.1 :

-bugFix

1.1.0 :

-search returns an array of saved log objects that have _all_ of options.tags (instead of _one_)

-added options.nots, search returns an array of logs that have _non_ of options.nots

