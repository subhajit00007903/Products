const h = require('http');
const u = require('url');
const fs = require('fs');


let data = fs.readFileSync('./json files/b.json','utf-8');
data  = JSON.parse(data);
//console.log(data);


const s = h.createServer((req,res)=>{
    const {query,path} = u.parse(req.url,true);
    //const path = req.url;
    //console.log(req.url);
    //console.log(u.parse(req.url,true));
    if(path ==='/a'){
        fs.readFile(`${__dirname}/html/a.html`,'utf-8',(e,h)=>{
            if(e){
                res.writeHead(500,{'content-type':'text/html'});
                res.end('Server Error');
            }else{
                //console.log(data);
                let ht = '';
                data.forEach(i=>{
                    ht+=`
                        <div class ="product-card">
                            <h2>${i.item}</h2>
                            <p>${i.pieces}</p>
                            <p>${i.from_where}</p>
                        </div>
                    
                    `;
                });
                h = h.replace('{{product}}',ht);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(h);
            }
        })
    }else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});
s.listen(9000,'127.0.0.1',()=>{
    console.log("Server is up...");
})