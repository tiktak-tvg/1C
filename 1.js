'function dataload()
'{
var v8=new ActiveXObject("V81.COMConnector");
conn = v8.Connect("Srvr=""Leon"";Ref=""buch"";Usr=""sa"";Pwd=""bk-rp-2120795"";"); 
tab = conn.�����������.�������;
query = conn.NewObject("������");
query.text = '������� �������������(�������.������) ��� ����������������, ����������(�������.������) ��� ���������� �� ����������.������� ��� ������� ������������� �� �������.������';
Qresult = query.execute().Choose();
strdat=''; n=1;
while (Qresult.next())
{ 
strdat+=n+"). "+Qresult.����������������+"<br>"; n++;
'} 
'document.getElementById("message").innerHTML=strdat;