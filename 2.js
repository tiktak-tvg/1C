' Try to connect to v81 base

var V8 = new ActiveXObject("V81.COMConnector"); 'äëÿ 1ñ80 èñïîëüçîâàòü V80.COMConnector

try {

  
		'"File=""C:\1CBase""";Usr=""login"";Pwd=""password"";";
       ConnectionString = "Srvr=""Leon"";Ref=""buch"";Usr=""sa"";Pwd=""b-2170777"";" 'Äëÿ ñåðâåðíîé: Srvr="server";Ref="1cBase" //File="C:\\1c\\Catalog";Usr="Admin";Pwd="123456"

       var Base = V8.Connect(ConnectionString);

       var isConfigUpdate = Base.ÊîíôèãóðàöèÿÈçìåíåíà();

       WScript.Echo("Ñîñòîÿíèå ôëàãà èçìåíåíèÿ êîíôèãóðàöèè: " + isConfigUpdate);

   

} catch(e){

       WScript.Echo("Íå óäàëîñü ñîçäàòü com-ñîåäèíåíèå!" + e.description);

}
