/**********************************************************************

  inits.c -

  $Author: knu $
  $Date: 2008-04-09 20:13:04 +0900 (Wed, 09 Apr 2008) $
  created at: Tue Dec 28 16:01:58 JST 1993

  Copyright (C) 1993-2003 Yukihiro Matsumoto

**********************************************************************/

#include "ruby.h"


void
rb_call_inits()
{
    Init_sym();
    Init_var_tables();
    Init_Object();
    Init_Comparable();
    Init_Enumerable();
    Init_Precision();
    Init_eval();
    Init_String();
    Init_Exception();
    Init_Thread();
    Init_Numeric();
    Init_Bignum();
    Init_syserr();
    Init_Array();
    Init_Hash();
    Init_Struct();
    Init_Regexp();
    Init_pack();
    Init_Range();
    Init_IO();
    Init_Dir();
    Init_Time();
    Init_Random();
    Init_signal();
    Init_process();
    Init_load();
    Init_Proc();
    Init_Binding();
    Init_Math();
    Init_GC();
    Init_Enumerator();
    Init_marshal();
    Init_version();
}
