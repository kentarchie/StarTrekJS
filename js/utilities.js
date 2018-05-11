// various utility functions sed throughout the project
let Utilities = {
// queue object derived from 
// https://stackoverflow.com/questions/5028149/how-do-i-create-a-message-queue
    MessageQueue :  function() {
    let data = [];
    let queueRunning = false;

    this.isEmpty = function() {
        return (data.length == 0);
    };

    this.enqueue = function(obj) {
         data.push(obj);
    };

    this.runQueue = function() {
        let mesg = '';
        while(!this.isEmpty()) {
            mesg += this.dequeue();
        }
        Utilities.writeMessage(mesg);
    };

    this.dequeue = function() {
        return data.shift();
    };

    this.peek = function() {
        return data[0];
    };

    this.clear = function() {
        data = [];
    };
}

,writeMessage : function (content)
{
   let contentArray = content.split("");
   let current = 0;
   let elem = $('.messageDisplay');
   let messageTimer = setInterval(function() {
            if(current < contentArray.length) {
                let thisChar = contentArray[current];
                if (contentArray[current] == '\n')  thisChar = '<br />';
                if (contentArray[current] == ' ')  thisChar = '&nbsp;';
                elem.html(elem.html() + thisChar);
                current++;
            }
            else
               clearInterval(messageTimer);
   }, 50);
} // writeMessage

/* Returns an integer from 1 to iSpread */
,getRandomInRange : function (iSpread)
{
   return ( Math.floor(Math.random() * iSpread) + 1);
  //return((Math.random() % iSpread) + 1);
}

,function_r : function()
{
  return(getRandomInRange(8));
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
,round : function(number, precision) 
{
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }  
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
} // round
    
} // Utilities
