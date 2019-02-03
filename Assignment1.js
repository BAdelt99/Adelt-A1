var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      var word = query["word"];
      var i;
      var len = word.length;
      for (i in word) 
      {
        i = word.length/len;
      res.write('<pre>' + word.repeat(i) + "<br>" + '</pre>');
      }
      res.end(' ');
    }
    if(query['cmd'] == 'dotted' )
    {
    console.log("Handling a request");
    console.log(query);
    var word1 = query["word1"];
    var word2 = query["word2"];
   var x = '';
    for (var i = 0; i < (30 - (word1.length + word2.length)); i++)
    {
    x = x + '.';
    }
    res.write('<pre>'+word1+x+word2+'</pre>');
      res.end('');    
    }
 
   if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var grades = query['grades'];
      var input = [grades];
      var sum = 0;
      for (var i in query['grades'])
      {
        sum = sum + parseInt(query['grades'][i]);
      }
      
      var GradeAvg = sum/query['grades'].length;
      
      const GradesMax = function(input)
     {
       return Math.max(...input);
     };
     const GradesMin = function(input)
     {
        return Math.min(...input);
     };
     
      res.write('<pre>'+"Avg: "+GradeAvg+" Min: "+GradesMin(...input)+" Max: "+GradesMax(...input)+'</pre>');
      res.end('');
    }
    else
    {
      res.end('');
    }
}