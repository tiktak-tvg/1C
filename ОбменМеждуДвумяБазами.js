� ������ ����� ����, ����� �� ������ � ���� �������� � ����� � ��� �� �����. ������ ������ ��� ������ �������, ������� � ����������, � �� 2 ���� ������� ������ �� ����� java-script ��� ������ ����� ����� ������. �� ���� ��������� ������������ ������������ ����! ��� ������ �����, ����� � ������������ �� ���� ������ ��� ���������� ������� ��� �������� ����������, �.�. ������������ ������� ����������.
��������� ������� ��� �������� ������, �� ������ ���������� �� ��� ��������� ������.
� ������ ���� ����� ��� ������ ���� ���������:

���� � ����
��� ������������
������
������������� ����� ���������:

��� ����� ������ �� ���� 1 � ���� 2 � ��������
�������� ���� ������ ���� 1 � ���� 2 � ��������
�������� ����� ������
���� � ���� 1�
��������! �� ���� ����� ������ ������� �\� ����� ��������� ������, ���: �\\�!

��� ����� ��������� � ���� � ����������� js � ����� ���������.


//=== ������� ��������� ===
//��������� ���������

//���� 1 - �������
var Base1User = "������";  //��� ������������
var Base1Password = "..."; //������
var Base1Path = "R:\\PIM\\1s8"; //���� � ����

//���� 2 - ������������
var Base2User = "������"; //��� ������������
var Base2Password = "..."; //������
var Base2Path = "c:\\������\\pim1"; //���� � ����

var FileFrom1To2 = "R:\\pim\\FromCentrToNode1.xml"; //��� ����� ������ �� ���� 1 � ���� 2
var FileFrom2To1 = "R:\\pim\\FromNode1ToCentr.xml";//��� ����� ������ �� ���� 2 � ���� 1

var Base1NodeCode = "�1"; //�������� ���� ������ ���� 2 � ���� 1
var Base2NodeCode = "�"; //�������� ���� ������ ���� 1 � ���� 2

var PlanName = "���������"; //�������� ����� ������

var App1sFullName = 'C:\\Program Files\\1cv81\\bin\\1cv8.exe'; //���� � ��������� 1� �� ����������

//��������� ���������� ������������ ���� 2
UpdateConfig1s(App1sFullName, Base2Path, Base2User, Base2Password);

//������� COM-����������� � ����� �����
var Base1COM = Connect1s(Base1Path, Base1User, Base1Password);
var Base2COM = Connect1s(Base2Path, Base2User, Base2Password);

//������� ������ �� ���� ����� ������
var Base1Node = Base1COM.�����������[PlanName].�����������(Base1NodeCode);
var Base2Node = Base2COM.�����������[PlanName].�����������(Base2NodeCode);

//��������� �������� �� ���� 1 � ���� 2
URBDExchangeWrite(Base1COM, FileFrom1To2, Base1Node);

//��������� �������� � ���� 2 �� ���� 1
URBDExchangeRead(Base2COM, FileFrom1To2);

if (Base2COM .��������������������()) {
       Report("������������ ������������ ���� ��������.\n ��������� ������ ���� ������������� � ��� ��� ��������� �����!");
       WScript.Quit(0);
}

//��������� �������� �� ���� 2 � ���� 1
URBDExchangeWrite(Base2COM, FileFrom2To1, Base2Node);

//��������� �������� � ���� 1 �� ���� 2
URBDExchangeRead(Base1COM, FileFrom2To1);

Report("����� ��������!");
WScript.Quit(0);

function URBDExchangeWrite(COM, FileName, Node) {
       var MessageRecord = COM.�����������.����������������������();
       var RecordXML = COM.NewObject("������XML");
       RecordXML.�����������(FileName);
       //������ ������ ��������
       MessageRecord.������������(RecordXML, Node);
       COM.�����������.�����������������(MessageRecord);
       // ������ ���� ���������
       MessageRecord.���������������();
       RecordXML.�������(FileName);
}

function URBDExchangeRead(COM, FileName) {
       var MessageRead = COM.�����������.����������������������();
       var ReadXML = COM.NewObject("������XML");
       ReadXML.�����������(FileName);
       //������ ������ ��������
       MessageRead.������������(ReadXML);
       COM.�����������.������������������(MessageRead);
       // ������ ���� ���������
       MessageRead.���������������();
       ReadXML.�������(FileName);
}

function main() {
       //���������, ����� ����� �� ���������� ������
       var ScriptName = WScript.ScriptName;
       if (IsProcessExist(ScriptName)) {
             Report('������� '+ScriptName+' ��� �������, ��� ����� ����� �������!');
             WScript.Quit(1);
       }

       //��������� ���������� ���������, ���������� ��� �������� ������� ��� ��������
       isCheckConfig = false;
       if (WScript.Arguments.Length > 0)
             if (WScript.Arguments.Item(0) == "CheckConfig")
                    isCheckConfig = true;

       //���� ����� ���������, ���������� �� ������������ � ��������� ���������
       if (isCheckConfig)
             CheckConfig(); //��������� �������� COM-������� ��� �������� ������������
       else
             MainProcess();
}

function CheckConfig() {
       //���� ��� �������� ������������, �������� �����
       //�������� �����������, �����  COM-���������� �������, ����� ��� ���� �� ���������

       //�������� ������� ����
       //Report(WScript.ScriptFullName);

       //�������� ������� ����
       Report("������� �������� ������� (�����)");

       var Base1s = Connect1s();
       //Base1s.����������������("Test");
       Report("������� ���-���������� " + Base1s);

       //����� �� ��������� ������������
       var isNeedToConfigUpdate = Base1s.����������������������������();
       Report('����� ��������� ������������: ' + isNeedToConfigUpdate);

       //�����, ��������� ��������� ������ 1�
       //������� � 1� �� ������ ������������� ������
       //�.�. ������ ������� ��� ������ ����������
       Base1s.������������������();

       //���������� ������
       if (isNeedToConfigUpdate)
             WScript.Quit(200); //����� ���������
       else
             WScript.Quit(100);//�� ����� ���������
}

function Connect1s(Base1sPath, Base1sUser, Base1sPassword) {
       //������������� ������� COM-���������� � 1�8
       var V8 = new ActiveXObject("V81.COMConnector");
       //var V8 = new ActiveXObject("V81.Application");
       try {
             ConnectionString = 'File="' + Base1sPath + '";Usr="' + Base1sUser + '";Pwd="' + Base1sPassword + '"';
             var Base1s = V8.Connect(ConnectionString);
       } catch(e){
             Report('�� ������� ������� com-����������!' + e.description + "\n"+ConnectionString);
             WScript.Quit(1);
       }
       return Base1s;

}

function MainProcess() {
       //������ ��������� ��������
       Shell = new ActiveXObject("WScript.Shell");
       PathToRun = '"' + WScript.FullName +'" "' + WScript.ScriptFullName + '" CheckConfig';
       Report("������� ��� ������� ��������� ��������:" + PathToRun);
       //��������� �������� ������� � ���� ��� ����������
       var result = Shell.Run(PathToRun,0,true);

       //������������ ����� ���������, ���� �������� ����� ������ 200
       isNeedToConfigUpdate = (result == 200)

       Report("COM-���������� ������ �������, �.�. �������� ����� ����");

       //���� ����� ��������� ������������
       if (isNeedToConfigUpdate) {
             //��������� ������ ����, ����� ����������
             WScript.Sleep(5000);

             //������� �������������
             CloseUsers1s();

             //�������� ������������
             UpdateConfig1s(App1sFullName, Base1sPath, Base1sUser, Base1sPassword);
       }
}

function CloseUsers1s() {
       //������� ��� �������� 1�
       var Processing = new ActiveXObject("WbemScripting.SWbemLocator");
       var Service = Processing.ConnectServer(".");
       var Items  = new Enumerator(Service.ExecQuery("SELECT * FROM Win32_Process WHERE Name = '1cv8.exe'"));

       for (Items.moveFirst(); !Items.atEnd(); Items.moveNext()) {
             var Item = Items.item();
             Item.Terminate(0);
             Report('Kill process 1s8'); //������� ������� 1�8
       }
}

function UpdateConfig1s(App1sFullName, Base1sPath, Base1sUser, Base1sPassword) {
       Shell = new ActiveXObject("WScript.Shell");
       PathToRun = '"' + App1sFullName + '" config /UpdateDBCfg' + ' /N"' + Base1sUser + '" /P"' + Base1sPassword + '" /F"'+ Base1sPath + '"';
       //Report("������� ��� ���������� ������������ ���� ������ :" + PathToRun);
       var result = Shell.Run(PathToRun,2,true); //��������� ������� ���������� �������������
       //Report("��������� ���������� " + result);
       WScript.Sleep(5000);
}

//������������ ���� � ����� FullName, ��� ���������� �����
function GetPathOfFile(FullName) {
       var fso = new ActiveXObject('Scripting.FileSystemObject');
       return fso.GetParentFolderName(FullName);
}

//���������, ���������� �� ������� � �������� ������ �����
function IsProcessExist(ProcessName) {
       var Processing = new ActiveXObject("WbemScripting.SWbemLocator");
       var Service = Processing.ConnectServer(".");
       //��������� ���������� �������� �������, ��� ������� ������ ����...
       var Items  = new Enumerator(Service.ExecQuery("SELECT * FROM Win32_Process WHERE (CommandLine LIKE '%" + ProcessName + "%') AND NOT (CommandLine LIKE '%CheckConfig%')"));

       var Count = 0;
       for (Items.moveFirst(); !Items.atEnd(); Items.moveNext()) Count++;
       Report("���������� ��������� " + Count);
       return Count > 1;
}

function Report(Msg) {
       WScript.Echo(Msg);
}