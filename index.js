const axios = require('axios');

var HTTPSWEB3 = 'http://localhost:8545'  // HTTP endpoint for the RPC server 

async function getTxPoolContent(){
    
    var res 
    await axios.post(HTTPSWEB3 ,{
        jsonrpc: '2.0',
        method: 'txpool_content',
        params: [],
        id: 1
    }, {
        headers: {
        'Content-Type': 'application/json',
        },
    }).then((response) => {
        console.log(response.data.result);
        res = response
    })
    return res
}

async function main(){
    await getTxPoolContent()
}

main()
