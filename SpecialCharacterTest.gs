function testSpecialCharSearch() {
  var specialCharacters = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+",
                           "`", "-", "=", "[", "]", "{", "}", ";", "'", ":", "\"",
                          ",", ".", "/", "<", ">", "?"];
  var fileName = "SpecialCharacterTest";
  for (i = 0; i < specialCharacters.length; i++)
  {
    var name = specialCharacters[i] + fileName;
    var spreadSheet = SpreadsheetApp.create(name);
    var file;
    var fileFound = false;
    try
    {
      var files = DriveApp.searchFiles("title contains '" + specialCharacters[i] + "'");
      if (files.hasNext())
      {
        file = files.next();
        fileFound = true;
        console.log(file.getName() + " on normal attempt.");
      }
    }
    catch (exc)
    {
      console.log(exc);
    }
    // Try escape characters
    if (!fileFound)
    {
      try
      {
        files = DriveApp.searchFiles("title contains '" + "\\\\" + specialCharacters[i] + "'");
        if (files.hasNext())
        {
          file = files.next();
          fileFound = true;
          console.log(file.getName() + " on escape character attempt.");
        }
      }
      catch(exc)
      {
        console.log(exc);
      }
      if (!fileFound)
      {
        console.log("File not found for " + specialCharacters[i] + "!");
      }
    } 
  }
  files = DriveApp.searchFiles("title contains '" + fileName + "'");
  while (files.hasNext())
  {
    file = files.next();
    DriveApp.removeFile(file);
  }
}

function testSpecialCharInBetweenSearch() {
  var specialCharacters = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+",
                           "`", "-", "=", "[", "]", "{", "}", ";", "'", ":", "\"",
                          ",", ".", "/", "<", ">", "?"];
  var firstName = "Special";
  var secondName = "CharacterTest";
  for (i = 0; i < specialCharacters.length; i++)
  {
    var name = firstName + specialCharacters[i] + secondName;
    var spreadSheet = SpreadsheetApp.create(name);
    var file;
    var fileFound = false;
    try
    {
      var files = DriveApp.searchFiles("title contains '" + specialCharacters[i] + "'");
      if (files.hasNext())
      {
        file = files.next();
        fileFound = true;
        console.log(file.getName() + " on normal attempt.");
      }
    }
    catch (exc)
    {
      console.log(exc);
    }
    // Try escape characters
    if (!fileFound)
    {
      try
      {
        files = DriveApp.searchFiles("title contains '" + "\\\\" + specialCharacters[i] + "'");
        if (files.hasNext())
        {
          file = files.next();
          fileFound = true;
          console.log(file.getName() + " on escape character attempt.");
        }
      }
      catch(exc)
      {
        console.log(exc);
      }
      if (!fileFound)
      {
        console.log("File not found for " + specialCharacters[i] + "!");
      }
    } 
  }
  files = DriveApp.searchFiles("title contains '" + secondName + "'");
  while (files.hasNext())
  {
    file = files.next();
    DriveApp.removeFile(file);
  }
}
