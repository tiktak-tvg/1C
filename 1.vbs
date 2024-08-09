if (Session("entConn") == null) 
        {
                er="Ошибка создания объекта v81";
            Session("entConn") = new ActiveXObject("v81.comconnector");
            }
        entConn = Session("entConn");
        if (Session("conn") == null) 
        {
                er="Ошибка первичного подключения";
            Session("conn") = entConn.connect("srvr=*Leon;ref=buch;usr=sa;pwd=bk-rp-2120795");
                er="Ошибка проверки доступа по IP адресу";
            Session("conn").ПроверитьIP(" " + Request.ServerVariables("REMOTE_ADDR"));

                           auth_type=1;
                er="Ошибка проверки/регистрации пользователя";
            auth_type=Session("conn").ЧтоДелатьКомПользователю(""+username,""+domainname);