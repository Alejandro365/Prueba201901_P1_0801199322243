var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

var fileModel = require('./jsonmodel');
var datos = null; //Temporary Store

var _adData = {
    '_id':'',
    'empresa':'',
    'url': '',
    'nombre': '',
    'year': null,
    'rating': null,
    'fechaIng': null
};

router.get('/', function(req,res,next){
    if(!datos){
        fileModel.read(function(err,filedatos){
            if(err){
                console.log(err),
                datos=[];
                return res.status(500).json({'error':'Murio'})
            }
            datos = JSON.parse(filedatos);
            return res.status(200).json(datos);
        });
    }else{
        return res.status(200).json(datos);
    }
});


router.post('/new',function(req,res,next){
    var _adDatas = Object.assign({},_adData,req.body);
    var dateInicial = new Date();
    _adDatas._id = uuidv4();
    _adDatas.fechaIng = dateInicial;

    if(!datos){
        datos =[];
    }
    datos.push(_adDatas);
    fileModel.write(datos, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error':'Murio'});
        }
        return res.status(200).json(_adDatas);
    });
});



fileModel.read(function(err , fileinfo){
  if(err){
    console.log(err);
  } else{
    datos = JSON.parse(fileinfo);
  }
});

module.exports = router;