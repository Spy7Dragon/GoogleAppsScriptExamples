function myFunction() {
  var arrayInfo = [];
  var mapInfo = {};
  
  arrayInfo.push('apple');
  arrayInfo.push('orange');
  arrayInfo.push('grapefruit');
  
  mapInfo['yin'] = 'yang';
  mapInfo['over'] = 'under';
  mapInfo['in'] = 'out';
  
  Logger.log('Printing array info using for loop.');
  for (var index in arrayInfo)
  {
    Logger.log(index);
  }
  Logger.log('Printing array info using for each loop.');
  for each (var info in arrayInfo)
  {
    Logger.log(info);
  }
  
  Logger.log('Printing map info using for loop.');
  for (var key in mapInfo)
  {
    Logger.log(key);
  }
  
  Logger.log('Printing map info using for each loop.');
  for each (var value in mapInfo)
  {
    Logger.log(value);
  }
}
