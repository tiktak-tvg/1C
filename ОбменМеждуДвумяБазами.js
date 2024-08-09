Я создал копию базы, чтобы на работе и дома работать с одной и той же базой. Делать обмены мне быстро надоело, поэтому я потрудился, и за 2 часа написал скрипт на языке java-script для обмена между этими базами. Он даже обновляет конфигурацию периферийной базы! Для работы нужно, чтобы в конфигурации не было ошибок при компиляции модулей для внешнего соединения, т.к. используется внешнее соединение.
Программа сделана для файловой версии, вы можете переделать ее для серверной версии.
В начале кода нужно для каждой базы прописать:

Путь к базе
Имя пользователя
Пароль
Дополнительно нужно прописать:

Имя файла обмена из базы 1 в базу 2 и наоборот
Название узла обмена базы 1 в базе 2 и наоборот
Название плана обмена
Путь к базе 1с
Внимание! Во всех путях символ бэкслеш «\» нужно повторять дважды, так: «\\»!

Код нужно сохранить в файл с расширением js и можно запускать.


//=== Главная программа ===
//Настройки программы

//База 1 - главная
var Base1User = "Осипов";  //Имя пользователя
var Base1Password = "..."; //Пароль
var Base1Path = "R:\\PIM\\1s8"; //Путь к базе

//База 2 - периферийная
var Base2User = "Осипов"; //Имя пользователя
var Base2Password = "..."; //Пароль
var Base2Path = "c:\\Осипов\\pim1"; //Путь к базе

var FileFrom1To2 = "R:\\pim\\FromCentrToNode1.xml"; //Имя файла обмена из базы 1 в базу 2
var FileFrom2To1 = "R:\\pim\\FromNode1ToCentr.xml";//Имя файла обмена из базы 2 в базу 1

var Base1NodeCode = "У1"; //Название узла обмена базы 2 в базе 1
var Base2NodeCode = "Ц"; //Название узла обмена базы 1 в базе 2

var PlanName = "пимПолный"; //Название плана обмена

var App1sFullName = 'C:\\Program Files\\1cv81\\bin\\1cv8.exe'; //Путь к программе 1С на компьютере

//Запускаем обновление конфигурации базы 2
UpdateConfig1s(App1sFullName, Base2Path, Base2User, Base2Password);

//Создаем COM-подключения к обеим базам
var Base1COM = Connect1s(Base1Path, Base1User, Base1Password);
var Base2COM = Connect1s(Base2Path, Base2User, Base2Password);

//Создаем ссылки на узлы планы обмена
var Base1Node = Base1COM.ПланыОбмена[PlanName].НайтиПоКоду(Base1NodeCode);
var Base2Node = Base2COM.ПланыОбмена[PlanName].НайтиПоКоду(Base2NodeCode);

//Запускаем выгрузку из базы 1 в базу 2
URBDExchangeWrite(Base1COM, FileFrom1To2, Base1Node);

//Запускаем загрузку в базе 2 из базы 1
URBDExchangeRead(Base2COM, FileFrom1To2);

if (Base2COM .КонфигурацияИзменена()) {
       Report("Конфигурация периферийной базы изменена.\n Завершите работу всех пользователей и еще раз запустите обмен!");
       WScript.Quit(0);
}

//Запускаем выгрузку из базы 2 в базу 1
URBDExchangeWrite(Base2COM, FileFrom2To1, Base2Node);

//Запускаем загрузку в базе 1 из базы 2
URBDExchangeRead(Base1COM, FileFrom2To1);

Report("Обмен выполнен!");
WScript.Quit(0);

function URBDExchangeWrite(COM, FileName, Node) {
       var MessageRecord = COM.ПланыОбмена.СоздатьЗаписьСообщения();
       var RecordXML = COM.NewObject("ЗаписьXML");
       RecordXML.ОткрытьФайл(FileName);
       //Начало записи собщения
       MessageRecord.НачатьЗапись(RecordXML, Node);
       COM.ПланыОбмена.ЗаписатьИзменения(MessageRecord);
       // Запись тела сообщения
       MessageRecord.ЗакончитьЗапись();
       RecordXML.Закрыть(FileName);
}

function URBDExchangeRead(COM, FileName) {
       var MessageRead = COM.ПланыОбмена.СоздатьЧтениеСообщения();
       var ReadXML = COM.NewObject("ЧтениеXML");
       ReadXML.ОткрытьФайл(FileName);
       //Начало записи собщения
       MessageRead.НачатьЧтение(ReadXML);
       COM.ПланыОбмена.ПрочитатьИзменения(MessageRead);
       // Запись тела сообщения
       MessageRead.ЗакончитьЧтение();
       ReadXML.Закрыть(FileName);
}

function main() {
       //Проверяем, чтобы скипт не запускался дважды
       var ScriptName = WScript.ScriptName;
       if (IsProcessExist(ScriptName)) {
             Report('Процесс '+ScriptName+' уже запущен, эта копия будет закрыта!');
             WScript.Quit(1);
       }

       //Проверяем переданные параметры, определяем это основной процесс или дочерний
       isCheckConfig = false;
       if (WScript.Arguments.Length > 0)
             if (WScript.Arguments.Item(0) == "CheckConfig")
                    isCheckConfig = true;

       //Если нужно проверять, изменилась ли конфигурация и запускать автообмен
       if (isCheckConfig)
             CheckConfig(); //Запускаем дочерний COM-процесс для проверки конфигурации
       else
             MainProcess();
}

function CheckConfig() {
       //Если это проверка конфигурации, дочерний поток
       //Дочерний запускается, чтобы  COM-соединение убилось, иначе оно ника не убивается

       //Получаем каталог базы
       //Report(WScript.ScriptFullName);

       //Получаем каталог базы
       Report("Запущен дочерний процесс (отчет)");

       var Base1s = Connect1s();
       //Base1s.ИзвещениеСистемы("Test");
       Report("Создано КОМ-соединение " + Base1s);

       //Нужно ли обновлять конфигурацию
       var isNeedToConfigUpdate = Base1s.НужноЛиОбновлятьКонфигурацию();
       Report('Нужно обновлять конфигурацию: ' + isNeedToConfigUpdate);

       //Далее, запускаем автообмен силами 1С
       //Функция в 1С не должна останавливать скрипт
       //Т.е. должна запуски все делать асинхронно
       Base1s.ЗапуститьАвтообмен();

       //Возвращаем статус
       if (isNeedToConfigUpdate)
             WScript.Quit(200); //Нужно обновлять
       else
             WScript.Quit(100);//Не нужно обновлять
}

function Connect1s(Base1sPath, Base1sUser, Base1sPassword) {
       //Устанавливаем быстрое COM-соединение с 1С8
       var V8 = new ActiveXObject("V81.COMConnector");
       //var V8 = new ActiveXObject("V81.Application");
       try {
             ConnectionString = 'File="' + Base1sPath + '";Usr="' + Base1sUser + '";Pwd="' + Base1sPassword + '"';
             var Base1s = V8.Connect(ConnectionString);
       } catch(e){
             Report('Не удалось создать com-соединение!' + e.description + "\n"+ConnectionString);
             WScript.Quit(1);
       }
       return Base1s;

}

function MainProcess() {
       //Запуск дочернего процесса
       Shell = new ActiveXObject("WScript.Shell");
       PathToRun = '"' + WScript.FullName +'" "' + WScript.ScriptFullName + '" CheckConfig';
       Report("Команда для запуски дочернего процесса:" + PathToRun);
       //Запускаем дочерний процесс и ждем его завершения
       var result = Shell.Run(PathToRun,0,true);

       //Конфигурацию нужно обновлять, если дочерний поток вернул 200
       isNeedToConfigUpdate = (result == 200)

       Report("COM-соединение должно умереть, т.к. дочерний поток умер");

       //Если нужно обновлять конфигурацию
       if (isNeedToConfigUpdate) {
             //Несколько секунд ждем, чтобы наверняека
             WScript.Sleep(5000);

             //Выгнать пользователей
             CloseUsers1s();

             //Обновить конфигурацию
             UpdateConfig1s(App1sFullName, Base1sPath, Base1sUser, Base1sPassword);
       }
}

function CloseUsers1s() {
       //Убиваем все процессы 1С
       var Processing = new ActiveXObject("WbemScripting.SWbemLocator");
       var Service = Processing.ConnectServer(".");
       var Items  = new Enumerator(Service.ExecQuery("SELECT * FROM Win32_Process WHERE Name = '1cv8.exe'"));

       for (Items.moveFirst(); !Items.atEnd(); Items.moveNext()) {
             var Item = Items.item();
             Item.Terminate(0);
             Report('Kill process 1s8'); //удаляем процесс 1с8
       }
}

function UpdateConfig1s(App1sFullName, Base1sPath, Base1sUser, Base1sPassword) {
       Shell = new ActiveXObject("WScript.Shell");
       PathToRun = '"' + App1sFullName + '" config /UpdateDBCfg' + ' /N"' + Base1sUser + '" /P"' + Base1sPassword + '" /F"'+ Base1sPath + '"';
       //Report("Команда для обновления конфигурации базы данных :" + PathToRun);
       var result = Shell.Run(PathToRun,2,true); //Запускаем команду обновления конфигурациии
       //Report("Результат обновления " + result);
       WScript.Sleep(5000);
}

//Возвращается путь к файлу FullName, без финального слеша
function GetPathOfFile(FullName) {
       var fso = new ActiveXObject('Scripting.FileSystemObject');
       return fso.GetParentFolderName(FullName);
}

//Проверяет, существует ли процесс с заданным именем файла
function IsProcessExist(ProcessName) {
       var Processing = new ActiveXObject("WbemScripting.SWbemLocator");
       var Service = Processing.ConnectServer(".");
       //Проверяем запущенный основной процесс, без вызовов самого себя...
       var Items  = new Enumerator(Service.ExecQuery("SELECT * FROM Win32_Process WHERE (CommandLine LIKE '%" + ProcessName + "%') AND NOT (CommandLine LIKE '%CheckConfig%')"));

       var Count = 0;
       for (Items.moveFirst(); !Items.atEnd(); Items.moveNext()) Count++;
       Report("Количество процессов " + Count);
       return Count > 1;
}

function Report(Msg) {
       WScript.Echo(Msg);
}