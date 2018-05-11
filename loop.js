// THIS IS PSEUDOCODE REPRESENTING WHAT THE NODEJS EVENT LOOP DOES

// node myFile.js (starting up external program to run on this event loop)

const pendingTimers = [];
const pendingOSTasks = []; // Represents code that is happening through the OS's async features (check async.js)
const pendingOperations = []; // Represents code that is being executed inside the thread pool (check threads.js)

// New timers, tasks, and operations are recorded when myFile runs 
myFile.runContents();

const shouldContinue = () => {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port)
  // Check three: Any pending long running operations? (Like fs module)
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Entire body executes in one 'tick' (each iteration through loop is a tick)
while(shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any function callbacks are ready to be called [setTimeout and setInterval]
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3) Pause execution. Continues when...
  //  -- a new pendingOSTask id done
  //  -- a new pendingOperation id done
  //  -- a timer is about to complete
  // 4) Look at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events
}

// exit back to terminal