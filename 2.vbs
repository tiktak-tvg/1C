Dim ServerName
Dim InfoBaseName
Dim InfoBasesAdminName
Dim InfoBasesAdminPass

ServerName = "LEON\MSSQLSERVER2014"
InfoBaseName = "buchtest"
InfoBasesAdminName = "sa"
InfoBasesAdminPass = "b-2170777"

Set connection = CreateObject("V82.Application")
connection.Connect("Srvr=""" + ServerName + """;Ref=""" + InfoBaseName + """;Usr=""" + InfoBasesAdminName + """;Pwd=""" + InfoBasesAdminPass + """;")

'Set ComConnector = new ActiveXObject("V82.COMConnector");
'var connection = ComConnector.Connect("Srvr=""" + ServerName + """;Ref=""" + InfoBaseName + """;Usr=""" + InfoBasesAdminName + """;Pwd=""" + InfoBasesAdminPass + """;");

'connection.WriteLogEvent('Îáìåí ñòàðò', connection.EventLogLevel.Information);
'connection.ÌîäóëüÐåãëàìåíòíûõÇàäàíèé.ÂûïîëíèòüÎáìåíÄàííûìèÄëÿÍàñòðîéêèÀâòîìàòè÷åñêîãîÎáìåíàÄàííûì<wbr>­è('000003');
'connection.WriteLogEvent('Îáìåí ôèíèø', connection.EventLogLevel.Information);
