'function dataload()
'{
var v8=new ActiveXObject("V81.COMConnector");
conn = v8.Connect("Srvr=""Leon"";Ref=""buch"";Usr=""sa"";Pwd=""bk-rp-2120795"";"); 
tab = conn.Справочники.Клиенты;
query = conn.NewObject("Запрос");
query.text = 'ВЫБРАТЬ ПРЕДСТАВЛЕНИЕ(Клиенты.Статус) КАК КлиентыПоСтатусу, КОЛИЧЕСТВО(Клиенты.Ссылка) КАК Количество ИЗ Справочник.Клиенты КАК Клиенты СГРУППИРОВАТЬ ПО Клиенты.Статус';
Qresult = query.execute().Choose();
strdat=''; n=1;
while (Qresult.next())
{ 
strdat+=n+"). "+Qresult.КлиентыПоСтатусу+"<br>"; n++;
'} 
'document.getElementById("message").innerHTML=strdat;