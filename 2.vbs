Dim ServerName
Dim InfoBaseName
Dim InfoBasesAdminName
Dim InfoBasesAdminPass

ServerName = "LEON\MSSQLSERVER2014"
InfoBaseName = "buchtest"
InfoBasesAdminName = "sa"
InfoBasesAdminPass = "bk-rp-2120795"

Set connection = CreateObject("V82.Application")
connection.Connect("Srvr=""" + ServerName + """;Ref=""" + InfoBaseName + """;Usr=""" + InfoBasesAdminName + """;Pwd=""" + InfoBasesAdminPass + """;")

'Set ComConnector = new ActiveXObject("V82.COMConnector");
'var connection = ComConnector.Connect("Srvr=""" + ServerName + """;Ref=""" + InfoBaseName + """;Usr=""" + InfoBasesAdminName + """;Pwd=""" + InfoBasesAdminPass + """;");

'connection.WriteLogEvent('����� �����', connection.EventLogLevel.Information);
'connection.�������������������������.������������������������������������������������������������<wbr>��('000003');
'connection.WriteLogEvent('����� �����', connection.EventLogLevel.Information);