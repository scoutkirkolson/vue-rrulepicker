//FUNCTION is_array
export function is_array(input) {
  return (typeof(input)=='object' && (input instanceof Array)) || (typeof(input)=='object' && !is_null(input) && typeof(input.length) == 'number');
}


//FUNCTION is_numeric
export function is_numeric(mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: David
  // +   improved by: taith
  // +   bugfixed by: Tim de Koning
  // *     example 1: is_numeric(186.31);
  // *     returns 1: true
  // *     example 2: is_numeric('Kevin van Zonneveld');
  // *     returns 2: false
  // *     example 3: is_numeric('+186.31e2');
  // *     returns 3: true
  // *     example 4: is_numeric('');
  // *     returns 4: false

  if (mixed_var === '') {
    return false;
  }

  return !isNaN(mixed_var * 1);
};


//FUNCTION is_number
export function is_number(mixed_var){
  //return typeof mixed_var == 'number' || !isNaN(parseFloat(mixed_var));
  return typeof mixed_var == 'number' && !isNaN(parseFloat(mixed_var));
};


//FUNCTION is_null
export function is_null(mixed_var){
  // Returns true if variable is null
  //
  // version: 810.114
  // discuss at: http://phpjs.org/functions/is_null
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: is_null('23');
  // *     returns 1: false
  // *     example 2: is_null(null);
  // *     returns 2: true
    return (mixed_var === null);
};


//FUNCTION is_null
export function is_nullic(mixed_var) {
  if (is_null(mixed_var)) {
    return true;
  } else if (is_string(mixed_var)) {
    if (comparetext(mixed_var, "null")
    ||  comparetext(mixed_var, "{null}")) {
      return true;
    }
  }

  return false;
};


//FUNCTION is_string
export function is_string(s){
  return (typeof(s) != 'undefined') ? (typeof(s) === 'string' || s instanceof String) : false;
};


//FUNCTION is_object
export function is_object(mixed_var) {
  return (typeof mixed_var =='object' && !is_array(mixed_var));
};


//FUNCTION is_function
export function is_function(mixed_var) {
  return (typeof mixed_var =='function');
};


//FUNCTION is_true
export function is_true(mixed_var) {
  if (is_string(mixed_var)) {
    return comparetext(mixed_var, 'true') || comparetext(mixed_var, '1') || comparetext(mixed_var, 'yes') || comparetext(mixed_var, 'on');
  } else if (is_number(mixed_var)) {
    return mixed_var != 0;
  } else if (is_bool(mixed_var)) {
    return mixed_var === true;
  } else {
    return false;
  }
};


//FUNCTION is_false
export function is_false(mixed_var) {
  if (is_string(mixed_var)) {
    return comparetext(mixed_var, 'false') || comparetext(mixed_var, '0') || comparetext(mixed_var, 'no')  || comparetext(mixed_var, 'off');
  } else if (is_number(mixed_var)) {
    return mixed_var == 0;
  } else if (is_bool(mixed_var)) {
    return mixed_var === false;
  } else {
    return false;
  }
};


//FUNCTION is_nan
export function is_nan(mixed_var) {
  return isNaN(mixed_var);
};


//FUNCTION is_undefined
export function is_undefined(mixed_var) {
  return (typeof mixed_var == 'undefined');
};


//FUNCTION is_empty
export function is_emptytext(mixed_var, trimtext) {
  trimtext = typeof trimtext == 'undefined' ? false : trimtext;

  if (typeof mixed_var == 'string') {
    if (trimtext) {
      return mixed_var.trim() === '';
      } else {
      return mixed_var === '';
    }
  } else {
    return false;
  }
};


//FUNCTION is_empty
export function is_empty(mixed_var) {
  var name;

  if (typeof mixed_var == 'undefined') {
    //undefined = empty
    return true;

  } else if (typeof mixed_var == 'object' && mixed_var instanceof Object) {
    if (is_null(mixed_var)) {
      //null = empty
      return true;
    } else if (is_array(mixed_var)) {
      //[] = empty
      return mixed_var.length == 0;
    } else {
      //{} = empty
      for (name in mixed_var ) {
        return false;
      }
      return true;
    }

  } else if (typeof mixed_var == 'string') {
    //"", "null", "NULL" = empty
    mixed_var = mixed_var.trim();

    if (mixed_var != 'null'
    &&  mixed_var != 'NULL'
    &&  mixed_var != '{null}'
    &&  mixed_var != 'false'
    &&  mixed_var != 'FALSE'
    &&  mixed_var != 'NaN'
    &&  mixed_var != 'undefined'
    &&  mixed_var != ''
    &&  mixed_var != '<xml></xml>'
    &&  mixed_var != '<xml><record></record></xml>') {
    //&&  mixed_var != '-1'
        return false;
    } else {
      return true;
    }

  } else if (typeof mixed_var == 'number') {
    //0 = empty
    if (isNaN(mixed_var)) {
      return true;
    } else if (mixed_var != -1
           &&  mixed_var != 0) {
      return false;
    } else {
      return true;
    }

  } else if (typeof mixed_var == 'boolean') {
    //false = empty
    return !mixed_var;

  } else if (typeof mixed_var == 'function') {
    //false = empty
    return false;

  } else {
    return true;
  }
};


//FUNCTION is_bool
export function is_bool(mixed_var) {
  if (typeof mixed_var == 'undefined') {
    return false;

  } else if (typeof mixed_var == 'object') {
    return false;

  } else if (typeof mixed_var == 'string') {
    if (mixed_var.toLowerCase() == 'true'
    ||  mixed_var.toLowerCase() == 'false'
    ||  mixed_var == '1'
    ||  mixed_var == '0') {
      return true;
    } else {
      return false;
    }

  } else if (typeof mixed_var == 'number') {
    if (mixed_var == 1
    ||  mixed_var == 0) {
      return true;
    } else {
      return false;
    }

  } else if (typeof mixed_var == 'boolean') {
    return true;
  } else {
    return false;
  }
};


//FUNCTION is_tempid
export function is_tempid(s){
  if (is_string(s)) {
    if (s.slice(0, 5) == 'zzzzz') {
      return true;
    } else {
      return false;
    }
  } else {
    return is_empty(s);
  }
};


//FUNCTION compare_null
export function compare_null(var1, var2) {
  if (     (var1 == null     && var2 == null)
        || (var1 == null     && var2 == 'null')
        || (var1 == null     && var2 == '{null}')
        || (var1 == 'null'   && var2 == null)
        || (var1 == 'null'   && var2 == 'null')
        || (var1 == 'null'   && var2 == '{null}')
        || (var1 == '{null}' && var2 == null)
        || (var1 == '{null}' && var2 == 'null')
        || (var1 == '{null}' && var2 == '{null}')
  ) {
    return true;
  } else {
    return false;
  }
};


//FUNCTION compare_empty
export function compare_empty(var1, var2) {
  if (     (var1 == null              && var2 == null)
        || (var1 == null              && var2 == '')
        || (var1 == null              && var2 == 'null')
        || (var1 == null              && var2 == 'NULL')
        || (var1 == null              && var2 == '{null}')
        || (var1 == null              && var2 == -1)
        || (var1 == null              && var2 == '-1')
        || (var1 == null              && typeof var2 == 'undefined')
        || (var1 == 'null'            && var2 == null)
        || (var1 == 'null'            && var2 == '')
        || (var1 == 'null'            && var2 == 'null')
        || (var1 == 'null'            && var2 == 'NULL')
        || (var1 == 'null'            && var2 == '{null}')
        || (var1 == 'null'            && var2 == -1)
        || (var1 == 'null'            && var2 == '-1')
        || (var1 == 'null'            && typeof var2 == 'undefined')
        || (var1 == 'NULL'            && var2 == null)
        || (var1 == 'NULL'            && var2 == '')
        || (var1 == 'NULL'            && var2 == 'null')
        || (var1 == 'NULL'            && var2 == 'NULL')
        || (var1 == 'NULL'            && var2 == '{null}')
        || (var1 == 'NULL'            && var2 == -1)
        || (var1 == 'NULL'            && var2 == '-1')
        || (var1 == 'NULL'            && typeof var2 == 'undefined')
        || (var1 == '{null}'          && var2 == null)
        || (var1 == '{null}'          && var2 == '')
        || (var1 == '{null}'          && var2 == 'null')
        || (var1 == '{null}'          && var2 == 'NULL')
        || (var1 == '{null}'          && var2 == '{null}')
        || (var1 == '{null}'          && var2 == -1)
        || (var1 == '{null}'          && var2 == '-1')
        || (var1 == '{null}'          && typeof var2 == 'undefined')
        || (var1 == ''                && var2 == null)
        || (var1 == ''                && var2 == '')
        || (var1 == ''                && var2 == 'null')
        || (var1 == ''                && var2 == 'NULL')
        || (var1 == ''                && var2 == '{null}')
        || (var1 == ''                && var2 == -1)
        || (var1 == ''                && var2 == '-1')
        || (var1 == ''                && typeof var2 == 'undefined')
        || (var1 == '-1'              && var2 == null)
        || (var1 == '-1'              && var2 == '')
        || (var1 == '-1'              && var2 == 'null')
        || (var1 == '-1'              && var2 == 'NULL')
        || (var1 == '-1'              && var2 == '{null}')
        || (var1 == '-1'              && var2 == -1)
        || (var1 == '-1'              && var2 == '-1')
        || (var1 == '-1'              && typeof var2 == 'undefined')
        || (var1 == -1                && var2 == null)
        || (var1 == -1                && var2 == '')
        || (var1 == -1                && var2 == 'null')
        || (var1 == -1                && var2 == 'NULL')
        || (var1 == -1                && var2 == '{null}')
        || (var1 == -1                && var2 == -1)
        || (var1 == -1                && var2 == '-1')
        || (var1 == -1                && typeof var2 == 'undefined')
        || (typeof var1=='undefined'  && typeof var2=='undefined')
        || (typeof var1=='undefined'  && var2 == null)
        || (typeof var1=='undefined'  && var2 == '')
        || (typeof var1=='undefined'  && var2 == 'null')
        || (typeof var1=='undefined'  && var2 == 'NULL')
        || (typeof var1=='undefined'  && var2 == '{null}')
        || (typeof var1=='undefined'  && var2 == '-1')
  ) {
    return true;
  } else {
    return false;
  }
};


//FUNCTION coalesce
export function coalesce() {
  var len = arguments.length;
  for (var i=0; i<len; i++) {
    if (arguments[i] !== null && arguments[i] !== undefined) {
      return arguments[i];
    }
  }
  return null;
}

//FUNCTION coalesce_str
// zelfde als coalesce maar naast null en undefined worden ook 0, '' en '  ' NIET gematcht
export function coalesce_str() {
  var len = arguments.length;
  for (var i=0; i<len; i++) {
    if (arguments[i] !== null
      && arguments[i] !== undefined
      && arguments[i] != 0
      && arguments[i].trim() != ''
    ) {
      return arguments[i];
    }
  }
  return null;
}


export function is_iterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}