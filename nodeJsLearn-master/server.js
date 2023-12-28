var  http =require('http')

 const server= http.createServer((req,resp)=>{
console.log("request");
console.log('====================================');
console.log(req);
console.log('====================================');
})

server.listen(3000)
