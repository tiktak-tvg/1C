if (Session("entConn") == null) 
        {
                er="Îøèáêà ñîçäàíèÿ îáúåêòà v81";
            Session("entConn") = new ActiveXObject("v81.comconnector");
            }
        entConn = Session("entConn");
        if (Session("conn") == null) 
        {
                er="Îøèáêà ïåðâè÷íîãî ïîäêëþ÷åíèÿ";
            Session("conn") = entConn.connect("srvr=*Leon;ref=buch;usr=sa;pwd=b-2170777");
                er="Îøèáêà ïðîâåðêè äîñòóïà ïî IP àäðåñó";
            Session("conn").ÏðîâåðèòüIP(" " + Request.ServerVariables("REMOTE_ADDR"));

                           auth_type=1;
                er="Îøèáêà ïðîâåðêè/ðåãèñòðàöèè ïîëüçîâàòåëÿ";
            auth_type=Session("conn").×òîÄåëàòüÊîìÏîëüçîâàòåëþ(""+username,""+domainname);
