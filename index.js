const axios = require('axios');

var HTTPSWEB3 = 'http://localhost:8545'  // HTTP endpoint for the RPC server 

var map =  new Map()

var pendingCountLessThan30 = 0
var totalPending = 0

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
        res = response
    })
    return res.data.result
}

async function main(){
    var txpoolContent = await getTxPoolContent()
    var pending = txpoolContent.pending

    for (var [key, value] of Object.entries(pending)) {
        
        for (var [nonce, txobject] of Object.entries(value)) {

            var maxFeePerGas = txobject.maxFeePerGas
            var gasPriceToCheck 

            if(maxFeePerGas===undefined){
                gasPriceToCheck = txobject.gasPrice
                
            }else{
                gasPriceToCheck = maxFeePerGas
            }

            gasPriceToCheck = parseInt(gasPriceToCheck, 16)
            
            if(gasPriceToCheck<30000000000){
                pendingCountLessThan30 += 1
            }

            totalPending += 1 

        }
    }

    console.log(pendingCountLessThan30)
    console.log(totalPending)

}

main()
