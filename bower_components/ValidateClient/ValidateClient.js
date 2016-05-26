//Cac ham validate/////////////////////////////////////////////////////////////
var _currDT;
function IsNumeric(ControlID) {
    if ($('#' + ControlID).val().length == 0) return true;
    return $.isNumeric($('#' + ControlID).val());
}

function IsDateTime(ControlID, ExpectValue) {
    var dtDay, dtMonth, dtYear;
    if ($('#' + ControlID).val().length == 0) return true;
    var currVal = $('#' + ControlID).val();
    if (currVal == '') return false;
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern);
    if (dtArray == null) return false;
    var dtDay, dtMonth, dtYear;

    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    _currDT = new Date(dtYear, dtMonth, dtDay);
    if (dtMonth < 1 || dtMonth > 12) return false;
    else if (dtDay < 1 || dtDay > 31) return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
    }
    return true;
}

function IsValidUserName(ControlID) {
    var regex = "~!@#$%^&*()[]{}:;'<,>.?|/\\\"";
    var s = $('#' + inputId).val();
    for (i = 0; i < s.length; i++) {
        for (j = 0; j < regex.length; j++) {
            if (s[i] == regex[j])
                return false;
        }
    }
    return true;
}

function IsEmail(ControlID) {
    if ($('#' + ControlID).val().length == 0) return true;
    var emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,4})+$/;
    if (!emailReg.test($('#' + ControlID).val()))
        return false;
    return true;
}

function IsRegex(ControlID, ExpectValue) {
    return ExpectValue.test($('#' + ControlID).val());
}

function CheckRequire(ControlID) {
    return $('#' + ControlID).val().trim().length > 0;
}

function CheckStringLength(ControlID, ExpectValue) {
    if ($('#' + ControlID).val().length == 0) return true;
    return $('#' + ControlID).val().trim().length >= ExpectValue;
}

function CheckNumberInRange(ControlID, SmallValue, BigValue) {
    if ($('#' + ControlID).val().length == 0) return true;
    if (!IsNumeric(ControlID)) {
        return false;
    }
    var number = parseInt($('#' + ControlID).val());
    if (number < SmallValue || number > BigValue)
        return false;
    return true;
}

function CheckStringLengthInRange(ControlID, SmallValue, BigValue) {
    if ($('#' + ControlID).val().length == 0) return true;
    var strlength = $('#' + ControlID).val().trim().length;
    return strlength <= BigValue && strlength >= SmallValue;
}

function CheckDateTimeInRange(ControlID, SmallValue, BigValue) {
    if ($('#' + ControlID).val().length == 0) return true;
    if (!IsDateTime(ControlID)) {
        return false;
    }
    return +_currDT >= +SmallValue && +_currDT <= +BigValue;
}

function CompareSmallerNumericInput(ControlID, CompareControlID) {
    var a = parseInt($("#" + ControlID).val());
    var b = parseInt($("#" + CompareControlID).val());
    return a <= b;
}

function CompareSmallerDateTimeInput(ControlID, CompareControlID) {
    var dtDay, dtMonth, dtYear;
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray1 = $('#' + ControlID).val().match(rxDatePattern);
    dtDay = dtArray1[1];
    dtMonth = dtArray1[3];
    dtYear = dtArray1[5];
    var dt1 = new Date(dtYear, dtMonth, dtDay);

    var dtArray2 = $('#' + CompareControlID).val().match(rxDatePattern);
    dtDay = dtArray2[1];
    dtMonth = dtArray2[3];
    dtYear = dtArray2[5];
    var dt2 = new Date(dtYear, dtMonth, dtDay);

    return +dt1 <= +dt2;
}
function CompareStringInput(ControlID, CompareControlID) {
    return $('#' + ControlID).val() == $('#' + CompareControlID).val();
}
function CompareOtherStringInput(ControlID, CompareControlID) {
    return $('#' + ControlID).val() != $('#' + CompareControlID).val();
}
function ABC(ControlID, ExpectValue) {
    $('#' + ControlID).val(ExpectValue.a + ExpectValue.b);
    return false;
}
//Khai bao lai ham trong nay/////////////////////////////////////////////////
function ValidateActionType() {
    this.CheckRequire = CheckRequire;
    this.CheckStringLength = CheckStringLength;
    this.CheckNumberInRange = CheckNumberInRange;
    this.CheckStringLengthInRange = CheckStringLengthInRange;
    this.CheckDateTimeInRange = CheckDateTimeInRange;
    this.IsNumeric = IsNumeric;
    this.IsDateTime = IsDateTime;
    this.IsValidUserName = IsValidUserName;
    this.IsEmail = IsEmail;
    this.IsRegex = IsRegex;
    this.CompareSmallerNumericInput = CompareSmallerNumericInput;
    this.CompareSmallerDateTimeInput = CompareSmallerDateTimeInput;
    this.CompareStringInput = CompareStringInput;
    this.CompareOtherStringInput = CompareOtherStringInput;
    this.ABC = ABC;
}
////////////////////////////////////////////////////////////////////////////////////

////Bo sung lay vi tri cua loi/////////////////////////////
var Position;
//
var ValidateArray = new Array();
var ActionType = new ValidateActionType();
var ErrorValidateMessage = [
    "<br />Validate Error: Item doesn't contain ControlID<br />",
    "<br />Validate Error: Item doesn't contain ExpectValue<br />",
    "<br />Validate Error: Item doesn't contain SmallValue or BigValue<br />",
    "<br />Validate Error: Item doesn't contain CompareControlID<br />",
    "<br />Validate Error: Item doesn't contain Validate Action<br />",
    "<br />Validate Error: Item doesn't contain MsgError<br />"];
//Khai bao kieu validate////////////////////////////////////////////////////////
var DefineControlCheckFunction = new Array();
var DefineExpectValueFunction = new Array();
var DefineCompareFunction = new Array();
var DefineRangeValueFunction = new Array();
//using only ControlID parameter
DefineControlCheckFunction.push("IsNumeric");
DefineControlCheckFunction.push("IsValidUserName");
DefineControlCheckFunction.push("IsEmail");
DefineControlCheckFunction.push("CheckRequire");
//using ExpectValue parameter
DefineExpectValueFunction.push("CheckStringLength");
DefineExpectValueFunction.push("IsRegex");
DefineExpectValueFunction.push("IsDateTime");
DefineExpectValueFunction.push("ABC");
//using SmallValue-BigValue parameters
DefineRangeValueFunction.push("CheckNumberInRange");
DefineRangeValueFunction.push("CheckStringLengthInRange");
DefineRangeValueFunction.push("CheckDateTimeInRange");
//using CompareControlID parameters
DefineCompareFunction.push("CompareSmallerNumericInput");
DefineCompareFunction.push("CompareSmallerDateTimeInput");
DefineCompareFunction.push("CompareStringInput");
DefineCompareFunction.push("CompareOtherStringInput");
//
function DefineFunctionType() {
    this.DefineControlCheckFunctionType = 1;
    this.DefineExpectValueFunctionType = 2;
    this.DefineCompareFunctionType = 3;
    this.DefineRangeValueFunctionType = 4;
}
var FunctionType = new DefineFunctionType();
//
function IsInDefine(DefineType, FuncName) {
    var arrToFind;
    switch (DefineType) {
        case FunctionType.DefineControlCheckFunctionType: arrToFind = DefineControlCheckFunction; break;
        case FunctionType.DefineExpectValueFunctionType: arrToFind = DefineExpectValueFunction; break;
        case FunctionType.DefineRangeValueFunctionType: arrToFind = DefineRangeValueFunction; break;
        case FunctionType.DefineCompareFunctionType: arrToFind = DefineCompareFunction; break;
    }
    for (var i = 0; i < arrToFind.length; i++)
        if (arrToFind[i] == FuncName)
            return true;
    return false;
}
////////////////////////////////////////////////////////////////////////////////////
function RegistValidateItem(validateItem) {
    //ControlID
    if (validateItem.ControlID) { }
    else { document.write(ErrorValidateMessage[0]); return; }
    //ValidateActionType
    if (validateItem.ValidateActionType) {
        var actionName = validateItem.ValidateActionType.name;
        //ExpectValue
        if (IsInDefine(FunctionType.DefineExpectValueFunctionType, actionName)) {
            if (validateItem.ExpectValue) { }
            else { document.write(ErrorValidateMessage[1]); return; }
        }
        //SmallValue-BigValue
        if (IsInDefine(FunctionType.DefineRangeValueFunctionType, actionName)) {
            if (validateItem.SmallValue && validateItem.BigValue) { }
            else { document.write(ErrorValidateMessage[2]); return; }
        }
        //CompareControlID
        if (IsInDefine(FunctionType.DefineCompareFunctionType, actionName)) {
            if (validateItem.CompareControlID) { }
            else { document.write(ErrorValidateMessage[3]); return; }
        }
    } else { document.write(ErrorValidateMessage[4]); return; }
    //MsgError
    if (validateItem.MsgError) { }
    else { document.write(ErrorValidateMessage[5]); return; }
    //OK!
    ValidateArray.push(validateItem);
}
////////////////////////////////////////////////////////////////////////////////////
function CheckValidate() {
    for (var i = 0; i < ValidateArray.length; i++) {
        var funcName =
            ValidateArray[i].ValidateActionType.name ?
            ValidateArray[i].ValidateActionType.name :
            ValidateArray[i].ValidateActionType.toString().match(/^function\s*([^\s(]+)/)[1];

        if (IsInDefine(FunctionType.DefineControlCheckFunctionType, funcName)) {
            var ret = ValidateArray[i].ValidateActionType(ValidateArray[i].ControlID);
            if (ret == false) {
                $("#Err_" + ValidateArray[i].ControlID).html(ValidateArray[i].MsgError);
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'block');
                $("#" + ValidateArray[i].ControlID).focus();
                PositionError = ValidateArray[i].ControlID;
                return false;
            }
            else {
                $("#Err_" + ValidateArray[i].ControlID).html("");
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'none');
            }
        }
        if (IsInDefine(FunctionType.DefineExpectValueFunctionType, funcName)) {
            var ret = ValidateArray[i].ValidateActionType(
                ValidateArray[i].ControlID,
                ValidateArray[i].ExpectValue);
            if (ret == false) {
                $("#Err_" + ValidateArray[i].ControlID).html(ValidateArray[i].MsgError);
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'block');
                $("#" + ValidateArray[i].ControlID).focus();
                PositionError = ValidateArray[i].ControlID;
                return false;
            }
            else {
                $("#Err_" + ValidateArray[i].ControlID).html("");
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'none');
            }
        }
        if (IsInDefine(FunctionType.DefineRangeValueFunctionType, funcName)) {
            var ret = ValidateArray[i].ValidateActionType(
                ValidateArray[i].ControlID,
                ValidateArray[i].SmallValue,
                ValidateArray[i].BigValue);
            if (ret == false) {
                $("#Err_" + ValidateArray[i].ControlID).html(ValidateArray[i].MsgError);
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'block');
                $("#" + ValidateArray[i].ControlID).focus();
                PositionError = ValidateArray[i].ControlID;
                return false;
            }
            else {
                $("#Err_" + ValidateArray[i].ControlID).html("");
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'none');
            }
        }
        if (IsInDefine(FunctionType.DefineCompareFunctionType, funcName)) {
            var ret = ValidateArray[i].ValidateActionType(
                ValidateArray[i].ControlID,
                ValidateArray[i].CompareControlID);
            if (ret == false) {
                $("#Err_" + ValidateArray[i].ControlID).html(ValidateArray[i].MsgError);
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'block');
                $("#" + ValidateArray[i].ControlID).focus();
                PositionError = ValidateArray[i].ControlID;
                return false;
            }
            else {
                $("#Err_" + ValidateArray[i].ControlID).html("");
                $("#Err_" + ValidateArray[i].ControlID).css('display', 'none');
            }
        }
    }
    return true;
}
////////////////////////////////////////////////////////////////////////////////////
function RaiseError(errMsgId, errStr) {
    $('#' + errMsgId).html(errStr);
    return false;
}