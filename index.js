const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const Flickr = require('flickr-sdk');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });


   //Default page
  app.get("/",async  (req, res) =>  {
  var flickr = new Flickr(process.env.FLICKR_API_KEY);
//wait on until respond is received  before proceeding
const result =await flickr.photos.search({
  tags: ' ',
  //set maximum list of record to 20;
  per_page:20
}).then(function (res) {
//return the list photo
  return res.body.photos.photo;
 
}).catch(function (err) {
  //return  if no record found
  return [];
  
});
  //return array data
  res.status(200).send(result);
  });

  app.get("/search/:tag",async  (req, res) =>  {
    var flickr = new Flickr(process.env.FLICKR_API_KEY);

    //wait on until respond is received  before proceeding
const result =await flickr.photos.search({
  //set query with input tag
  tags: req.params.tag,
  //set maximum list of record to 20;
  per_page:20
}).then(function (res) {
//return the list photo
  return res.body.photos.photo;
 
}).catch(function (err) {
  //return  if no record found
  return [];
  
});
  //return array data
  res.status(200).send(result);
  });
  
  
// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port} please use this in your front end api call`);
});