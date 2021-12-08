const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const jwt = require("jsonwebtoken");
const Flickr = require('flickr-sdk');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });


  app.get("/",async  (req, res) =>  {
  var flickr = new Flickr(process.env.FLICKR_API_KEY);
//const FLICKR_API_KEY = process.env.FLICKR_API_KEY
//const FLICKR_SECRET = process.env.FLICKR_SECRET
//const FLICKR_API_QUERY = { text: "paulfavs" }
//const FLICKR_API_QUERY = { tags: "paulfavs" }
//const FLICKR_API_QUERY = { user_id: 'paul_clarke' }

const result =await flickr.photos.search({
  tags: ' ',
  per_page:10
}).then(function (res) {
  //res.end( res.body.photos.photo);
  //res.status(400).send(res.body.photos.photo);
  res1=
  console.log( res.body.photos.photo);
  //res.json( JSON.stringify(res.body.photos.photo));
  return res.body.photos.photo;
  //res.status(400).send("Th is home page. Created By Akinbobola Olawole Stephen");
}).catch(function (err) {
  console.error('bonk', err);
  return [];
  // res.status(400).send("Th isedede home page. Created By Akinbobola Olawole Stephen");
});
//res.json(["Tony","Lisa","Michael","Ginger","Food"]);
  res.status(200).send(result);
  });

  app.get("/search/:id",async  (req, res) =>  {
    var flickr = new Flickr(process.env.FLICKR_API_KEY);
  const result =await flickr.photos.search({
    tags: req.params.id,
    per_page:10
  }).then(function (res) {
    console.log( res.body.photos.photo);
    return res.body.photos.photo;
  }).catch(function (err) {
    console.error('bonk', err);
    return [];
  });
    res.status(200).send(result);
  });

  
// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});