' Try to connect to v81 base

var V8 = new ActiveXObject("V81.COMConnector"); '��� 1�80 ������������ V80.COMConnector

try {

  
		'"File=""C:\1CBase""";Usr=""login"";Pwd=""password"";";
       ConnectionString = "Srvr=""Leon"";Ref=""buch"";Usr=""sa"";Pwd=""bk-rp-2120795"";" '��� ���������: Srvr="server";Ref="1cBase" //File="C:\\1c\\Catalog";Usr="Admin";Pwd="123456"

       var Base = V8.Connect(ConnectionString);

       var isConfigUpdate = Base.��������������������();

       WScript.Echo("��������� ����� ��������� ������������: " + isConfigUpdate);

   

} catch(e){

       WScript.Echo("�� ������� ������� com-����������!" + e.description);

}