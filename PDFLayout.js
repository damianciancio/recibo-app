import moment from "moment";
import * as ImageManipulator from 'expo-image-manipulator';
import {Asset} from 'expo-asset';

const getReceiptHtml = async(clientName, clientAddressStreet, clientAddressCity, jobCost, jobDetails) => {
    const gasAsset = Asset.fromModule(require('./assets/gas.png'));
    const gasImage = await ImageManipulator.manipulateAsync(gasAsset.uri, [], { base64: true });
   
    const plomeriaAsset = Asset.fromModule(require('./assets/plomeria.jpg'));
    const plomeriaImage = await ImageManipulator.manipulateAsync(plomeriaAsset.uri, [], { base64: true });
    
    const refrigeracionAsset = Asset.fromModule(require('./assets/refrigeracion.jpg'));
    const refrigeracionImage = await ImageManipulator.manipulateAsync(refrigeracionAsset.uri, [], { base64: true });
    
    const whatsappAsset = Asset.fromModule(require('./assets/whatsapp.jpg'));
    const whatsappImage = await ImageManipulator.manipulateAsync(whatsappAsset.uri, [], { base64: true });
    
    const facebookAsset = Asset.fromModule(require('./assets/facebook.png'));
    const facebookImage = await ImageManipulator.manipulateAsync(facebookAsset.uri, [], { base64: true });


    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pdf Content</title>
    <style>
        body {
            font-size: 19px; 
        }            
        
        .header-col {
            border: 1px solid black;
            min-height: 350px;
            flex: 1;
        }
        .header-col:first-child {
            border-radius: 5px 0 0 5px;
        }

        .header-col:last-child {
            border-radius: 0 5px 5px 0;
        }
    
        #client-data {
            border: 1px solid black;
            padding: 40px;
            border-radius: 5px;
        }
    
        #bill-details {
            padding: 30px; 
            border: 1px solid black;
            border-radius: 5px;
        }
        
        #footer {
            padding: 40px;
            border: 1px solid black;
            border-radius: 5px;
        }
        .bill-parts{
            margin-bottom: 20px;
            margin-top: 20px;
        }
    
        .image-icon {
            height: 16px;
            width: 16px;;
        }
        #header {
            display: flex;
        }
    
    </style>
    </head>
    <body>
    <div class="bill-parts" id="header" style="width: 100%;">
    <div align="left" class="header-col" >
        <div style="text-align: center; width: 100%;">
            <h2 style="font-style: italic;">Javier Marcelo Banuera</h2>
            <div><span><img class="image-icon" src="data:image/png;base64,${gasImage.base64}"> GASISTA - <img class="image-icon" src="data:image/jpg;base64,${plomeriaImage.base64}"> PLOMERO</span></div>
            <div>MAT N° 41344</div>
            <div><span><img class="image-icon" src="data:image/jpg;base64,${refrigeracionImage.base64}"> TECNICO EN REFRIGERACIÓN</span></div>
            <div>MAT N° 10156/13</div>
            <br>
            <div><span><img class="image-icon" src="data:image/jpg;base64,${whatsappImage.base64}"> (0341) 152-146098</span></div>
            <div><span><img class="image-icon" src="data:image/png;base64,${facebookImage.base64}"> Facebook: Marcelo Banuera</span></div>
            <br>
            <div>Rep. Dominicana 450</div>
            <div>2000 Rosario - Pcia. Santa Fe</div><br>
        </div>
    </div>
    <div align="left" class="header-col" style="position: relative;">
        <div style="position: absolute; top: 20px; left:-10px;border: 1px solid black;background-color: white;z-index:20;padding:3px;">X</div>
        
    
        <div style="text-align: center">
            <h2>RECIBO</h2>
            <div><span>${moment(new Date()).format('DD/MM/YYYY')}</span></div>
            <div><span>Documento no válido como factura</span></div>
        </div>
        <!--div style="left: 20px; position: absolute; bottom: 20px;">
            <div>CUIT: 20-25125396-0</div>
            <div>Ing. Brutos: 021-403877-2</div>
            <div>Inicio de Act.: 01/07/2013</div>
        </div-->
    </div>
    </div>
    <div class="bill-parts" id="client-data">
        <div>
            Señor/es: ${clientName}
        </div>
        <div style="display: flex; flex-direction: row;">
            <div style="flex: 2">
                Dirección: ${clientAddressStreet}
            </div> 
            <div style="flex: 1">
                Localidad: ${clientAddressCity}
            </div> 
        </div>
    </div>
    <div class="bill-parts" id="bill-details">
    <div style="min-height:60px;">Recibí la suma de pesos: $ ${jobCost} ------</div>
    <div style="min-height:120px;">En concepto de pago de: ${jobDetails}</div>
    <div>Total: $ ${jobCost}</div>
    
    </div>
    <div class="bill-parts" id="footer">
    Firma: Javier Marcelo Banuera  
    </div>
    </body>
    </html>
`;}

export default getReceiptHtml;