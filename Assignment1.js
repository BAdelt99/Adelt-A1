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
      //var word = query["word"];
      //var i = word.length;
      //res.write('<pre>'+ word.repeat(i) + '</pre>');
      res.end(' ');
    }
    else
    {
      res.end('');
    }
}
