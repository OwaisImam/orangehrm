$(document).ready(function() {
    
    if (ldapInstalled == 'true' || openIdEnabled == 'on') {
        $("#password_required").hide();
        $("#rePassword_required").hide();
    }    
    $("#chkLogin").attr("checked", true);
    $("#chkOther").attr("checked", true);

    $("#addEmployeeTbl td div:empty").remove();
    $("#addEmployeeTbl td:empty").remove();
    
    $('#photofile').after('<small class="form-text text-muted">'+fieldHelpBottom+'</small>');

    if(createUserAccount == 0) {
        //hiding login section by default
        $(".loginSection").hide();
        $("#chkLogin").removeAttr("checked");
        $(".otherSection").hide();
        $("#chkOther").removeAttr("checked");
    }

    //default edit button behavior
    $("#btnSave").click(function() {
        $("#frmAddEmp").submit();
    });

    $("#chkLogin").click(function() {
        $(".loginSection").hide();

        $("#user_name").val("");
        $("#user_password").val("");
        $("#re_password").val("");
        $("#status").val("Enabled");

        if($("#chkLogin").is(':checked')) {
            $(".loginSection").show();
        }
    });

    $("#chkOther").click(function() {
        $(".otherSection").hide();

        $("#user_name").val("");
        $("#user_password").val("");
        $("#re_password").val("");
        $("#status").val("Enabled");

        if($("#chkOther").is(':checked')) {
            $(".otherSection").show();
        }
    });

        //form validation
    $("#frmAddEmp").validate({
        rules: {
            'firstName': {required: true },
            'lastName': { required: true },
            'user_name': { validateLoginName: true, onkeyup: 'if_invalid'},
            'user_password': {
                validatePassword: true,
                minlength: 8,
                maxlength: 64,
                remote: {
                    url: requiredStrengthCheckUrl,
                    data: {
                        password: function(){return $('#user_password').val();}
                    }
                },
                onkeyup: 'if_invalid'
            },
            're_password': {validateReCheckPassword: true, onkeyup: 'if_invalid'},
            'status': {validateStatusRequired: true },
            'location': {required: true }
        },
        messages: {
            'firstName': { required: lang_firstNameRequired },
            'lastName': { required: lang_lastNameRequired },
            'user_name': { validateLoginName: lang_userNameRequired },
            'user_password': {
                validatePassword: lang_passwordRequired,
                maxlength: user_Max64Chars,
                minlength: user_UserPasswordLength,
                remote: lang_passwordStrengthInvalid,
            },
            're_password': {validateReCheckPassword: lang_unMatchingPassword},
            'status': {validateStatusRequired: lang_statusRequired },
            'location': {required: lang_locationRequired }
        }
    });

    $.validator.addMethod("validateLoginName", function(value, element) {
        if($("#chkLogin").is(':checked') && !(ldapInstalled == 'true')) {
            if(value.length < 5) {
                return false;
            }
        } else if ($("#chkLogin").is(':checked') && (ldapInstalled == 'true' || openIdEnabled == 'on')) {
            if(value.length < 1) {
                return false;
            }
		}
        return true;
    });
    $.validator.addMethod("validateOtherName", function(value, element) {
        if($("#chkOther").is(':checked') && !(ldapInstalled == 'true')) {
            if(value.length < 5) {
                return false;
            }
        } else if ($("#chkOther").is(':checked') && (ldapInstalled == 'true' || openIdEnabled == 'on')) {
            if(value.length < 1) {
                return false;
            }
        }
        return true;
    });

    $.validator.addMethod("validatePassword", function(value, element) {
        if($("#chkLogin").is(':checked') && !(ldapInstalled == 'true' || openIdEnabled == 'on')) {
            if(value.length < 4) {
                return false;
            }
        }
        return true;
    });
    $.validator.addMethod("validateOtherAmount", function(value, element) {
        if($("#chkOther").is(':checked') && !(ldapInstalled == 'true' || openIdEnabled == 'on')) {
            if(value.length < 4) {
                return false;
            }
        }
        return true;
    });

    $.validator.addMethod("validateReCheckPassword", function(value, element) {
        if($("#chkLogin").is(':checked')) {
            if(value != $("#user_password").val()) {
                return false;
            }
        }
        return true;
    });

    $.validator.addMethod("validateStatusRequired", function(value, element) {
        if($("#chkLogin").is(':checked')) {
            if(value == "") {
                return false;
            }
        }
        return true;
    });

    $("#btnCancel").click(function(){
       navigateUrl("viewEmployeeList");
    });
});