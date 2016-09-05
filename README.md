# force-logger
Simple but powerful logger system on JSON (save and search)
-------------------------------------------------------------

__Install :__
npm install force-logger

Create masterLog's dir (any name)

Create masterLog's/Logs dir (name must be logs)

flog = require("force-logger")("dirToMasterLog.json(masterLog's dir)", optionalStartTime[:Javascript Date()])


__new log :__

options = {
  time : optional Javascript Date() // default is now
  ,info : optional object // with any information in it
  ,msg : optional string
  ,tags : optional array // of strings. default is ["default"]
}
flog.log(options)
// your log is now saved inside latest logfile inside masterlog's/logs dir

__search in saved logs :__

options = {

  from : optional Javascript Date() // default is require("force-logger")()'s time
  
  ,to : optional Javascript Date() // default is now
  
  ,tags : optional array // of strings. default is ["default"]
  
}

flog.search(options)

// returns an array of saved log objects that have one of tags (not all of them)

_search will be updated with more features_
