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

// returns an array of saved log objects that have all of options.tags and non of options.nots between options.from to options.to

_search will be updated with more features_

_Change log:_

1.1.2:

-bugFix

-Does the job correctly

1.1.1 :

-bugFix

1.1.0 :

-search returns an array of saved log objects that have _all_ of options.tags (instead of _one_)

-added options.nots, search returns an array of logs that have _non_ of options.nots

