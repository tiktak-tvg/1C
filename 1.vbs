if (Session("entConn") == null) 
        {
                er="������ �������� ������� v81";
            Session("entConn") = new ActiveXObject("v81.comconnector");
            }
        entConn = Session("entConn");
        if (Session("conn") == null) 
        {
                er="������ ���������� �����������";
            Session("conn") = entConn.connect("srvr=*Leon;ref=buch;usr=sa;pwd=bk-rp-2120795");
                er="������ �������� ������� �� IP ������";
            Session("conn").���������IP(" " + Request.ServerVariables("REMOTE_ADDR"));

                           auth_type=1;
                er="������ ��������/����������� ������������";
            auth_type=Session("conn").������������������������(""+username,""+domainname);