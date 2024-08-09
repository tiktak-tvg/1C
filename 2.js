' Try to connect to v81 base

var V8 = new ActiveXObject("V81.COMConnector"); 'для 1с80 использовать V80.COMConnector

try {

  
		'"File=""C:\1CBase""";Usr=""login"";Pwd=""password"";";
       ConnectionString = "Srvr=""Leon"";Ref=""buch"";Usr=""sa"";Pwd=""bk-rp-2120795"";" 'Для серверной: Srvr="server";Ref="1cBase" //File="C:\\1c\\Catalog";Usr="Admin";Pwd="123456"

       var Base = V8.Connect(ConnectionString);

       var isConfigUpdate = Base.КонфигурацияИзменена();

       WScript.Echo("Состояние флага изменения конфигурации: " + isConfigUpdate);

   

} catch(e){

       WScript.Echo("Не удалось создать com-соединение!" + e.description);

}