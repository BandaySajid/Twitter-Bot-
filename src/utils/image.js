const axios = require('axios');
const fs = require('fs');

async function getImage(url, callback){
    axios({
        method: 'get',
        url: url,
        responseType: 'stream'
      })
    .then(function (response) {
        const image_name = Math.random() + '_twt_sajid.jpg';
        const writeStream = fs.createWriteStream(`${image_name}`);
        response.data.pipe(writeStream);
        writeStream.on('finish', ()=>{
            callback(image_name);
        });
    });
}

module.exports = getImage;