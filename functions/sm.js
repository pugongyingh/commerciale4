

const nodemailer = require('nodemailer');

export async function handler(event, context, callback){
 // const { user, pass} = process.env
 const  body = JSON.parse(event.body);
    var min = "10000";
   // const max = 99999;
   // const num = Math.floor(Math.random() * (max - min + 1)) + min;
var  mm = process.env.mm;
var  tmp;
 var  sub= body.name;
  var  ss = parseInt(body.send);
  var  tmp = body.tmp;
  //var  str = body.name;
 //             if(str.includes("先生")||str.includes("小姐")||str.includes("女士")||str.includes("经理")||str.includes("老师"))
  //            {
  //            }else {
//body.name = str + "经理";
//    };

     mm =mm.split('!')[ss];


 var  mmm=mm.split(';')[0];
 var  pp=mm.split(';')[1];
 var  sss = mmm.split('@')[1];
 var  hh;
           if(sss == "sina.com.cn")
          {
             hh="smtp.sina.com";
          }
          else
          {
              hh="smtp."+ sss;
          }
    const transport = nodemailer.createTransport({
    host: hh, // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: mmm,
        pass: pp
    }
    });

    //const { email }  = JSON.parse(event.body) 
    let mailOptions = {
      from: mmm,
      to: `${body.email}`,
      subject: sub,
      html: tmp,
  };

try{
 //min="777";
  let value = await transport.sendMail(mailOptions);
  //transport.sendMail(mailOptions);
  //console.log(value, mailOptions )
 min= JSON.stringify(value.response);
 //min= JSON.stringify(body.name);
// min=process.env.yyy;
  return {
    statusCode: 200,
    body: min.substring(1,28)
  }
}catch(err){
//console.log(err)
  return {
    statusCode: 400,
    body: "err"
  };
}

}
